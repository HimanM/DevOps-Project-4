"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, Container, Database, Server } from "lucide-react";

export default function WorkflowAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
      <Step icon={Database} label="Code" delay={0} />
      <Arrow delay={0.5} />
      <Step icon={Container} label="Docker Build" delay={1} />
      <Arrow delay={1.5} />
      <Step icon={Cloud} label="ECR Push" delay={2} />
      <Arrow delay={2.5} />
      <Step icon={Server} label="ECS Deploy" delay={3} />
    </div>
  );
}

function Step({ icon: Icon, label, delay }: { icon: any; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="flex flex-col items-center p-4 bg-card border rounded-lg shadow-sm w-32 h-32 justify-center"
    >
      <Icon className="w-10 h-10 text-primary mb-2" />
      <span className="text-sm font-medium text-center">{label}</span>
    </motion.div>
  );
}

function Arrow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="hidden md:block"
    >
      <ArrowRight className="w-6 h-6 text-muted-foreground" />
    </motion.div>
  );
}
