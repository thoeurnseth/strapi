'use strict';

/**
 * product controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::product.product');

module.exports = {
    async getPost(ctx, next) {
        try {
            let result = await strapi.db.connection.raw(`SELECT * from products`).catch(err => err.message);
            // ctx.body = result[0];
           let response = {code : 200, massage: "Success!" , data:result[0]}
           return response;
        } catch (err) {
            ctx.badRequest("Post report controller error", { moreDetails: err });
        }
    },

    async addPost(ctx, next) {
        const params = ctx.request.body;
        try {
            const data = await strapi.db.connection.raw('INSERT INTO `products`(`title`, `description`, `price`, `regular_price`) VALUES ("'+params.title+'","'+params.description+'","'+params.price+'","'+params.regular_price+'")').catch(err => err.message);

            if(data[0].fieldCount == 0){
                let response = {code : 200, massage: "Create Success!"}
                return response;
            } else{
                ctx.body = data;
            }
            
        } catch (err) {
            ctx.badRequest("Post report controller error", { moreDetails: err });
        }
    },

    async deletePost(ctx, next){
        let url = ctx.originalUrl.split('/');
        let id  = url[(url.length-1)];
        try {
            const data = await strapi.db.connection.raw('DELETE FROM `products` WHERE `id` = '+id+'').catch(err => err.message);
            
            if(data[0].fieldCount == 0){
                let response = {code : 200, massage: "delete Success!"}
                return response;
            } else{
                ctx.body = data;
            }

        } catch (err) {
            ctx.badRequest("Post report controller error", { moreDetails: err });
        }
    },

    async updatePost(ctx, next){
        let params = ctx.request.body;
        try {
            const data = await strapi.db.connection.raw('UPDATE `products` SET `title`="'+params.title+'",`description`="'+params.description+'",`price`='+params.price+',`regular_price`='+params.regular_price+' WHERE `id`='+params.id+'').catch(err => err.message);
            if(data[0].fieldCount == 0){
                let response = {code : 200, massage: "update Success!"}
                return response;
            } else{
                ctx.body = data;
            }

        } catch (err) {
            ctx.badRequest("Post report controller error", { moreDetails: err });
        }
    }
};
