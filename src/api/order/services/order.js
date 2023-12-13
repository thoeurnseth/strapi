'use strict';
const   {serviceID}         = require('../../../util/schema');
const   {handlerError}      = require('../../../util/handler');

/**
 * order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order.order',({strapi})=>({
    
}));
