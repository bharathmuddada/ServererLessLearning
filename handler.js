'use strict';

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb"); 
const client = new DynamoDBClient({region: "us-east-1"});
const { DynamoDBDocumentClient,PutCommand,UpdateCommand,DeleteCommand,GetCommand,ScanCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.NOTES_TABLE_NAME;

module.exports.createNote = async (event) => {
  let data = JSON.parse(event.body);
  try {
    await ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        notesId: crypto.randomUUID(),
        title: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(notesId)",
    }));
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          message: 'Notes created successfully!',
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
  }

};

module.exports.updateNote = async (event) => {
  const notesId = event.pathParameters.id;
  let data = JSON.parse(event.body);
  try {
    await ddbDocClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        notesId: notesId,
      },
      UpdateExpression: "set #title = :title, #body = :body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":body": data.body,
      },
      ConditionExpression: "attribute_exists(notesId)",
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Notes updated successfully!',
        },
        null,
        2
      ),
    };   
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
  }
};

module.exports.deleteNote = async (event) => {
  const notesId = event.pathParameters.id;
  try {
    await ddbDocClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        notesId: notesId,
      },
      ConditionExpression: "attribute_exists(notesId)",
    }));
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Notes with id=${notesId} is delete!`,
      },
      null,
      2
    ),
  };
};

module.exports.getNoteById = async (event) => {
  const notesId = event.pathParameters.id;
  try {
    await ddbDocClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        notesId: notesId,
      },
      ProjectionExpression: "#title, #body",
      ExpressionAttributeNames: {
        "#title": "title",
        "#body": "body",
      },
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: `Notes with id=${notesId} is retrieved!`,
        },
        null,
        2
      ),
    };
    
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
  }
  
};

module.exports.getAllNotes = async (event) => {
 
  try {
    let params = {
      TableName: TABLE_NAME,
      Limit: 2
    };

    let lastEvaluatedKey = null;
    let allItems = [];

    do {
      if(lastEvaluatedKey) {
       params.ExclusiveStartKey = lastEvaluatedKey;
      }
      const data = await ddbDocClient.send(new ScanCommand(params));
      lastEvaluatedKey = data.LastEvaluatedKey;
      console.log(`${data.Items?.length} items retrieved`);
      allItems = allItems.concat(data.Items);
    }
    while(lastEvaluatedKey);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
         Items: allItems
        },
        null,
        2
      ),
    };
    
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.message),
    };
    
  }
};

