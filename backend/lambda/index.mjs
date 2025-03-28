import { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

// Setup DDB client and wrap it around DDBDocClient
const ddbClient = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Define the name of the DDB table to perform the CRUD operations on
const tableName = 'ssdp4300-p01-workouts';

export const handler = async (event, context) => {
  // If no operation is specified, default to getting all todos, shoudl not happen often
  if (!event.operation) {
    try {
      const response = await ddbDocClient.send(
        new ScanCommand({
          TableName: tableName,
        })
      );
      return response.Items || [];
    } catch (error) {
      console.error('Error scanning table:', error);
      throw error;
    }
  }

  // Extract operation from event
  const operation = event.operation;

  // For debugging purposes, just returns payload when echo operation called
  if (operation === 'echo') {
    return event.payload;
  } else {
    // If there's no payload provided with by the API
    if (!event.payload) {
      throw new Error('Payload is required for CRUD operations');
    }

    // Set the table name instead of hardcoding in API or frontend
    event.payload.TableName = tableName;
    let response;

    // Performs actual operation on DDB table
    try {
      switch (operation) {
        case 'createWorkout':
          response = await ddbDocClient.send(new PutCommand(event.payload));
          break;
        case 'getWorkout':
          response = await ddbDocClient.send(new GetCommand(event.payload));
          break;
        case 'getWorkoutsByUserId':
          response = await ddbDocClient.send(new QueryCommand(event.payload));
          break;
        case 'getWorkoutsByExerciseType':
          response = await ddbDocClient.send(new QueryCommand(event.payload));
          break;
        case 'updateWorkout':
          response = await ddbDocClient.send(new UpdateCommand(event.payload));
          break;
        case 'deleteWorkout':
          response = await ddbDocClient.send(new DeleteCommand(event.payload));
          break;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
      // Logs and returns response after operaiton occured without an error
      console.log('Operation response:', response);
      return response;
    } catch (error) {
      console.error(`Error performing ${operation} operation:`, error);
      throw error;
    }
  }
};
