import { useQuery, useMutation } from "@tanstack/react-query";

// === Profile Hook ===
export function useProfile() {
  return useQuery({
    queryKey: ["/api/profile"],
    queryFn: async () => {
      const res = await fetch("/api/profile");
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return await res.json();
    },
  });
}

// === Experiences Hook ===
export function useExperiences() {
  return useQuery({
    queryKey: ["/api/experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experiences");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return await res.json();
    },
  });
}

// === Education Hook ===
export function useEducation() {
  return useQuery({
    queryKey: ["/api/education"],
    queryFn: async () => {
      const res = await fetch("/api/education");
      if (!res.ok) throw new Error("Failed to fetch education");
      return await res.json();
    },
  });
}

// === Skills Hook ===
export function useSkills() {
  return useQuery({
    queryKey: ["/api/skills"],
    queryFn: async () => {
      const res = await fetch("/api/skills");
      if (!res.ok) throw new Error("Failed to fetch skills");
      return await res.json();
    },
  });
}

// === Certifications Hook ===
export function useCertifications() {
  return useQuery({
    queryKey: ["/api/certifications"],
    queryFn: async () => {
      const res = await fetch("/api/certifications");
      if (!res.ok) throw new Error("Failed to fetch certifications");
      return await res.json();
    },
  });
}

// === Contact Mutation ===
export function useContactMutation() {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Failed to submit message");
      }
      return await res.json();
    },
  });
}
