'use strict';
const   {serviceID}    = require('../../../util/schema');
const   {handlerError}   = require('../../../util/handler');
/**
 * restaurant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant.restaurant',({strapi}) =>({
    async find(ctx){
        try{
            const restaurant = await strapi.entityService.findMany(serviceID.restaurant,{
                sort: { id: 'DESC' },
            });
            return restaurant;
        }catch(error){
            handlerError('EXEPTION ERROR',error)
        }
    }
}));
