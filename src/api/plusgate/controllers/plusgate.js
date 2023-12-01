'use strict';
const   {handlerResponse}   = require('../../../util/handler');
const serviceID             = require('../../../util/schema')

/**
 * plusgate controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::plusgate.plusgate',({strapi}) => ({
    async find(ctx){
        const category = await strapi.service(serviceID.plusgate).find(ctx);
        return handlerResponse(200,category)
    },
}));
