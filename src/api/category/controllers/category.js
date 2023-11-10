'use strict';

const { find } = require('../../../../config/middlewares');

// const { find } = require('../../../../config/middlewares');

/**
 * category controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::category.category',({strapi}) => ({
    /*
        // query create udpata delete sql
        async find(ctx){
            try{
                let result = await strapi.db.connection.raw(`SELECT * from categories`).catch(err => err.message);
                return result;
            }catch(err){
                ctx.badRequest("Post report controller error", { moreDetails: err });
            }
        },

        async create(ctx){
            const params = ctx.request.body;
            try{
                let result = await strapi.db.connection.raw('INSERT INTO `categories`(`title`) VALUES ("'+params.title+'")').catch(err => err.message);
                if(result[0].fieldCount == 0){
                    let response = {code : 200, massage: "Create Success!"}
                    return response;
                } else{
                    ctx.body = result;
                }
            }catch(err){
                ctx.badRequest("Post report controller error", { moreDetails: err });
            }
        },

        async update(ctx){
            const params = ctx.request.body;
            try{
                let result = await strapi.db.connection.raw('UPDATE `categories` SET `title`= "'+params.title+'" WHERE `id` = '+params.id+'').catch(err => err.message);
                
                if(result[0].fieldCount == 0){
                    let response = {code : 200, massage: "Update Success!"}
                    return response;
                } else{
                    ctx.body = result;
                }

            }catch(err){
                ctx.badRequest("Post report controller error", { moreDetails: err });
            }
        },

        async delete(ctx){
            const data = ctx.params;
            try{
                let result = await strapi.db.connection.raw('DELETE FROM `categories` WHERE `id` = '+data.id+'').catch(err => err.message);
                
                if(result[0].fieldCount == 0){
                    let response = {code : 200, massage: "Delete Success!"}
                    return response;
                } else{
                    ctx.body = result;
                }

            }catch(err){
                ctx.badRequest("Post report controller error", { moreDetails: err });
            }
        },
        // finish crud sql
    */


    /*
        // query create udpata delete service
        async find(ctx, next) {
            try {
                const data = await super.find(ctx)
                // let data_response = ctx.body = data;
                let response = {code : 200, massage: "success!" ,data}
                return response;
            } catch (err) {
                ctx.badRequest("Post report controller error", { moreDetails: err });
            }
        },

        async findOne(entityId) {
            const params = entityId.params; 
            const result = await strapi.service('api::category.category').findOne(params.id);
            // some more logic
            if(result != ''){
                let response = {code : 200, massage: "Create Success!", data:result}
                return response;
            }
        },

        async create(ctx){
            const params = ctx.request.body;
            try{
                let title = params.title;
                const result = await strapi.service('api::category.category').create({data: {title:title}});
                // let result = await super.create("api::category.category",{data: {title: title},});
                let response = {code : 200, massage: "Create Success!", data: result}
                return response;
                
            }catch(err){
                ctx.badRequest("Post report controller error", { moreDetails: err });
            }
        },

        async update(entityId) {
            const params = entityId.request.body;
            try{
                const result = await strapi.service('api::category.category').update(params.id, {data: {title:params.title}});
                let response = {code : 200, massage: "Update Success!", data: result}
                return response;
                
            }catch(err){
                entityId.badRequest("Post report controller error", { moreDetails: err });
            }
            // const result = await super.update(entityId, params);
        },

        async delete(entityId) {
            const params = entityId.params;
            const result = await strapi.service('api::category.category');
            // some more logic
            if(result.delete(params.id)){
                let response = {code : 200, massage: "Delete Success!"}
                return response;
            }
        }

        // finish service
    */
   


    // /*
        //query create udpata delete ORM

        // async findMany(ctx) {
        //     const entries = await strapi.db.query('api::category.category').findMany({
        //         select: ['title',],
        //         orderBy: { publishedAt: 'DESC' },
        //         offset: 1, 
        //         limit: 2,
        //     });
        //     let response = {code : 200, massage: "Success!", data:entries}
        //     return response;
        // },

        async findOne(entityId) {
            let data = entityId.params;
            return data;
            const entry = await strapi.db.query('api::category.category').findOne({
                select: ['title',],
                where: { id: data.id },
          });
            let response = {code : 200, massage: "Success!", data:entry}
            return response;
        },

        async create(ctx) {
            const params = ctx.request.body;
            const currentdate = new Date();
            const entry = await strapi.db.query('api::category.category').create({
                data: {
                    title: params.title,
                    publishedAt:currentdate
                },
            });
            let response = {code : 200, massage: "Success!", data:entry}
            return response;
        },

        async update(entityId) {
            const params = entityId.request.body;
            const entry = await strapi.db.query('api::category.category').update({
                where: { id: params.id },
                data: {
                    title: params.title,
                },
            });
            let response = {code : 200, massage: "Success!", data:entry}
            return response;
        },

        async delete(entityId) {
            const params = entityId.params;
            const entry = await strapi.db.query('api::category.category').delete({
                where: { id: params.id },
            });

            let response = {code : 200, massage: "Delete Success!"}
            return response;
        }
        // finish orm
    // */

}));
