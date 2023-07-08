import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { aws_s3 as s3 } from 'aws-cdk-lib'
import { GreenauraCoreApiGateway } from './apigateway'
import { GreenauraCoreLambda } from './lambda'

export class GreenauraCoreBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const greenauraCoreLambda = new GreenauraCoreLambda(
      this,
      id + 'greenauraCoreLambda',
      { ENV_NAME: 'DEV' }
    )

    // Creates API Gateway
    const greenauraCoreApiGateway = new GreenauraCoreApiGateway(
      this,
      id + 'apigw',
      {
        restApiName: `greenaura-core`,
        stageName: `dev`,
        coreLambda: greenauraCoreLambda.coreLambdaFunction,
      }
    )

    // CDK output for integration tests
    new cdk.CfnOutput(this, 'greenauraCoreApiUrl', {
      value: greenauraCoreApiGateway.api.url,
    })
  }
}
