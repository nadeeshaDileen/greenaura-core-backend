import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GreenauraCoreBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //This is sample comment

    // example resource
    // const queue = new sqs.Queue(this, 'GreenauraCoreBackendQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}