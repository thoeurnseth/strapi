'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({strapi}) => ({

    // get product
    async find(ctx) {

        const start = ctx.request.header.start; 
        const limit = ctx.request.header.limit;

        try {
            const data = await strapi.service('api::product.product').find(
                {
                    fields: ["id", "title","description","price","regular_price",],
                    populate: {
                        image: {    
                            fields: ['id','url'],
                        },
                    },
                    sort: { id: 'desc' },
                    
                    pagination: {
                        start: start,
                        limit: limit,
                    },
                },
            );
            // let data_response = ctx.body = data;
            let response = {code : 200, massage: "success!" ,data: data}
            return response;
        } catch (err) {
            ctx.badRequest("Post report controller error", { moreDetails: err });
        }
    },

    // create product
    async create(ctx){
        const params = ctx.request.body;
        try{
            let title         = params.title;
            let description   = params.description;
            let price         = params.price;
            let regular_price = params.regular_price;
            let image         = params.image;
            let categories_id = params.categories_id;

            const result = await strapi.service('api::product.product').create(
                {
                    data: {
                        title:title,
                        description:description,
                        price:price,
                        regular_price:regular_price,
                        image:image,
                        categories: {
                            disconnect: [],
                            connect:[categories_id]
                        },
                    }
                }
            );
            let response = {code : 200, massage: "Create Success!", data: result}
            return response;
            
        }catch(err){
            ctx.badRequest("Post report controller error", { moreDetails: err });
        }
    },

    async update(entityId) {
        
        const id            = entityId.request.body.id;
        const title         = entityId.request.body.title;
        const description   = entityId.request.body.description;
        const price         = entityId.request.body.price;
        const regular_price = entityId.request.body.regular_price;

        try{
            const result = await strapi.service('api::product.product').update(id, 
                {
                    data: {
                        title:title,
                        description:description,
                        price:price,
                        regular_price:regular_price,
                    }
                }
            );
            let response = {code : 200, massage: "Update Success!", data: result}
            return response;
            
        }catch(err){
            entityId.badRequest("Post report controller error", { moreDetails: err });
        }
        // const result = await super.update(entityId, params);
    },

}));

// module.exports = {
//     async getPost(ctx, next) {
//         try {
//             let result = await strapi.db.connection.raw(`SELECT * from products`).catch(err => err.message);
//             // ctx.body = result[0];
//            let response = {code : 200, massage: "Success!" , data:result[0]}
//            return response;
//         } catch (err) {
//             ctx.badRequest("Post report controller error", { moreDetails: err });
//         }
//     },

//     async addPost(ctx, next) {
//         const params = ctx.request.body;
//         try {
//             const data = await strapi.db.connection.raw('INSERT INTO `products`(`title`, `description`, `price`, `regular_price`) VALUES ("'+params.title+'","'+params.description+'","'+params.price+'","'+params.regular_price+'")').catch(err => err.message);

//             if(data[0].fieldCount == 0){
//                 let response = {code : 200, massage: "Create Success!"}
//                 return response;
//             } else{
//                 ctx.body = data;
//             }
            
//         } catch (err) {
//             ctx.badRequest("Post report controller error", { moreDetails: err });
//         }
//     },

//     async deletePost(ctx, next){
//         let url = ctx.originalUrl.split('/');
//         let id  = url[(url.length-1)];
//         try {
//             const data = await strapi.db.connection.raw('DELETE FROM `products` WHERE `id` = '+id+'').catch(err => err.message);
            
//             if(data[0].fieldCount == 0){
//                 let response = {code : 200, massage: "delete Success!"}
//                 return response;
//             } else{
//                 ctx.body = data;
//             }

//         } catch (err) {
//             ctx.badRequest("Post report controller error", { moreDetails: err });
//         }
//     },

//     async updatePost(ctx, next){
//         let params = ctx.request.body;
//         try {
//             const data = await strapi.db.connection.raw('UPDATE `products` SET `title`="'+params.title+'",`description`="'+params.description+'",`price`='+params.price+',`regular_price`='+params.regular_price+' WHERE `id`='+params.id+'').catch(err => err.message);
//             if(data[0].fieldCount == 0){
//                 let response = {code : 200, massage: "update Success!"}
//                 return response;
//             } else{
//                 ctx.body = data;
//             }

//         } catch (err) {
//             ctx.badRequest("Post report controller error", { moreDetails: err });
//         }
//     }
// };
