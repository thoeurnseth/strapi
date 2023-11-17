'use strict';
const   {handlerError}   = require('../../../util/handler');
const   {serviceID}      = require('../../../util/schema');
const   {getCategory}     = require('../../../util/schema');
const   {createCategory} = require('../../../util/schema');
const   {updateCategory} = require('../../../util/schema');

/**
 * category service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::category.category',({strapi}) =>({
    async find(ctx){
        try{
            const category = await strapi.entityService.findMany(serviceID.category);
            return category;
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async create(ctx){
        // let student = JSON.parse(ctx.request.body.student); //covert string to array
        // let classes = JSON.parse(ctx.request.body.classes);
        let currentdate = new Date();
        const {title,description,resource,file,slug} = ctx.request.body
        try{
            const category = await strapi.entityService.create(serviceID.category,createCategory(title,description,resource,file,slug,currentdate));
            return category
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },

    async update(ctx){
        // let student = JSON.parse(ctx.request.body.student); //covert string to array
        // let classes = JSON.parse(ctx.request.body.classes);
        let currentdate = new Date();
        const {id,title,description,resource,file,slug} = ctx.request.body
        try{
            const stories = await strapi.entityService.update(serviceID.category,id,updateCategory(title,description,resource,file,slug));
            return stories
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },
}));