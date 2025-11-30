# Guide to Deploy a Container in AWS

This is a Next.js application that serves as a comprehensive guide for deploying containerized applications on AWS ECS Fargate. It includes a step-by-step workflow, prerequisites, and links to other DevOps projects.

## Features

- **Interactive Guide**: Step-by-step instructions for AWS deployment.
- **Modern UI**: Built with shadcn/ui and Tailwind CSS in a dark theme.
- **Animations**: Smooth workflow animations using Framer Motion.
- **Project Hub**: Links to other DevOps projects.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## CI/CD Pipeline (GitHub Actions)

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys the application to AWS ECS whenever changes are pushed to the `main` branch.

### Prerequisites for CI/CD
You must configure the following **Secrets** in your GitHub Repository (Settings > Secrets and variables > Actions):

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | Your AWS Access Key ID | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | Your AWS Secret Access Key | `wJalr...` |
| `AWS_REGION` | AWS Region | `us-west-2` |
| `ECR_REPOSITORY` | Name of your ECR Repository | `aws-deploy-guide` |
| `ECS_CLUSTER` | Name of your ECS Cluster | `aws-deploy-guide-cluster` |
| `ECS_SERVICE` | Name of your ECS Service | `aws-deploy-guide-task-service` |
| `ECS_TASK_DEFINITION` | Name of your Task Definition Family | `aws-deploy-guide-task` |
| `CONTAINER_NAME` | Name of the container in Task Def | `aws-deploy-guide-container` |

### Workflow Stages
1.  **Build and Push:** Builds the Docker image and pushes it to Amazon ECR.
2.  **Deploy to ECS:** Updates the ECS Task Definition with the new image and deploys it to the ECS Service.

## Docker Deployment

This project includes a `Dockerfile` to containerize the application.

### Build the Docker Image

```bash
docker build -t aws-deploy-guide .
```

### Run the Container Locally

```bash
docker run -p 3000:3000 aws-deploy-guide
```

Access the application at `http://localhost:3000`.

## AWS Deployment Steps (Summary)

1.  **Login to AWS**: Configure CLI and login to ECR.
2.  **Push Image**: Tag and push your Docker image to ECR.
3.  **Create Cluster**: Set up an ECS Fargate cluster.
4.  **Deploy Service**: Create a task definition and service to run your container.
5.  **Access**: Use the public IP assigned to your task.

For detailed steps, run the application and follow the interactive guide.
