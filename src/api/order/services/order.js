'use strict';
const   {serviceID}         = require('../../../util/schema');
const   {handlerError}      = require('../../../util/handler');
const   {createOrder}       = require('../../../util/schema');

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order.order',({strapi})=>({
    async create(ctx){
        const { user } = ctx.state;
        let currentdate = new Date();
        try{
            const {orderId} = ctx.request.body;
            let deliveryStatus = 'Pending';
            let paymentMethod  = "ABA";
            const createOrders =  orderId.map(async (obj, i) => {
                const findid = await strapi.entityService.findMany(serviceID.cartItemt,
                    {
                        filters:{
                            id:{"$eq":obj.id}
                        },
                        populate:{
                            product:{fields:['title','description','price']}
                        }
                    }
                )
                let count  = findid.length;
                if(count == 1){
                    let price = findid[0].product.price;
                    let totalPrice = price * obj.qty;
                    const addOrder = await strapi.entityService.create(serviceID.order,createOrder(paymentMethod,totalPrice,user.id,deliveryStatus,currentdate));
                    const deletes  = await strapi.entityService.delete(serviceID.cartItemt,obj.id);
                }
            })
            if(createOrders){
                return "Created Success!";
            }
        }catch(error){
            return handlerError('EXEPTION ERROR',error);
        }
    }
}));
