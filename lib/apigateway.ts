import * as apigw from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

interface GreenauraCoreApigwProps {
  restApiName: string
  stageName: string
  coreLambda: any
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

    // GET /core-endpoint
    coreResource.addMethod('GET', new apigw.LambdaIntegration(props.coreLambda))
  }
}
