import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  index: number;
}

export function SkillBadge({ name, index }: SkillBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="
        inline-flex items-center px-4 py-2 rounded-lg
        bg-zinc-900 border border-zinc-800
        text-sm font-medium text-zinc-300 font-mono
        hover:border-primary/50 hover:bg-primary/5 hover:text-primary
        cursor-default transition-all duration-200
      "
    >
      {name}
    </motion.span>
  );
}
