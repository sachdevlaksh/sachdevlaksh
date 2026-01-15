import {
  type Profile,
  type Experience,
  type Education,
  type Skill,
  type InsertContactMessage,
  type Certification,
} from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  getExperiences(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getSkills(): Promise<Skill[]>;
  getCertifications(): Promise<Certification[]>;
  createContactMessage(message: InsertContactMessage): Promise<void>;
  seedData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private profile: Profile;
  private experiences: Experience[];
  private education: Education[];
  private skills: Skill[];
  private certifications: Certification[];
  private contactMessages: any[];

  constructor() {
    this.profile = {
      id: 1,
      name: "Lakshay Sachdeva",
      title: "Applications Tech Lead - Ecommerce",
      location: "Gurugram, Haryana, India",
      summary: "Application Tech Lead with a decade of experience designing and delivering scalable, event-driven, and production-grade systems using GoLang, Java, Spring Boot, Kafka, and Azure. I specialize in distributed systems, microservices architecture, multithreading, and high-performance backend engineering. Core strengths include designing modular microservices, building event-driven pipelines, and optimizing system reliability.",
      email: "sachdevlaksh@gmail.com",
      imageUrl: "/attached_assets/Gemini_Generated_Image_axpl60axpl60axpl_1766667885239.png",
      githubUrl: "https://github.com/sachdevlaksh",
      linkedinUrl: "https://linkedin.com/in/sachdevlaksh",
      resumeUrl: "https://sachdevlaksh.com/resume"
    };

    this.experiences = [
      {
        id: 1,
        title: "Applications Tech Lead",
        company: "Victoria's Secret & Co.",
        duration: "April 2025 - Present",
        location: "Gurugram, Haryana, India",
        description: "Architected and delivered high-performance microservices powering product listing and description pages. Leveraged GoLang, Kafka, and MongoDB. Reduced API latency by 30% and page load time by 35%. Accelerated deployments by 60% using Kubernetes, Harness, and Jenkins. Enhanced monitoring with Grafana/Prometheus."
      },
      {
        id: 2,
        title: "Senior Software Engineer",
        company: "Victoria's Secret & Co.",
        duration: "March 2023 - April 2025",
        location: "Gurugram, Haryana, India",
        description: "Developed large-scale applications and re-architected mission-critical microservices to enhance reliability and performance."
      },
      {
        id: 3,
        title: "Specialist Programmer",
        company: "Infosys",
        duration: "September 2019 - February 2023",
        location: "Bengaluru, Karnataka",
        description: "Led design of Java Spring MVC/Boot microservices for financial accounting. Drove migration of legacy PL/SQL systems to modern Java microservices. Implemented end-to-end demand and refund workflows. Containerized applications using Docker and deployed on Kubernetes (IBM Cloud)."
      },
      {
        id: 4,
        title: "Associate",
        company: "Cognizant",
        duration: "April 2019 - September 2019",
        location: "Bengaluru, Karnataka",
        description: "Worked for Metlife Insurance. Designed Spring Boot microservices for policy management. Implemented MongoDB data models. Integrated Spring Security (JWT/LDAP). Built event-driven integrations using Kafka."
      },
      {
        id: 5,
        title: "Programmer Analyst",
        company: "Cognizant",
        duration: "April 2016 - April 2019",
        location: "Bengaluru, Karnataka",
        description: "Designed and implemented enterprise service bus (ESB) solutions using MuleSoft and Talend for seamless system-to-system integrations. Architected point-to-point and publish-subscribe integration patterns connecting legacy systems with modern APIs. Managed API gateway implementation, authentication/authorization flows, and request/response transformations. Delivered batch integration jobs for data synchronization across multiple enterprise systems. Optimized integration pipelines for performance, reducing data processing time by 40%. Collaborated with cross-functional teams to design integration specifications and API contracts."
      }
    ];

    this.education = [
      {
        id: 1,
        degree: "Master of Technology, Electrical, Electronics and Communications Engineering",
        school: "Suresh Gyan Vihar University",
        year: "2013 - 2015"
      },
      {
        id: 2,
        degree: "Bachelor of Technology (B.Tech.), Electronics and Communications Engineering",
        school: "Gyan Vihar School of Engineering and Technology",
        year: "2010 - 2014"
      }
    ];

    this.skills = [
      { id: 1, name: "GoLang", category: "Languages" },
      { id: 2, name: "Java", category: "Languages" },
      { id: 3, name: "Javascript", category: "Languages" },
      { id: 4, name: "Spring Boot", category: "Frameworks" },
      { id: 5, name: "Node", category: "Frameworks" },
      { id: 6, name: "Kafka", category: "Infrastructure" },
      { id: 6, name: "Redis", category: "Infrastructure" },
      { id: 7, name: "MongoDB", category: "Database" },
      { id: 8, name: "PostgreSQL", category: "Database" },
      { id: 9, name: "Azure", category: "Cloud" },
      { id: 9, name: "Google", category: "Cloud" },
      { id: 10, name: "Kubernetes", category: "Infrastructure" },
      { id: 11, name: "Docker", category: "Infrastructure" },
      { id: 12, name: "Microservices", category: "Architecture" },
      { id: 13, name: "Distributed Systems", category: "Architecture" },
      { id: 14, name: "System Design", category: "Architecture" },
      { id: 15, name: "AI/ML", category: "Concepts" }
    ];

    this.certifications = [
      { id: 1, name: "Azure AI Engineer Associate (AI-102)", issuer: "Microsoft", category: "AI/ML", year: "2024" }
    ];

    this.contactMessages = [];
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async getExperiences(): Promise<Experience[]> {
    return this.experiences.sort((a, b) => {
      const getStartDate = (duration: string) => {
        const months: Record<string, number> = {
          January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
          July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
        };
        const match = duration.match(/^(\w+)\s+(\d{4})/);
        if (!match) return new Date(0);
        const month = months[match[1]] || 1;
        const year = parseInt(match[2], 10);
        return new Date(year, month - 1);
      };
      return getStartDate(b.duration).getTime() - getStartDate(a.duration).getTime();
    });
  }

  async getEducation(): Promise<Education[]> {
    return this.education;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getCertifications(): Promise<Certification[]> {
    return this.certifications;
  }

  async createContactMessage(message: InsertContactMessage): Promise<void> {
    const id = this.contactMessages.length + 1;
    this.contactMessages.push({ ...message, id });
  }

  async seedData(): Promise<void> {}
}

export const storage = new MemStorage();
