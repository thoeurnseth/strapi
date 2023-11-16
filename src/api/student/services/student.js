'use strict';
const   {handlerError}   = require('../../../util/handler');
const   {serviceID}      = require('../../../util/schema');
const   {getStudent}     = require('../../../util/schema');

/**
 * student service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::student.student',({strapi}) =>({
    async find(ctx){
        try{
            const student = await strapi.entityService.findMany(serviceID.student,getStudent());
            return student;
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },
}));
