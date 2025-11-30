"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const steps = [
  {
    id: "step-1",
    title: "1. Prerequisites",
    content: (
      <div className="space-y-4">
        <p>Before you begin, ensure you have the following:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>An active AWS Account.</li>
          <li>AWS CLI installed and configured on your machine.</li>
          <li>Docker installed and running.</li>
          <li>A Next.js application ready to be containerized.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "step-2",
    title: "2. Login to AWS & Configure CLI",
    content: (
      <div className="space-y-4">
        <p>Open your terminal and configure your AWS credentials:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws configure</code>
        </pre>
        <p>Enter your Access Key ID, Secret Access Key, Region (e.g., us-east-1), and Output format (json).</p>
      </div>
    ),
  },
  {
    id: "step-3",
    title: "3. Create ECR Repository",
    content: (
      <div className="space-y-4">
        <p>Create a repository in Elastic Container Registry (ECR) to store your Docker images.</p>
        <p>Go to the AWS Console &gt; ECR &gt; Create repository.</p>
        <p>Or use the CLI:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws ecr create-repository --repository-name my-nextjs-app</code>
        </pre>
      </div>
    ),
  },
  {
    id: "step-4",
    title: "4. Build and Push Docker Image",
    content: (
      <div className="space-y-4">
        <p>Authenticate Docker to your ECR registry:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin &lt;your-account-id&gt;.dkr.ecr.us-east-1.amazonaws.com</code>
        </pre>
        <p>Build your Docker image:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>docker build -t my-nextjs-app .</code>
        </pre>
        <p>Tag the image:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>docker tag my-nextjs-app:latest &lt;your-account-id&gt;.dkr.ecr.us-east-1.amazonaws.com/my-nextjs-app:latest</code>
        </pre>
        <p>Push the image:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>docker push &lt;your-account-id&gt;.dkr.ecr.us-east-1.amazonaws.com/my-nextjs-app:latest</code>
        </pre>
      </div>
    ),
  },
  {
    id: "step-5",
    title: "5. Create ECS Cluster",
    content: (
      <div className="space-y-4">
        <p>Navigate to Elastic Container Service (ECS) in AWS Console.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Click <strong>Clusters</strong> &gt; <strong>Create Cluster</strong>.</li>
          <li>Name your cluster (e.g., <code>my-cluster</code>).</li>
          <li>Select <strong>AWS Fargate (serverless)</strong> infrastructure.</li>
          <li>Click <strong>Create</strong>.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "step-6",
    title: "6. Create Task Definition",
    content: (
      <div className="space-y-4">
        <p>Define how your container should run.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Go to <strong>Task Definitions</strong> &gt; <strong>Create new Task Definition</strong>.</li>
          <li>Name it (e.g., <code>my-task-def</code>).</li>
          <li>Launch type: <strong>AWS Fargate</strong>.</li>
          <li>OS Architecture: <strong>Linux/X86_64</strong>.</li>
          <li>Task size: 0.5 vCPU, 1 GB Memory (adjust as needed).</li>
          <li>Container details:
            <ul className="list-disc pl-6 mt-2">
              <li>Name: <code>my-container</code></li>
              <li>Image URI: <code>&lt;your-account-id&gt;.dkr.ecr.us-east-1.amazonaws.com/my-nextjs-app:latest</code></li>
              <li>Container Port: <code>3000</code> (Ensure your Dockerfile exposes this port).</li>
            </ul>
          </li>
          <li>Click <strong>Create</strong>.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "step-7",
    title: "7. Run Service / Task",
    content: (
      <div className="space-y-4">
        <p>Deploy the task to your cluster.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Go to your Cluster &gt; <strong>Services</strong> tab &gt; <strong>Create</strong>.</li>
          <li>Compute configuration: <strong>Launch type</strong> &gt; <strong>Fargate</strong>.</li>
          <li>Task definition: Select <code>my-task-def</code> (latest revision).</li>
          <li>Service name: <code>my-service</code>.</li>
          <li>Desired tasks: <code>1</code>.</li>
          <li>Networking:
            <ul className="list-disc pl-6 mt-2">
              <li>VPC: Select default or your VPC.</li>
              <li>Subnets: Select all available.</li>
              <li>Security Group: <strong>Create new security group</strong>.
                <ul className="list-disc pl-6">
                  <li>Type: Custom TCP</li>
                  <li>Port range: <code>3000</code></li>
                  <li>Source: <code>Anywhere (0.0.0.0/0)</code> (for testing).</li>
                </ul>
              </li>
              <li><strong>Auto-assign public IP: ENABLED</strong> (Crucial for access).</li>
            </ul>
          </li>
          <li>Click <strong>Create</strong>.</li>
        </ol>
      </div>
    ),
  },
  {
    id: "step-8",
    title: "8. Access Your Application",
    content: (
      <div className="space-y-4">
        <p>Wait for the task status to change to <strong>RUNNING</strong>.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Click on the Task ID in the Tasks tab.</li>
          <li>Find the <strong>Public IP</strong> address in the Network section.</li>
          <li>Open your browser and visit: <code>http://&lt;Public-IP&gt;:3000</code>.</li>
        </ol>
        <p className="text-green-400 font-bold mt-4">Congratulations! Your container is deployed.</p>
      </div>
    ),
  },
];

export default function DeploymentSteps() {
  return (
    <Card className="w-full max-w-4xl mx-auto border-none bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center mb-6">Deployment Workflow</CardTitle>
        <CardDescription className="text-center text-lg">
          Follow these steps to deploy your containerized application on AWS ECS Fargate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <Accordion type="single" collapsible className="w-full">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={step.id}>
                  <AccordionTrigger className="text-xl font-semibold hover:text-primary transition-colors">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {step.content}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
