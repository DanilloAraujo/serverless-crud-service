'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

module.exports.createItem = async (event) => {
  const { name } = JSON.parse(event.body);
  const id = uuidv4();

  const params = {
    TableName: 'table-item',
    Item: { id, name }
  };

  await dynamoDb.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(params.Item)
  };
};
