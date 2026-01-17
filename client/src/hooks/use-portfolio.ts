import { useQuery, useMutation } from "@tanstack/react-query";

// Fallback data for GitHub Pages (static) deployment
const fallbackProfile = {
  name: "Lakshay Sachdeva",
  title: "Applications Tech Lead - Ecommerce",
  bio: "Specialized in distributed systems, microservices architecture, and high-performance backend engineering.",
  email: "sachdevlaksh@gmail.com",
  phone: "+91 8076859959",
  location: "India",
  profileImage: "/favicon.png",
};

const fallbackExperiences = [
  {
    id: "1",
    title: "Applications Tech Lead",
    company: "Ecommerce",
    duration: "Present",
    description: "Leading backend engineering and distributed systems architecture",
    technologies: ["GoLang", "Java", "Microservices", "System Design"]
  }
];

const fallbackEducation = [
  {
    id: "1",
    school: "Your University",
    degree: "Your Degree",
    field: "Computer Science",
    year: "2024"
  }
];

const fallbackSkills = [
  { name: "Backend Engineering", category: "expertise" },
  { name: "Distributed Systems", category: "expertise" },
  { name: "GoLang", category: "language" },
  { name: "Java", category: "language" },
  { name: "Microservices", category: "specialty" }
];

const fallbackCertifications = [];

// === Profile Hook ===
export function useProfile() {
  return useQuery({
    queryKey: ["/api/profile"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.status === 404) return fallbackProfile;
        if (!res.ok) return fallbackProfile;
        return await res.json();
      } catch {
        return fallbackProfile;
      }
    },
  });
}

// === Experiences Hook ===
export function useExperiences() {
  return useQuery({
    queryKey: ["/api/experiences"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/experiences");
        if (!res.ok) return fallbackExperiences;
        return await res.json();
      } catch {
        return fallbackExperiences;
      }
    },
  });
}

// === Education Hook ===
export function useEducation() {
  return useQuery({
    queryKey: ["/api/education"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/education");
        if (!res.ok) return fallbackEducation;
        return await res.json();
      } catch {
        return fallbackEducation;
      }
    },
  });
}

// === Skills Hook ===
export function useSkills() {
  return useQuery({
    queryKey: ["/api/skills"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/skills");
        if (!res.ok) return fallbackSkills;
        return await res.json();
      } catch {
        return fallbackSkills;
      }
    },
  });
}

// === Certifications Hook ===
export function useCertifications() {
  return useQuery({
    queryKey: ["/api/certifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/certifications");
        if (!res.ok) return fallbackCertifications;
        return await res.json();
      } catch {
        return fallbackCertifications;
      }
    },
  });
}

// === Contact Mutation ===
export function useContactMutation() {
  return useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!res.ok) {
          throw new Error("Failed to submit message");
        }
        return await res.json();
      } catch {
        // On GitHub Pages, silently fail contact form
        return { success: false };
      }
    },
  });
}
