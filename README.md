# AWS ECS Fargate Deployment with CI/CD

> **A comprehensive DevOps learning project demonstrating containerized application deployment on AWS ECS**

![Project Home](docs/guide_home.png)

This repository contains a Next.js application designed to serve as a comprehensive, interactive guide for deploying containerized applications to AWS ECS Fargate. It documents the entire DevOps lifecycle, from configuring AWS credentials to setting up a CI/CD pipeline with GitHub Actions, providing a hands-on learning experience with real-world tools and practices.

## Table of Contents

- [About This Project](#about-this-project)
- [Technologies Used](#technologies-used)
- [Techniques & Concepts](#techniques--concepts)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
  - [Step 1: Configure AWS Credentials](#step-1-configure-aws-credentials)
  - [Step 2: Create ECR Repository](#step-2-create-ecr-repository)
  - [Step 3: Build and Push Docker Image](#step-3-build-and-push-docker-image)
  - [Step 4: Create ECS Cluster](#step-4-create-ecs-cluster)
  - [Step 5: Create Task Definition](#step-5-create-task-definition)
  - [Step 6: Deploy ECS Service](#step-6-deploy-ecs-service)
- [CI/CD Pipeline](#cicd-pipeline)
- [Verification](#verification)
- [Screenshots/Visual Reference](#screenshotsvisual-reference)
- [License](#license)
- [Author](#author)

## About This Project

This project is built for **learning DevOps practices and AWS cloud deployment** through hands-on experience. It demonstrates a complete workflow for deploying a modern web application to AWS using industry-standard tools and practices.

The application itself serves multiple purposes:
- **Educational Guide**: An interactive, step-by-step deployment walkthrough
- **Reference Implementation**: Production-ready DevOps pipeline configuration
- **Learning Platform**: Hands-on experience with AWS ECS, Docker, and GitHub Actions
- **DevOps Dashboard**: A centralized hub linking to related DevOps projects

This project breaks down complex cloud deployment tasks into manageable, well-documented steps, making it ideal for developers looking to understand container orchestration, cloud infrastructure, and CI/CD automation.

## Technologies Used

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-20-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-ECS_Fargate-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![AWS ECR](https://img.shields.io/badge/AWS-ECR-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

**Frontend & UI:**
- Next.js 14 (React framework with App Router)
- TypeScript for type safety
- Tailwind CSS for utility-first styling
- Shadcn/UI component library
- Lucide Icons for modern iconography

**Infrastructure & Cloud:**
- AWS ECS (Elastic Container Service) with Fargate
- AWS ECR (Elastic Container Registry)
- AWS IAM for access management
- AWS VPC, Subnets, and Security Groups

**DevOps & Automation:**
- Docker for containerization
- GitHub Actions for CI/CD pipeline
- AWS CLI for infrastructure management

## Techniques & Concepts

This project demonstrates the following DevOps techniques and concepts:

**Container Technologies:**
- Containerization with Docker
- Multi-stage Docker builds for optimized images
- Container registry management (AWS ECR)
- Container orchestration with ECS Fargate

**Cloud Infrastructure:**
- Serverless container deployment (AWS Fargate)
- Infrastructure as code principles
- Cloud networking (VPC, subnets, security groups)
- IAM roles and policies for secure access

**CI/CD & Automation:**
- Continuous Integration with GitHub Actions
- Continuous Deployment to AWS ECS
- Automated Docker image builds
- Secrets management in CI/CD pipelines
- Zero-downtime deployments with rolling updates

**DevOps Best Practices:**
- Infrastructure documentation
- Environment variable management
- Security best practices (IAM policies, secrets management)
- Monitoring and verification strategies
- Mobile-responsive application design

## Architecture

This project implements a modern cloud-native architecture for deploying containerized web applications:

**Application Layer:**
- Next.js 14 application with React Server Components
- Server-side rendering (SSR) and static generation capabilities
- RESTful API routes for backend functionality
- Responsive UI built with Tailwind CSS and Shadcn components

**Container Layer:**
- Application containerized using Docker
- Multi-stage Docker build optimizes image size
- Container images stored in AWS Elastic Container Registry (ECR)
- Images tagged with Git SHA for version tracking

**Orchestration Layer:**
- AWS ECS Fargate manages container lifecycle
- Task Definitions define container specifications (CPU, memory, ports)
- ECS Services maintain desired task count and handle load balancing
- Fargate provides serverless compute, eliminating server management

**Network Layer:**
- Application deployed in AWS VPC
- Public subnets with Internet Gateway for external access
- Security groups control inbound/outbound traffic
- Port 3000 exposed for application access

**CI/CD Pipeline:**
- GitHub Actions workflow triggered on push to main branch
- Automated Docker image build and push to ECR
- Automatic ECS service updates with new task definitions
- Rolling deployment strategy ensures zero downtime

**Security:**
- AWS IAM roles for ECS task execution
- GitHub Secrets for secure credential storage
- Security groups restrict network access
- ECR private repositories for image storage

## Prerequisites

Before you begin, ensure you have the following:

**Required Accounts:**
- AWS Account with appropriate permissions (ECS, ECR, IAM)
- GitHub Account (for repository and CI/CD)

**Required Tools:**
- [AWS CLI](https://aws.amazon.com/cli/) installed and configured
- [Docker](https://docs.docker.com/get-docker/) installed locally
- [Git](https://git-scm.com/downloads) for version control
- [Node.js](https://nodejs.org/) 18+ and npm (for local development)

**AWS Permissions:**
Your AWS user/role needs permissions for:
- IAM (creating access keys, roles)
- ECR (creating repositories, pushing images)
- ECS (creating clusters, task definitions, services)
- VPC (viewing/configuring networking)

**Knowledge Prerequisites:**
- Basic understanding of Docker and containers
- Familiarity with AWS console
- Basic command-line experience
- Understanding of Git workflows

## Getting Started

To replicate this project and deploy your own application:

**1. Clone the Repository**

```bash
git clone https://github.com/HimanM/DevOps-Project-4.git
cd DevOps-Project-4
```

**2. Install Dependencies (for local development)**

```bash
npm install
```

**3. Run Locally (optional)**

```bash
npm run dev
```

Access the application at `http://localhost:3000` to see the interactive deployment guide.

**4. Follow Setup Instructions**

Continue with the [Setup Instructions](#setup-instructions) section below to deploy to AWS.

## Setup Instructions

This section provides a complete step-by-step walkthrough for deploying the application to AWS ECS Fargate.

### Step 1: Configure AWS Credentials

**Purpose:** Set up programmatic access to AWS services via the AWS CLI.

**Actions:**

1. Navigate to AWS IAM Console → Users → Your User → Security Credentials
2. Click "Create access key"
3. Download and securely store the Access Key ID and Secret Access Key

![AWS Access Keys Created](docs/access_keys_created.png)

4. Configure AWS CLI with your credentials:

```bash
aws configure
```

**What this does:** This command prompts you to enter your AWS Access Key ID, Secret Access Key, default region (e.g., `us-east-1`), and output format (e.g., `json`). It stores these credentials locally in `~/.aws/credentials`, allowing the AWS CLI to authenticate all subsequent commands.

> [!IMPORTANT]
> Never commit your AWS credentials to version control. Keep them secure and rotate them regularly.

### Step 2: Create ECR Repository

**Purpose:** Set up a private container registry to store Docker images.

**Actions:**

1. Navigate to AWS ECR Console
2. Click "Create repository"
3. Name your repository (e.g., `devops-project-4`)
4. Leave other settings as default
5. Click "Create repository"

![ECR Repository List](docs/repo_list.png)

**What this creates:** An AWS Elastic Container Registry (ECR) repository acts as a private Docker registry where you can securely store, manage, and deploy Docker container images. This is similar to Docker Hub but integrated with AWS services.

### Step 3: Build and Push Docker Image

**Purpose:** Package the application into a Docker container and upload it to ECR.

**Actions:**

1. In the ECR console, click on your repository
2. Click "View push commands" to see the authentication and push commands

![ECR Push Commands](docs/push_commands.png)

3. Execute the commands in your terminal:

**Command 1: Authenticate Docker to ECR**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com
```

**What this does:** Retrieves a temporary authentication token from ECR and pipes it to Docker's login command, allowing Docker to push images to your private ECR registry.

**Command 2: Build Docker Image**
```bash
docker build -t devops-project-4 .
```

**What this does:** Reads the `Dockerfile` in your current directory and builds a Docker image with all application code, dependencies, and configurations. The `-t` flag tags the image with the name `devops-project-4` for easy reference.

**Command 3: Tag Docker Image**
```bash
docker tag devops-project-4:latest <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/devops-project-4:latest
```

**What this does:** Creates an additional tag for your local image using the ECR repository URI format. This is required because Docker needs to know the destination registry when pushing.

**Command 4: Push to ECR**
```bash
docker push <aws_account_id>.dkr.ecr.us-east-1.amazonaws.com/devops-project-4:latest
```

**What this does:** Uploads your Docker image layers to the ECR repository. Docker efficiently transfers only the layers that don't already exist in the registry.

![CLI Push Success](docs/cli_push_success.png)

4. Verify the image appears in your ECR repository:

![ECR Repository with Image](docs/ecr_repo_with_image.png)

### Step 4: Create ECS Cluster

**Purpose:** Set up a logical grouping of ECS services and tasks.

**Actions:**

1. Navigate to AWS ECS Console
2. Click "Create Cluster"
3. Configure cluster settings:
   - Cluster name: `devops-project-4-cluster`
   - Infrastructure: AWS Fargate (serverless)
   - Leave other defaults

![ECS Cluster Creation Form](docs/ecs_cluster_creation_form.png)

**What this does:** An ECS Cluster is a logical grouping that can contain multiple services and tasks. With Fargate, AWS manages the underlying infrastructure, so you don't need to provision or manage EC2 instances.

4. Click "Create"

![ECS Cluster Created](docs/ecs_cluster_created.png)

### Step 5: Create Task Definition

**Purpose:** Define how your container should run (image, CPU, memory, ports).

**Actions:**

1. Navigate to ECS → Task Definitions
2. Click "Create new Task Definition"
3. Configure task definition (Step 1):
   - Task definition family: `devops-project-4-task`
   - Launch type: Fargate
   - Task role: Create new role or use existing
   - Task execution role: Create new role or use ecsTaskExecutionRole
   - Task memory: 0.5 GB (512)
   - Task CPU: 0.25 vCPU (256)

![New Task Definition Form 1](docs/new_task_definition_form_1.png)

**What this does:** Task definitions are blueprints that tell ECS how to run your Docker container. The task memory and CPU settings determine the resources allocated to your application. The execution role allows ECS to pull images from ECR and write logs to CloudWatch.

4. Configure container definition (Step 2):
   - Container name: `devops-project-4-container`
   - Image URI: Select from your ECR repository
   - Port mappings: Container port `3000`, Protocol `TCP`

![New Task Definition Form 2](docs/new_task_definition_form_2.png)

5. Select your ECR image URI:

![ECR Image Selection](docs/ecr_image_selection_on_new_task_def.png)

**What this does:** This links your task definition to the specific Docker image in ECR. The port mapping (3000) exposes your Next.js application's default port to the outside world.

6. Click "Create"

![Task Definition Creation Success](docs/task_definition_creation_success.png)

### Step 6: Deploy ECS Service

**Purpose:** Run and maintain your application with automatic scaling and load balancing.

**Actions:**

1. Navigate to your ECS Cluster
2. Click "Create Service"
3. Configure service (Step 1):
   - Launch type: Fargate
   - Task definition: Select your task definition
   - Service name: `devops-project-4-service`
   - Number of tasks: 1

![Create Service Form 1](docs/create_service_form_1.png)

**What this does:** An ECS Service ensures that the specified number of tasks are constantly running. If a task fails, the service automatically launches a replacement.

4. Configure environment (Step 2):
   - Platform version: LATEST
   - Deployment type: Rolling update

![Create Service Form 2](docs/create_service_form_2_env.png)

**What this does:** Rolling updates allow zero-downtime deployments. When updating, ECS starts new tasks before stopping old ones, ensuring your application remains available.

5. Configure deployment (Step 3):
   - Minimum healthy percent: 100
   - Maximum percent: 200

![Create Service Form 3](docs/create_service_form_3_deployment.png)

**What this does:** These settings control how updates roll out. With 100% minimum and 200% maximum, ECS starts new tasks alongside old ones before terminating the old tasks, ensuring continuous availability.

6. Configure networking (Step 4):
   - VPC: Select your default VPC
   - Subnets: Select public subnets
   - Security group: Create new or select existing
     - Allow inbound TCP traffic on port 3000
   - Auto-assign public IP: ENABLED

![Create Service Form 4 Networking](docs/create_service_form_4_networking.png)

**What this does:** This configures the network infrastructure. The public IP allows direct access to your application. The security group acts as a firewall, controlling which ports are accessible.

7. Click "Create Service"

![Service Creation Success](docs/service_creation_success.png)

**Result:** Your application is now deployed! ECS will launch your container and maintain it in a running state.

## CI/CD Pipeline

This project includes a fully automated CI/CD pipeline using GitHub Actions that automatically builds and deploys your application when you push changes to the main branch.

### Pipeline Overview

The GitHub Actions workflow automates the entire deployment process:

1. **Trigger**: Workflow runs on every push to the `main` branch
2. **Build**: Checks out code, logs into AWS, builds Docker image
3. **Push**: Pushes the image to ECR with a Git SHA tag
4. **Deploy**: Updates ECS task definition and deploys to ECS service
5. **Verify**: ECS performs rolling deployment with health checks

### Required GitHub Secrets

To enable the CI/CD pipeline, configure these secrets in your GitHub repository (Settings → Secrets and variables → Actions):

![GitHub Secrets](docs/github_secrets.png)

**Required Secrets:**

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | AWS region for deployment | `us-east-1` |
| `ECR_REPOSITORY` | Name of your ECR repository | `devops-project-4` |
| `ECS_CLUSTER` | Name of your ECS cluster | `devops-project-4-cluster` |
| `ECS_SERVICE` | Name of your ECS service | `devops-project-4-service` |
| `ECS_TASK_DEFINITION` | Task definition family name | `devops-project-4-task` |
| `CONTAINER_NAME` | Container name in task definition | `devops-project-4-container` |

### Workflow Visualization

You can monitor deployments in the GitHub Actions tab:

![GitHub Workflow](docs/github_workflow.png)

The workflow performs these steps:

1. **Checkout**: Downloads repository code
2. **Configure AWS credentials**: Authenticates with AWS using stored secrets
3. **Login to Amazon ECR**: Authenticates Docker with ECR
4. **Build image**: Builds Docker image from Dockerfile
5. **Tag image**: Tags image with Git commit SHA for traceability
6. **Push to ECR**: Uploads image to container registry
7. **Download task definition**: Retrieves current task definition JSON
8. **Update task definition**: Modifies JSON with new image URI
9. **Deploy to ECS**: Updates ECS service with new task definition
10. **Wait for stability**: Monitors deployment until service is stable

### Benefits of This CI/CD Pipeline

- **Automation**: No manual deployment steps required
- **Consistency**: Every deployment follows the same process
- **Traceability**: Each deployment is tagged with the Git commit SHA
- **Fast Feedback**: See deployment results within minutes
- **Zero Downtime**: Rolling deployments keep application available
- **Rollback Ready**: Previous task definitions retained for quick rollback

## Verification

After deployment, verify your application is running correctly:

### 1. Check ECS Service Status

Navigate to ECS Console → Clusters → Your Cluster → Services → Your Service:
- Verify "Running count" matches "Desired count"
- Check that tasks are in "RUNNING" state
- Confirm "Last deployment" status is "COMPLETED"

### 2. Find Public IP Address

1. Click on your service
2. Go to the "Tasks" tab
3. Click on the running task
4. Find the "Public IP" in the task details

### 3. Access the Application

Open your browser and navigate to:
```
http://<your-task-public-ip>:3000
```

![Access Application](docs/access_application.png)

You should see the application dashboard:

![Deployed Application](docs/deployed_application.png)

### 4. Test Functionality

- Verify the interactive deployment guide loads
- Check that all navigation links work
- Test mobile responsiveness by resizing your browser
- Confirm the DevOps project links are functional

### 5. Monitor Logs (Optional)

Check CloudWatch Logs for application output:
1. Navigate to CloudWatch → Log groups
2. Find the log group: `/ecs/devops-project-4-task`
3. View logs to ensure no errors

> [!NOTE]
> If you cannot access the application, verify your security group allows inbound traffic on port 3000 from your IP address (0.0.0.0/0 for public access).

## Screenshots/Visual Reference

This section provides a complete visual reference for the deployment process:

### Project Home
![Project Home](docs/guide_home.png)

### AWS Configuration
![AWS Access Keys Created](docs/access_keys_created.png)

### Container Registry (ECR)
![ECR Repository List](docs/repo_list.png)
![ECR Push Commands](docs/push_commands.png)
![CLI Push Success](docs/cli_push_success.png)
![ECR Repository with Image](docs/ecr_repo_with_image.png)

### ECS Cluster Setup
![ECS Cluster Creation Form](docs/ecs_cluster_creation_form.png)
![ECS Cluster Created](docs/ecs_cluster_created.png)

### Task Definition
![New Task Definition Form 1](docs/new_task_definition_form_1.png)
![New Task Definition Form 2](docs/new_task_definition_form_2.png)
![ECR Image Selection](docs/ecr_image_selection_on_new_task_def.png)
![Task Definition Creation Success](docs/task_definition_creation_success.png)

### Service Deployment
![Create Service Form 1](docs/create_service_form_1.png)
![Create Service Form 2](docs/create_service_form_2_env.png)
![Create Service Form 3](docs/create_service_form_3_deployment.png)
![Create Service Form 4 Networking](docs/create_service_form_4_networking.png)
![Service Creation Success](docs/service_creation_success.png)

### Application Access
![Access Application](docs/access_application.png)
![Deployed Application](docs/deployed_application.png)

### CI/CD Pipeline
![GitHub Secrets](docs/github_secrets.png)
![GitHub Workflow](docs/github_workflow.png)

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Himan Manduja

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Educational Use:** This project is designed for educational purposes. Feel free to fork, modify, and use it for your own learning and projects.

## Author

**Himan Manduja**

- GitHub: [@HimanM](https://github.com/HimanM)
- Project Website: [devops4.himanmanduja.fun](https://devops4.himanmanduja.fun)
- Portfolio: [himanmanduja.fun](https://himanmanduja.fun)

**About the Author:** DevOps enthusiast and cloud infrastructure specialist focused on building practical, educational projects that demonstrate real-world deployment scenarios.

---

**Questions or Issues?** Feel free to open an issue in this repository or reach out via GitHub.

**Want to Contribute?** Contributions are welcome! Fork the repository and submit a pull request with your improvements.
