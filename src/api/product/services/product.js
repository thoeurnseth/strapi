'use strict';
const   {serviceID}      = require('../../../util/schema');
const   {handlerError}   = require('../../../util/handler');
const   {getProduct}     = require('../../../util/schema');
const   {createProduct}     = require('../../../util/schema');
const   {updateProduct}     = require('../../../util/schema');
/**
 * product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product.product',({strapi}) =>({
    async find(ctx){
        try{
            const product = await strapi.entityService.findMany(serviceID.product,getProduct());
            return product;
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async create(ctx){
        let category = JSON.parse(ctx.request.body.category); //covert string to array
        let currentdate = new Date();
        const {title,description,price,regular_price,image} = ctx.request.body
        try{
            const stories = await strapi.entityService.create(serviceID.product,createProduct(title,description,price,regular_price,currentdate,image,category));
            return stories
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async update(ctx){
        let category = JSON.parse(ctx.request.body.category); //covert string to array
        const {id,title,description,price,regular_price,image} = ctx.request.body
        try{
            const stories = await strapi.entityService.update(serviceID.product,id,updateProduct(title,description,price,regular_price,image,category));
            return stories
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },
}));
