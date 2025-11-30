import DeploymentSteps from "@/components/guide/DeploymentSteps";
import ProjectLinks from "@/components/guide/ProjectLinks";
import WorkflowAnimation from "@/components/guide/WorkflowAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8 md:p-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Guide to Deploy a Container in AWS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A step-by-step interactive guide to deploying your containerized applications using AWS ECS Fargate.
          </p>
        </header>

        <WorkflowAnimation />

        <Tabs defaultValue="guide" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="guide">Deployment Guide</TabsTrigger>
              <TabsTrigger value="projects">DevOps Projects</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="guide" className="space-y-8">
            <DeploymentSteps />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectLinks />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
