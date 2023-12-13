'use strict';
const   {serviceID}         = require('../../../util/schema')
const   {handlerResponse}   = require('../../../util/handler');

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order');
