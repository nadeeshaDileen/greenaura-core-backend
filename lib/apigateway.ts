import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

interface GreenauraCoreApigwProps {
  restApiName: string
  stageName: string
}

export class GreenauraCoreApiGateway extends Construct {
  api

  constructor(scope: Construct, id: string, props: GreenauraCoreApigwProps) {
    super(scope, id)

    this.api = new apigw.RestApi(this, `greenaura-core`, {
      description: 'Greenaura Core API Gateway',
      restApiName: props.restApiName,
      deployOptions: {
        stageName: props.stageName,
      },
    })

    //API Resources
    const coreResource = this.api.root.addResource('core-endpoint')

    // Create the Lambda function
    const coreLambdaFunction = new lambda.Function(this, 'CoreLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
            exports.handler = async function(event, context) {
              return {
                statusCode: 200,
                body: "{"data":"Welcome to, Greenaura backend!"}",
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
              }
              };
            };
          `),
    })

    // GET /core-endpoint
    coreResource.addMethod(
      'GET',
      new apigw.LambdaIntegration(coreLambdaFunction)
    )
  }
}
