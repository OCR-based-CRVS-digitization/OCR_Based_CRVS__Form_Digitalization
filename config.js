// this config file holds information for connection & configuration
const connectionString = 'postgresql://erfan:wMWxC7BOYdUCxXJAnn0dZQ@crbs-ocr-5473.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full';
const PORT = 8080;
const secretKey = 'ocr_based_crbs_form';

module.exports = {
  connectionString,
  PORT,
  secretKey
};
