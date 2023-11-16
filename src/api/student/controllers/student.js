'use strict';
const   {handlerResponse}   = require('../../../util/handler');
const   {serviceID}    = require('../../../util/schema');
/**
 * student controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::student.student',({strapi}) =>({
    async find(ctx){
        const student = await strapi.service(serviceID.student).find(ctx);
        return handlerResponse(200,student)
    },
}));