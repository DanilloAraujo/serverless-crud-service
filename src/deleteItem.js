'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteItem = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'table-item',
    Key: { id },
    ReturnValues: 'ALL_OLD'
  };

  const { Attributes } = await dynamoDb.delete(params).promise();

  if (!Attributes) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Item not found' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Item deleted successfully' })
  };
};
