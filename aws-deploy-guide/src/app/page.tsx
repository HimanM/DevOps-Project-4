import DeploymentSteps from "@/components/guide/DeploymentSteps";
import ProjectLinks from "@/components/guide/ProjectLinks";
import WorkflowAnimation from "@/components/guide/WorkflowAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaGithub } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-24 space-y-16">

        {/* Hero Section */}
        <header className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                AWS Deployment Guide
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
              Master the art of deploying containerized applications with <span className="text-white font-medium">ECS Fargate</span> and <span className="text-white font-medium">GitHub Actions</span>.
            </p>
          </div>

          <div className="flex justify-center">
            <a
              href="https://github.com/HimanM/DevOps-Project-4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 group backdrop-blur-sm"
            >
              <FaGithub className="w-6 h-6" />
              <span className="font-medium">View Repository</span>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </header>

        {/* Workflow Visualization */}
        <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-2 md:p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Deployment Pipeline</h2>
            <p className="text-gray-400 text-sm">Automated CI/CD Workflow</p>
          </div>
          <WorkflowAnimation />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="guide" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/5 border border-white/10 p-1 rounded-full">
              <TabsTrigger
                value="guide"
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
              >
                Deployment Guide
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all duration-300"
              >
                DevOps Projects
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="guide" className="space-y-8 focus-visible:outline-none">
            <DeploymentSteps />
          </TabsContent>

          <TabsContent value="projects" className="focus-visible:outline-none">
            <ProjectLinks />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
