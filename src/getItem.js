'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getItem = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: 'table-item',
    Key: { id }
  };

  const { Item } = await dynamoDb.get(params).promise();

  if (!Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Item not found' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(Item)
  };
};
