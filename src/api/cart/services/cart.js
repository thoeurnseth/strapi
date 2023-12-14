'use strict';
const   {serviceID}         = require('../../../util/schema');
const   {handlerError}      = require('../../../util/handler');
const   {getCart,createCart,createCartItemt,updateCartItemt,dalateCartItmems,getCartItemt} = require('../../../util/schema');
/**
 * cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cart.cart',({strapi})=>({
    async find(ctx){
        const { user } = ctx.state;
        try{
            const cart = await strapi.entityService.findMany(serviceID.carts,getCart(user.id));
            const count = cart.length;
            if(count == 1){
                let cartId = cart[0].id;
                const cartitem = await strapi.entityService.findMany(serviceID.cartItemt,getCartItemt(cartId));
                return cartitem;
            } else{
                return 'Not Data';
            }
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async create(ctx){
        const { user } = ctx.state;
        try{
            const {products} = ctx.request.body
            // let productId = JSON.parse(ctx.request.body.products); //covert string to array
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
                let cardId = find[0].id;
                const carts =  products.map(async (obj, i) => {
                    const findid = await strapi.entityService.findMany(serviceID.cartItemt,
                        {
                            filters:{
                                $and: [
                                    { cart:{id:{"$eq":cardId}}},
                                    { product: { id:{"$eq":obj.id}}},
                                ]
                            },
                        }
                    )
                    let count = findid.length;
                    if(count == 1){
                        let id = findid[0].id;
                        await strapi.entityService.delete(serviceID.cartItemt,id,updateCartItemt(obj.qty));
                    }

                    const cartsitem = await strapi.entityService.create(serviceID.cartItemt,createCartItemt(cardId,obj.id,obj.qty,currentdate));
                });
                if(carts) {
                    return 'Create Success!'
                }
            } else{
                const carts = await strapi.entityService.create(serviceID.carts,createCart(user.id,currentdate));
                for (const item of products) {
                    const cartsitem = await strapi.entityService.create(serviceID.cartItemt,createCartItemt(carts.id,item.id,item.qty,currentdate));
                }
                return carts; 
            }
        }catch(error){
            return handlerError('EXEPTION ERROR',error);
        }
    },

    async delete(ctx){
        const { user } = ctx.state;
        const productId = ctx.params.id;
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
            let cartId = find[0].id;
            if(cartId && productId){
                const find = await strapi.entityService.findMany(serviceID.cartItemt,dalateCartItmems(cartId,productId))
                let id = find[0].id;
                let deleteItem = await strapi.entityService.delete(serviceID.cartItemt,id);
                return deleteItem;
            }else{
                return '404';
            }
        }catch(error){
            return handlerError('EXEPTION ERROR',error);
        }
    },

    async update(ctx){
        const { user } = ctx.state;
        const {products} = ctx.request.body
       
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
            
            let cartId = find[0].id;
            const carts =  products.map(async (obj, i) => {
                const find = await strapi.entityService.findMany(serviceID.cartItemt,
                    {
                        filters:{
                            cart:{id:{"$eq":cartId}},
                            product:{id:{"$eq": obj.id}}
                        }
                    }    
                )
                const count = find.length;
                if(count == 1){
                    let id = find[0].id;
                    const cartsitem = await strapi.entityService.update(serviceID.cartItemt,id,updateCartItemt(cartId,obj.id,obj.qty));
                }
            })
            if(carts){
                return 'Update Success!'
            }
        }catch(error){
            return handlerError('EXEPTION ERROR',error);
        }
    }
}));
