import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

interface GreenauraCoreApigwProps {
  restApiName: string;
  stageName: string;
}

export class GreenauraCoreApiGateway extends Construct {
  api;

  constructor(scope: Construct, id: string, props: GreenauraCoreApigwProps) {
    super(scope, id);

    this.api = new apigw.RestApi(this, `greenaura-core`, {
      description: "Greenaura Core API Gateway",
      restApiName: props.restApiName,
      deployOptions: {
        stageName: props.stageName,
      },
    });

    //API Resources
    const coreResource = this.api.root.addResource("coreresource");

    // Create the Lambda function
    const myLambdaFunction = new lambda.Function(this, "MyLambdaFunction", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromInline(`
            exports.handler = async function(event, context) {
              return {
                statusCode: 200,
                body: 'Hello, Greenaura!'
              };
            };
          `),
    });

    // GET /core-resources
    coreResource.addMethod(
      "GET",
      new apigw.LambdaIntegration(myLambdaFunction)
    );
  }
}