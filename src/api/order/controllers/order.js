'use strict';
const   {serviceID}         = require('../../../util/schema')
const   {handlerResponse}   = require('../../../util/handler');

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order',({strapi})=>({
    async create(ctx){
        const order = await strapi.service(serviceID.order).create(ctx);
        return handlerResponse(200,order)
    },
}));

