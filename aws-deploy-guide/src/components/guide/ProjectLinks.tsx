import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "DevOps Project 1",
    url: "https://devops1.himanmanduja.fun",
    description: "Production-grade demonstration of containerized microservices, Infrastructure as Code, and automated CI/CD pipelines.",
  },
  {
    name: "DevOps Project 2",
    url: "https://devops2.himanmanduja.fun",
    description: "A comprehensive demonstration of modern DevOps practices, featuring chained pipelines, infrastructure automation with Ansible, and containerized deployments.",
  },
  {
    name: "DevOps Project 3",
    url: "https://devops3.himanmanduja.fun",
    description: "A complete guide to deploying full-stack applications on Kubernetes using Jenkins CI and ArgoCD GitOps. Automated, secure, and scalable.",
  },
];

export default function ProjectLinks() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mt-10">
      {projects.map((project) => (
        <Card key={project.name} className="hover:shadow-lg transition-shadow border-primary/20">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                Visit Project <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      <Card className="col-span-full bg-primary/10 border-primary">
        <CardHeader>
          <CardTitle className="text-primary">DevOps Project 4 (Current)</CardTitle>
          <CardDescription>
            This comprehensive guide to AWS Container Deployment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You are currently viewing DevOps Project 4. This application demonstrates a modern, responsive guide built with Next.js, Tailwind CSS, and shadcn/ui, documenting the process of deploying containers to AWS.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
