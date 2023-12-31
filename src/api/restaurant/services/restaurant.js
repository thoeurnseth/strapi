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
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async create(ctx){
        let student = JSON.parse(ctx.request.body.student); //covert string to array
        let classes = JSON.parse(ctx.request.body.classes);
        let currentdate = new Date();
        const {poster,caption,resource,type,file,campus,academic,status} = ctx.request.body
        try{
            const restaurant = await strapi.entityService.create(serviceID.restaurant,createRestaurant(caption,academic));
            return restaurant
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async update(ctx){
        let student = JSON.parse(ctx.request.body.student); //covert string to array
        let classes = JSON.parse(ctx.request.body.classes);
        let currentdate = new Date();
        const {id,poster,caption,resource,type,file,campus,academic,status} = ctx.request.body
        try{
            const restaurant = await strapi.entityService.update(serviceID.restaurant,id,createRestaurant(caption,academic));
            return restaurant
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },


    async beforeDelete(event) {
        console.log(111111);
        const id = event.params.where.id;
        console.log(id,'11111111111111');
        const item = await strapi.entityService.findOne(serviceID.restaurant, id, {
            populate: { localizations: true },
        });
    },
    
}));
