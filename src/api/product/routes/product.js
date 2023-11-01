'use strict';

/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product');


//   module.exports = {
//     routes: [
//         {
//             method: "GET",
//             path: "/product",
//             handler: "product.getPost",
//             config: {
//                 policies: [],
//                 middlewares: [],
//             },
//         },
//         {
//             method: "POST",
//             path: "/product",
//             handler: "product.addPost",
//             config: {
//                 policies: [],
//                 middlewares: [],
//             },
//         },

//         {
//             method: "DELETE",
//             path: "/product/:id",    
//             handler: "product.deletePost",
//             config: {
//                 policies: [],
//                 middlewares: [],
//             },
//         },

//         {
//             method: "PUT",
//             path: "/product",    
//             handler: "product.updatePost",
//             config: {
//                 policies: [],
//                 middlewares: [],
//             },
//         }
//     ]

// }