'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateItem = async (event) => {
  const { id } = event.pathParameters;
  const { name } = JSON.parse(event.body);

  const params = {
    TableName: 'table-item',
    Key: { id },
    UpdateExpression: 'SET #name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':name': name },
    ReturnValues: 'ALL_NEW'
  };

  const { Attributes } = await dynamoDb.update(params).promise();

  if (!Attributes) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Item not found' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(Attributes)
  };
};
