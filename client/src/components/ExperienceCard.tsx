import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import type { Experience } from "@shared/schema";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  // Parse bullet points from description if it contains newlines or specific markers
  const bullets = experience.description
    .split(/\n|•/)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0"
    >
      <div className="md:flex gap-6 items-start group">
        {/* Timeline Line (Desktop) */}
        <div className="hidden md:flex flex-col items-center mt-1">
          <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all" />
          <div className="w-0.5 h-full bg-zinc-800 my-2 group-last:hidden" />
        </div>

        {/* Content */}
        <div className="glass-card p-6 rounded-2xl flex-1 hover:bg-zinc-900/80 transition-colors duration-300 border border-zinc-800">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {experience.title}
              </h3>
              <div className="text-lg font-medium text-muted-foreground">
                {experience.company}
              </div>
            </div>
            <div className="flex flex-col md:items-end mt-2 md:mt-0 gap-1 text-sm text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{experience.duration}</span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>
          
          <ul className="space-y-2 mt-4">
            {bullets.map((point, i) => (
              <li key={i} className="flex gap-3 text-zinc-300 text-sm leading-relaxed">
                <span className="text-primary mt-1.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
