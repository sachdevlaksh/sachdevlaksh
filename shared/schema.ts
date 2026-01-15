import { z } from "zod";

export interface Profile {
  id: number;
  name: string;
  title: string;
  location: string;
  summary: string;
  email: string;
  phone?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  bio?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  location?: string;
  description: string;
}

export interface Education {
  id: number;
  degree: string;
  school: string;
  year: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  category: string;
  year?: string | null;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
}

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
