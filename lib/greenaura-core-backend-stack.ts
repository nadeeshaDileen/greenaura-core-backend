import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { aws_s3 as s3 } from "aws-cdk-lib";
import { GreenauraCoreApiGateway } from "./apigateway";

export class GreenauraCoreBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Creates API Gateway
    const greenauraCoreApiGateway = new GreenauraCoreApiGateway(
      this,
      id + "apigw",
      {
        restApiName: `greenaura-core`,
        stageName: `dev`,
      }
    );
  }
}
