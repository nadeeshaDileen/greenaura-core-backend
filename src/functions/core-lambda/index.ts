import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    // Lambda function logic goes here

    // Example: Extracting data from the event
    const { body } = event;

    // Example: Processing the data
    const result = processEvent(body);

    // Example: Returning a response
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    // Handling errors
    console.error('An error occurred:', error);

    // Example: Returning an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

// Example helper function
function processEvent(data: any) {
  // Function to process the event data
  // Replace this with your actual logic
  return { message: 'Event processed successfully', data };
}
