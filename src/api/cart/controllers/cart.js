'use strict';
const  {serviceID}          = require('../../../util/schema')
const   {handlerResponse}   = require('../../../util/handler');
/**
 * cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart',({strapi})=>({
    async find(ctx){
        const cart = await strapi.service(serviceID.carts).find(ctx);
        return handlerResponse(200,cart)
    },

    async create(ctx){
        const cart = await strapi.service(serviceID.carts).create(ctx);
        return handlerResponse(200,cart)
    },
    
    async delete(ctx){
        const cart = await strapi.service(serviceID.carts).delete(ctx);
        return handlerResponse(200,cart)
    },
}));
