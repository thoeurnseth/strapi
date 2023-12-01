'use strict';
const   {handlerError}   = require('../../../util/handler');
const   {sendOtp}        = require('../../../util/function');
const   {serviceID}      = require('../../../util/schema');
/**
 * plusgate service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::plusgate.plusgate',({strapi}) => ({
    async find(ctx){
        try{
            const plusgate = await strapi.entityService.findMany(serviceID.plusgate);
            const otp = await  sendOtp(plusgate);
            return plusgate;
        }catch(error){
            return handlerError('EXEPTION ERROR',error)
        }
    },
}));
