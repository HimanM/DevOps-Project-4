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
