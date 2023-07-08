import { Construct } from 'constructs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as path from 'path'
import * as lambda from 'aws-cdk-lib/aws-lambda'

interface GreenauraCoreLambdaProps {
  ENV_NAME: string
}
export class GreenauraCoreLambda extends Construct {
  coreLambdaFunction

  constructor(scope: Construct, id: string, props: GreenauraCoreLambdaProps) {
    super(scope, id)

    // Create core lambda function
    this.coreLambdaFunction = new NodejsFunction(this, 'CoreLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'lambdaHandler',
      entry: path.join(__dirname, '../src/functions/core-lambda/index.ts'),
    })
  }
}
