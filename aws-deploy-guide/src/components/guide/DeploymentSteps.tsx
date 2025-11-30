"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Key,
  Lock,
  Globe,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { FaAws, FaGithub, FaDocker } from "react-icons/fa";
import { SiAmazon } from "react-icons/si";
import { ImageModal } from "@/components/ui/ImageModal";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: "aws-setup",
    title: "AWS Configuration",
    icon: FaAws,
    color: "text-[#FF9900]",
    description: "Prepare your AWS environment",
    items: [
      {
        title: "1. Create AWS Access Keys",
        content: (
          <div className="space-y-6">
            <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
              <p className="text-gray-300">Generate credentials to allow the CLI to interact with your AWS account.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">1</span>
                  <p>Go to AWS Console &gt; Security Credentials.</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">2</span>
                  <p>Create new Access Key.</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">3</span>
                  <p><span className="text-red-400 font-bold">Save the Secret Key!</span> You won&apos;t see it again.</p>
                </div>
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10">
                <img src="/access_keys_created.png" alt="AWS Access Keys" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">Enlarge Image</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "2. Configure AWS CLI",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Authenticate your local terminal with AWS.</p>
            <div className="bg-[#0D1117] p-6 rounded-xl border border-gray-800 font-mono text-sm shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <Terminal className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-green-400 mb-2">$ aws configure</p>
              <div className="space-y-1 text-gray-500">
                <p>AWS Access Key ID [None]: <span className="text-blue-400">AKIA...</span></p>
                <p>AWS Secret Access Key [None]: <span className="text-blue-400">wJalr...</span></p>
                <p>Default region name [None]: <span className="text-yellow-400">us-west-2</span></p>
                <p>Default output format [None]: <span className="text-yellow-400">json</span></p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "3. Create ECR Repository",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Create a secure place to store your Docker images.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="bg-[#0D1117] p-4 rounded-xl border border-gray-800 font-mono text-xs text-blue-300 leading-relaxed">
                  aws ecr create-repository \<br />
                  &nbsp;&nbsp;--repository-name aws-deploy-guide
                </div>
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10">
                <img src="/repo_list.png" alt="ECR Repo" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">Enlarge Image</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "docker-push",
    title: "Build & Push",
    icon: FaDocker,
    color: "text-[#2496ED]",
    description: "Containerize & Upload",
    items: [
      {
        title: "4. Build & Push Image",
        content: (
          <div className="space-y-8">
            <div className="bg-[#0D1117] p-6 rounded-xl border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)] font-mono text-sm space-y-4">
              <div>
                <p className="text-gray-500 mb-1"># 1. Login to ECR</p>
                <p className="text-purple-300">aws ecr get-login-password ... | docker login ...</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1"># 2. Build Image</p>
                <p className="text-purple-300">docker build -t aws-deploy-guide .</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1"># 3. Tag & Push</p>
                <p className="text-purple-300">docker push ...amazonaws.com/aws-deploy-guide:latest</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 aspect-video">
                <img src="/push_commands.png" alt="Push Commands" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View Commands</span>
                </div>
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 aspect-video">
                <img src="/ecr_repo_with_image.png" alt="ECR Image" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View Repo</span>
                </div>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "ecs-deploy",
    title: "ECS Deployment",
    icon: SiAmazon,
    color: "text-[#FF9900]",
    description: "Launch on Fargate",
    items: [
      {
        title: "5. Create Cluster",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Create a Fargate cluster to host your services.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-orange-500/20">
                <img src="/ecs_cluster_creation_form.png" alt="Cluster Form" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">Cluster Form</span>
                </div>
              </div>
              <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-orange-500/20">
                <img src="/ecs_cluster_created.png" alt="Cluster Created" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">Cluster Created</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "6. Create Task Definition",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Define your container specs (CPU, Memory, Image).</p>
            <div className="grid md:grid-cols-3 gap-4">
              {['new_task_definition_form_1.png', 'new_task_definition_form_2.png', 'task_definition_creation_success.png'].map((img, i) => (
                <div key={i} className="relative group cursor-pointer overflow-hidden rounded-xl border border-orange-500/20 aspect-[4/3]">
                  <img src={`/${img}`} alt="Task Def" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">View Step {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        title: "7. Create Service",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Run your task definition as a service.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {['create_service_form_1.png', 'create_service_form_4_networking.png', 'service_creation_success.png'].map((img, i) => (
                <div key={i} className="relative group cursor-pointer overflow-hidden rounded-xl border border-orange-500/20 aspect-[4/3]">
                  <img src={`/${img}`} alt="Service" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold border border-white/30 px-3 py-1 rounded-full backdrop-blur-md">View Step {i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
      {
        title: "8. Access Application",
        content: (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-green-400 font-semibold">Live Application</p>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                  <img src="/access_application.png" alt="App Live" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View Live</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-green-400 font-semibold">Deployment Success</p>
                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                  <img src="/deployed_application.png" alt="Deployed App" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View Dashboard</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex gap-4 items-start">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-sm text-yellow-200/80 space-y-2">
                <p className="font-bold text-yellow-100 text-base">Important Note on CI/CD & Static IPs</p>
                <p>
                  When using automated deployments (CI/CD), ECS Fargate creates a <strong>new task</strong> with a <strong>new Public IP</strong> for every deployment.
                  The old IP will stop working.
                </p>
                <p>
                  To maintain a consistent entry point (like <code>myapp.com</code>), it is highly recommended to use an <strong>Application Load Balancer (ALB)</strong>.
                  An ALB provides a static DNS name that automatically routes traffic to your dynamic container IPs.
                </p>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "github-cicd",
    title: "GitHub Actions CI/CD",
    icon: FaGithub,
    color: "text-white",
    description: "Automate Pipeline",
    items: [
      {
        title: "9. Configure Secrets",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Add your AWS credentials to GitHub Repository Secrets.</p>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4 text-sm text-gray-400 bg-white/5 p-6 rounded-xl border border-white/10 w-full">
                <div className="flex items-center gap-3"><Key className="w-5 h-5 text-yellow-400" /> AWS_ACCESS_KEY_ID</div>
                <div className="flex items-center gap-3"><Lock className="w-5 h-5 text-yellow-400" /> AWS_SECRET_ACCESS_KEY</div>
                <div className="flex items-center gap-3"><Globe className="w-5 h-5 text-blue-400" /> AWS_REGION</div>
              </div>
              <div className="flex-1 relative group cursor-pointer w-full overflow-hidden rounded-xl border border-white/10">
                <img src="/github_secrets.png" alt="GitHub Secrets" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View Secrets</span>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "10. Workflow Visualization",
        content: (
          <div className="space-y-6">
            <p className="text-gray-300">Visualize your Build and Deploy stages in GitHub Actions.</p>
            <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <img src="/github_workflow.png" alt="GitHub Workflow" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="text-white font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">View Workflow</span>
              </div>
            </div>
          </div>
        )
      }
    ]
  }
];

export default function DeploymentSteps() {
  const [activeTab, setActiveTab] = useState("aws-setup");
  const [modalImage, setModalImage] = useState<{ src: string, alt: string } | null>(null);

  const activeSection = steps.find(s => s.id === activeTab);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar Navigation */}
        <div className="lg:w-1/3 space-y-4">
          <div className="sticky top-8 space-y-4">
            {steps.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left group relative overflow-hidden",
                  activeTab === section.id
                    ? "bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/10"
                )}
              >
                <div className={cn(
                  "p-3 rounded-lg transition-colors",
                  activeTab === section.id ? "bg-white/10" : "bg-black/40"
                )}>
                  <section.icon className={cn("w-6 h-6", section.color)} />
                </div>
                <div>
                  <h3 className={cn(
                    "font-bold transition-colors",
                    activeTab === section.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"
                  )}>
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-500">{section.description}</p>
                </div>
                {activeTab === section.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute right-4 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm min-h-[600px]"
            >
              <div className="mb-8 pb-8 border-b border-white/10">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  {activeSection?.icon && <activeSection.icon className={cn("w-8 h-8", activeSection.color)} />}
                  {activeSection?.title}
                </h2>
                <p className="text-gray-400 mt-2 text-lg">{activeSection?.description}</p>
              </div>

              <div className="space-y-12">
                {activeSection?.items.map((item, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      {item.title}
                    </h3>
                    <div
                      className="pl-0 md:pl-7 text-gray-300"
                      onClick={(e) => {
                        const group = (e.target as HTMLElement).closest('.group');
                        if (group) {
                          const img = group.querySelector('img');
                          if (img) {
                            setModalImage({ src: img.src, alt: img.alt });
                          }
                        }
                      }}
                    >
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <ImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        imageSrc={modalImage?.src || ""}
        altText={modalImage?.alt || ""}
      />
    </div>
  );
}
