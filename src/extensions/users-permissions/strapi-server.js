const utils = require('@strapi/utils');
const { getService } = require('../users-permissions/utils');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {validateCallbackBody} = require('../users-permissions/controllers/validation/auth');
const { setMaxListeners } = require('process');
const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;
const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

module.exports = (plugin) => {
    plugin.controllers.auth.callback = async (ctx) => {
        const provider = ctx.params.provider || 'local';
        const params = ctx.request.body;
        const store = strapi.store({ type: 'plugin', name: 'users-permissions' });
        const grantSettings = await store.get({ key: 'grant' });
        const grantProvider = provider === 'local' ? 'email' : provider;
        if (!_.get(grantSettings, [grantProvider, 'enabled'])) {
            throw new ApplicationError('This provider is disabled');
        }
        if (provider === 'local') {
            await validateCallbackBody(params);
            const { identifier } = params;
            // Check if the user exists.
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: {
                    provider,
                    $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
                },
            });
            if (!user) {
                throw new ValidationError('Invalid identifier or password');
            }
            if (!user.password) {
                throw new ValidationError('Invalid identifier or password');
            }
            const validPassword = await getService('user').validatePassword(
                params.password,
                user.password
            );
            const refreshToken = issueRefreshToken({ id: user.id })
            if (!validPassword) {
                throw new ValidationError('Invalid identifier or password');
            } else {
                 ctx.send({
                    jwt: getService('jwt').issue({
                        id: user.id,
                    }),
                    refreshToken:refreshToken,
                    user: await sanitizeUser(user, ctx),
                });
            }
            const advancedSettings = await store.get({ key: 'advanced' });
            const requiresConfirmation = _.get(advancedSettings, 'email_confirmation');
            if (requiresConfirmation && user.confirmed !== true) {
                throw new ApplicationError('Your account email is not confirmed');
            }
            if (user.blocked === true) {
                throw new ApplicationError('Your account has been blocked by an administrator');
            }
            return ctx.send({
                jwt: getService('jwt').issue({ id: user.id }),
                refreshToken:refreshToken,
                user: await sanitizeUser(user, ctx),
            });
        }

        // google
        // Connect the user with a third-party provider.
        try {
            const user = await getService('providers').connect(provider, ctx.query);
            return ctx.send({
                jwt: getService('jwt').issue({ id: user.id }),
                // refreshToken: refreshToken,
                user: await sanitizeUser(user, ctx),
            });
        } catch (error) {
            throw new ApplicationError(error.message);
        }
    }

    // save the default register controller
    const register = plugin.controllers.auth.register
    // extend register controller
    plugin.controllers.auth.register = async (ctx) => {
        let data = ctx.request.body;
        //call register controller
        await register(ctx)
        // then get userId from register response 
        const userId = ctx.response.body.user.id

        // save custom data registration with update service
        const user = await strapi.entityService.update('plugin::users-permissions.user', userId, {
            data: {
                email: ctx.request.body.email,
                password: ctx.request.body.password,
                username: ctx.request.body.username
            },
        });
        const refreshToken = await issueRefreshToken({ id: user.id })
        ctx.response.body['refreshToken'] = refreshToken
        ctx.response.body['accessToken'] = ctx.response.body.jwt
        delete ctx.response.body['jwt']
        return ctx.response.body;
    }

    plugin.controllers.auth['refreshToken'] = async (ctx) => {
        const store = await strapi.store({ type: 'plugin', name: 'users-permissions' });
        const { refreshToken } = ctx.request.body;
        var refreshCookie = ctx.cookies.get("refreshToken")

        if (!refreshCookie && !refreshToken) {
            return ctx.badRequest("No Authorization");
        }
        
        if (!refreshCookie) {
            if (refreshToken) {
                refreshCookie = refreshToken
            }
            else {
                return ctx.badRequest("No Authorization");
            }
        }

        try {
            const obj = await verifyRefreshToken(refreshCookie);
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { id: obj.id } });
            if (!user) {
                throw new ValidationError('Invalid identifier or password');
            }
            if (
                _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
                user.confirmed !== true
            ) {
                throw new ApplicationError('Your account email is not confirmed');
            }
            if (user.blocked === true) {
                throw new ApplicationError('Your account has been blocked by an administrator');
            }
            const refreshToken = issueRefreshToken({ id: user.id })
            ctx.cookies.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                signed: true,
                overwrite: true,
            });
            ctx.send({
                jwt: issueJWT({ id: obj.id }, { expiresIn: process.env.JWT_SECRET_EXPIRES }),
                refreshToken: refreshToken,
            });
        }
        catch (err) {
            return ctx.badRequest(err.toString());
        }
    }

    plugin.routes['content-api'].routes.push({
        method: 'POST',
        path: '/token/refresh',
        handler: 'auth.refreshToken',
        config: {
            policies: [],
            prefix: '',
        }
    });
    return plugin
}

// issue a JWT
const issueJWT = (payload, jwtOptions = {}) => {
    _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
    return jwt.sign(
        _.clone(payload.toJSON ? payload.toJSON() : payload),
        strapi.config.get('plugin.users-permissions.jwtSecret'),
        jwtOptions
    );
}

// verify the refreshToken by using the REFRESH_SECRET from the .env
const verifyRefreshToken = (token) => {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, process.env.REFRESH_SECRET, {}, function (
            err,
            tokenPayload = {}
        ) {
            if (err) {
                return reject(new Error('Invalid token.'));
            }
            resolve(tokenPayload);
        });
    });
}

// issue a Refresh token
const issueRefreshToken = (payload, jwtOptions = {}) => {
    _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
    return jwt.sign(
        _.clone(payload.toJSON ? payload.toJSON() : payload),
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    );
}
