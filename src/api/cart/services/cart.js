'use strict';
const   {serviceID}         = require('../../../util/schema');
const   {handlerError}      = require('../../../util/handler');
const   {getCart,createCart,createCartItemt,updateCartItemt} = require('../../../util/schema');
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
            let cardId = find[0].id;
            const count = find.length;
            if(count == 1){
                let a = products.map(async (obj, i) => {
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
                    let id = findid[0].id;
                    const cartsitem = await strapi.entityService.update(serviceID.cartItemt,id,updateCartItemt(obj.qty));
                });
                if(a){
                    return "update success";
                }

                for (const item of products) {
                    let param = {
                        product:item.id,
                        // cart:cardId
                    }

                 
                    // const findid = await strapi.entityService.findMany(serviceID.cartItemt,
                    //     {
                    //         filters:{
                    //             $and: [
                    //                 { cart:{id:{"$eq":cardId}}},
                    //                 { product: { id:{"$eq":item.id}}},
                    //             ]
                    //         },
                    //     }
                    // )
                    // let id = findid[0].id;
                    // console.log(id,'111111');
                    // const cartsitem = await strapi.entityService.update(serviceID.cartItemt,id,updateCartItemt(item.qty));
                    // if(cartsitem){
                    //     return "update success";
                    // }
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
