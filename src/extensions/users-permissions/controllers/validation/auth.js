'use strict';
const { yup, validateYupSchema } = require('@strapi/utils');
const callbackBodySchema = yup.object().shape({
  identifier: yup.string().required(),
  password: yup.string().required(),
});
console.log(callbackBodySchema,'223453211111');
module.exports = {
  validateCallbackBody: validateYupSchema(callbackBodySchema)
};