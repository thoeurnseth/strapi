'use strict';
const   {handlerResponse}   = require('../../../util/handler');
const   {serviceID}    = require('../../../util/schema');

/**
 * restaurant controller
 */ 

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant',({strapi}) =>({
    async find(ctx){
        const restaurant = await strapi.service(serviceID.restaurant).find(ctx);
        return handlerResponse(200,restaurant)
    },
}));