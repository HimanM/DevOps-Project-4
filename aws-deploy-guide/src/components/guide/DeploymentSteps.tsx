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
          <li>Docker installed and running.</li>
          <li>A Next.js application ready to be containerized.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "step-2",
    title: "2. Install AWS CLI",
    content: (
      <div className="space-y-4">
        <p>Install the AWS Command Line Interface (CLI) to interact with AWS services from your terminal.</p>
        <div className="space-y-2">
          <p className="font-semibold">Windows:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi</code>
          </pre>
          <p className="font-semibold">macOS:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
              sudo installer -pkg AWSCLIV2.pkg -target /</code>
          </pre>
          <p className="font-semibold">Linux:</p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
            <code>curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              sudo ./aws/install</code>
          </pre>
        </div>
        <p>Verify installation:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws --version</code>
        </pre>
      </div>
    ),
  },
  {
    id: "step-3",
    title: "3. Create AWS Access Keys",
    content: (
      <div className="space-y-4">
        <p>To use the AWS CLI, you need to create access keys for your user.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Log in to the AWS Management Console.</li>
          <li>Click on your username in the top right corner and select <strong>Security credentials</strong>.</li>
          <li>Scroll down to the <strong>Access keys</strong> section.</li>
          <li>Click <strong>Create access key</strong>.</li>
          <li>Select <strong>Command Line Interface (CLI)</strong> as the use case.</li>
          <li>Check the confirmation box and click <strong>Next</strong>.</li>
          <li>Click <strong>Create access key</strong>.</li>
          <li><strong>IMPORTANT:</strong> Copy the <strong>Access key ID</strong> and <strong>Secret access key</strong> immediately. You will not be able to see the secret key again.</li>
        </ol>
        <div className="mt-4">
          <img
            src="/access_keys_created.png"
            alt="AWS Access Keys Creation"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: "step-4",
    title: "4. Login to AWS & Configure CLI",
    content: (
      <div className="space-y-4">
        <p>Open your terminal and configure your AWS credentials using the keys you just created:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws configure</code>
        </pre>
        <p>Enter the following when prompted:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>AWS Access Key ID:</strong> Paste your Access Key ID.</li>
          <li><strong>AWS Secret Access Key:</strong> Paste your Secret Access Key.</li>
          <li><strong>Default region name:</strong> Enter your preferred region (e.g., <code>us-east-1</code>).</li>
          <li><strong>Default output format:</strong> Enter <code>json</code>.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "step-5",
    title: "5. Create ECR Repository",
    content: (
      <div className="space-y-4">
        <p>Create a repository in Elastic Container Registry (ECR) to store your Docker images.</p>
        <p>Go to the AWS Console &gt; ECR &gt; Create repository.</p>
        <p>Or use the CLI:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws ecr create-repository --repository-name my-nextjs-app</code>
        </pre>
        <div className="mt-4">
          <img
            src="/repo_list.png"
            alt="ECR Repository List"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: "step-6",
    title: "6. Build and Push Docker Image",
    content: (
      <div className="space-y-4">
        <p>Authenticate Docker to your ECR registry:</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin &lt;your-account-id&gt;.dkr.ecr.us-east-1.amazonaws.com</code>
        </pre>
        <div className="mt-2">
          <img
            src="/push_commands.png"
            alt="ECR Push Commands"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
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
        <div className="mt-4">
          <img
            src="/ecr_repo_with_image.png"
            alt="ECR Repository with Image"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: "step-7",
    title: "7. Create ECS Cluster",
    content: (
      <div className="space-y-4">
        <p>Navigate to Elastic Container Service (ECS) in AWS Console.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Click <strong>Clusters</strong> &gt; <strong>Create Cluster</strong>.</li>
          <li>Name your cluster (e.g., <code>my-cluster</code>).</li>
          <li>Select <strong>AWS Fargate (serverless)</strong> infrastructure.</li>
        </ol>
        <div className="mt-4">
          <img
            src="/ecs_cluster_creation_form.png"
            alt="ECS Cluster Creation Form"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
        <ol className="list-decimal pl-6 space-y-2" start={4}>
          <li>Click <strong>Create</strong>.</li>
        </ol>
        <div className="mt-4">
          <img
            src="/ecs_cluster_created.png"
            alt="ECS Cluster Created"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: "step-8",
    title: "8. Create Task Definition",
    content: (
      <div className="space-y-4">
        <p>Define how your container should run.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Go to <strong>Task Definitions</strong> &gt; <strong>Create new Task Definition</strong>.</li>
          <li>Name it (e.g., <code>my-task-def</code>).</li>
          <li>Launch type: <strong>AWS Fargate</strong>.</li>
          <li>OS Architecture: <strong>Linux/X86_64</strong>.</li>
          <li>Task size: 0.5 vCPU, 1 GB Memory (adjust as needed).</li>
        </ol>
        <div className="mt-4 grid gap-4">
          <img
            src="/new_task_definition_form_1.png"
            alt="Task Definition Form 1"
            className="rounded-md border shadow-sm w-full"
          />
          <img
            src="/new_task_definition_form_2.png"
            alt="Task Definition Form 2"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
        <ol className="list-decimal pl-6 space-y-2" start={6}>
          <li>Container details:
            <ul className="list-disc pl-6 mt-2">
              <li>Name: <code>my-container</code></li>
              <li>Image URI: <code>&lt;your-account-id&gt;.dkr.ecr.us-east-1.amazonaws.com/my-nextjs-app:latest</code></li>
              <li>Container Port: <code>3000</code> (Ensure your Dockerfile exposes this port).</li>
            </ul>
          </li>
        </ol>
        <div className="mt-4">
          <img
            src="/ecr_image_selection_on_new_task_def.png"
            alt="ECR Image Selection"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
        <ol className="list-decimal pl-6 space-y-2" start={7}>
          <li>Click <strong>Create</strong>.</li>
        </ol>
        <div className="mt-4">
          <img
            src="/task_definition_creation_success.png"
            alt="Task Definition Created"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: "step-9",
    title: "9. Run Service / Task",
    content: (
      <div className="space-y-4">
        <p>Deploy the task to your cluster.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Go to your Cluster &gt; <strong>Services</strong> tab &gt; <strong>Create</strong>.</li>
          <li>Compute configuration: <strong>Launch type</strong> &gt; <strong>Fargate</strong>.</li>
          <li>Task definition: Select <code>my-task-def</code> (latest revision).</li>
          <li>Service name: <code>my-service</code>.</li>
          <li>Desired tasks: <code>1</code>.</li>
        </ol>
        <div className="mt-4 grid gap-4">
          <img
            src="/create_service_form_1.png"
            alt="Service Creation Form 1"
            className="rounded-md border shadow-sm w-full"
          />
          <img
            src="/create_service_form_2_env.png"
            alt="Service Creation Form 2"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
        <ol className="list-decimal pl-6 space-y-2" start={6}>
          <li>Networking:
            <ul className="list-disc pl-6">
              <li>VPC: Select your default VPC.</li>
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
        </ol>
        <div className="mt-4 grid gap-4">
          <img
            src="/create_service_form_3_deployment.png"
            alt="Service Creation Form 3"
            className="rounded-md border shadow-sm w-full"
          />
          <img
            src="/create_service_form_4_networking.png"
            alt="Service Creation Form 4"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
        <ol className="list-decimal pl-6 space-y-2" start={7}>
          <li>Click <strong>Create</strong>.</li>
        </ol>
        <div className="mt-4">
          <img
            src="/service_creation_success.png"
            alt="Service Created Success"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
      </div>
    ),
  },
  {
    id: "step-10",
    title: "10. Access Your Application",
    content: (
      <div className="space-y-4">
        <p>Wait for the task status to change to <strong>RUNNING</strong>.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Click on the Task ID in the Tasks tab.</li>
          <li>Find the <strong>Public IP</strong> address in the Network section.</li>
          <li>Open your browser and visit: <code>http://&lt;Public-IP&gt;:3000</code>.</li>
        </ol>
        <div className="mt-4">
          <img
            src="/access_application.png"
            alt="Application Running"
            className="rounded-md border shadow-sm w-full"
          />
        </div>
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
