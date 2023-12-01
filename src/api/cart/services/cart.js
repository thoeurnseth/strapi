'use strict';
const   {serviceID}         = require('../../../util/schema');
const   {handlerError}      = require('../../../util/handler');
const   {getCart,createCart}           = require('../../../util/schema');
/**
 * cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cart.cart',({strapi})=>({
    async find(ctx){
        const { user } = ctx.state;
        try{
            const cart = await strapi.entityService.findMany(serviceID.carts,getCart(user.id));
            return cart;
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async create(ctx){
        const { user } = ctx.state;
        try{
            let productId = JSON.parse(ctx.request.body.productId); //covert string to array
            let currentdate = new Date();
            const find = await strapi.entityService.findMany(serviceID.carts,
                {
                    filters:{
                        users_permissions_user:{id:{"$eq":user.id}},
                    },
                }
            )
            const count = find.length;
            if(count == 1){
                const cart = await strapi.entityService.update(serviceID.carts,find[0].id,createCart(user.id,currentdate));
                return cart; 
            } else{
                const carts = await strapi.entityService.create(serviceID.carts,createCart(user.id,currentdate));
                return carts
            }

        }catch(error){
            return handlerError('EXEPTION ERROR',error);
        }
    },

    async delete(ctx){
        const { user } = ctx.state;
        const id = ctx.params.id;
        try{
            const find = await strapi.entityService.findMany(serviceID.carts,
                {
                    filters:{
                        users_permissions_user:{id:{"$eq":user.id}},
                    },
                    populate:{
                        users_permissions_user:{fields:['username','email']},
                        products:{fields:['title','description']}
                    }
                }
            )
        }catch(error){

        }
    }
}));
