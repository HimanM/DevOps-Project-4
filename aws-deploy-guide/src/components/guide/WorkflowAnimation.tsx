"use client";

import { motion } from "framer-motion";
import { FaGithub, FaDocker, FaAws } from "react-icons/fa";
import { SiAmazon } from "react-icons/si";
import { ArrowRight } from "lucide-react";

export default function WorkflowAnimation() {
  return (
    <div className="w-full py-6 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Desktop View */}
        <div className="hidden md:flex relative flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4">

          {/* Connecting Line (Desktop) */}
          <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-y-1/2 hidden md:block z-0" />

          <Step
            icon={FaGithub}
            label="Source Code"
            subLabel="GitHub Push"
            color="text-white"
            bgColor="bg-[#0A0A0A]"
            delay={0}
          />

          <Arrow delay={0.5} />

          <Step
            icon={FaDocker}
            label="Build"
            subLabel="Docker Image"
            color="text-[#2496ED]"
            bgColor="bg-[#0A0A0A]"
            delay={1}
          />

          <Arrow delay={1.5} />

          <Step
            icon={FaAws}
            label="Registry"
            subLabel="Amazon ECR"
            color="text-[#FF9900]"
            bgColor="bg-[#0A0A0A]"
            delay={2}
          />

          <Arrow delay={2.5} />

          <Step
            icon={SiAmazon}
            label="Deploy"
            subLabel="ECS Fargate"
            color="text-[#FF9900]"
            bgColor="bg-[#0A0A0A]"
            delay={3}
          />

        </div>

        {/* Mobile View - Vertical List */}
        <div className="md:hidden space-y-4">
          {[
            { icon: FaGithub, label: "Source Code", sub: "GitHub Push", color: "text-white", bg: "bg-gray-900" },
            { icon: FaDocker, label: "Build", sub: "Docker Image", color: "text-[#2496ED]", bg: "bg-blue-900/20" },
            { icon: FaAws, label: "Registry", sub: "Amazon ECR", color: "text-[#FF9900]", bg: "bg-orange-900/20" },
            { icon: SiAmazon, label: "Deploy", sub: "ECS Fargate", color: "text-[#FF9900]", bg: "bg-orange-900/20" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className={`p-3 rounded-lg ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <h3 className="text-white font-bold">{item.label}</h3>
                <p className="text-gray-400 text-sm">{item.sub}</p>
              </div>
              {i < 3 && (
                <div className="ml-auto flex flex-col items-center gap-1 opacity-30">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function Step({ icon: Icon, label, subLabel, color, bgColor, delay }: any) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
      className="relative z-10 flex flex-col items-center group"
    >
      <div className={`w-20 h-20 rounded-2xl ${bgColor} border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-10 h-10 ${color} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`} />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-white font-bold text-lg">{label}</h3>
        <p className="text-gray-400 text-sm">{subLabel}</p>
      </div>
    </motion.div>
  );
}

function Arrow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="hidden md:flex items-center justify-center z-10 mt-5"
    >
      <div className="p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm">
        <ArrowRight className="w-5 h-5 text-blue-400 animate-pulse" />
      </div>
    </motion.div>
  );
}
