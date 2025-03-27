const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const workoutId = event.pathParamaters.id;

  const params = {
    TableName: 'Workouts',
    Key: { id: workoutId },
  };

  try {
    const data = await dynamoDB.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
