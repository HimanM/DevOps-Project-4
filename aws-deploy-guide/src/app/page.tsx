import DeploymentSteps from "@/components/guide/DeploymentSteps";
import ProjectLinks from "@/components/guide/ProjectLinks";
import WorkflowAnimation from "@/components/guide/WorkflowAnimation";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-24 space-y-12 md:space-y-16">

        {/* Hero Section */}
        <header className="text-center space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight px-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                AWS Deployment Guide
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light px-4">
              Master the art of deploying containerized applications with <span className="text-white font-medium">ECS Fargate</span> and <span className="text-white font-medium">GitHub Actions</span>.
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href="https://github.com/HimanM/DevOps-Project-4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 group backdrop-blur-sm"
            >
              <FaGithub className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">View Repository</span>
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </header>

        {/* Workflow Visualization */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 backdrop-blur-sm">
          <div className="text-center mb-4 md:mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-white">Deployment Pipeline</h2>
            <p className="text-gray-400 text-xs md:text-sm">Automated CI/CD Workflow</p>
          </div>
          <WorkflowAnimation />
        </div>

        {/* Main Content - Deployment Guide */}
        <div className="w-full">
          <DeploymentSteps />
        </div>

        {/* Footer Section - DevOps Projects */}
        <div className="border-t border-white/10 pt-12 md:pt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">More DevOps Projects</h2>
            <p className="text-gray-400">Explore other hands-on guides and implementations</p>
          </div>
          <ProjectLinks />
        </div>
      </div>
    </main>
  );
}
