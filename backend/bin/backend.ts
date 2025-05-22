#!/usr/bin/env node
import "dotenv/config";
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SmartPropertyStack } from "../lib/smart-property-stack";

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || "us-east-1",
};

new SmartPropertyStack(app, "SmartPropertyStack", {
  env,
  stackName: "smart-property-stack",
  description: "Smart Property Management Backend Stack",
});
