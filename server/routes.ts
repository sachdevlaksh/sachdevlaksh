import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed the database on startup
  await storage.seedData();

  // === API ROUTES ===
  app.use("/attached_assets", express.static(path.resolve(process.cwd(), "attached_assets")));

  app.get("/api/profile", async (_req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.get("/api/experiences", async (_req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get("/api/education", async (_req, res) => {
    const edu = await storage.getEducation();
    res.json(edu);
  });

  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get("/api/certifications", async (_req, res) => {
    const certifications = await storage.getCertifications();
    res.json(certifications);
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const input = insertContactMessageSchema.parse(req.body);
      await storage.createContactMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input",
          field: err.errors[0].path.join("."),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", async (_req, res) => {
    const profile = await storage.getProfile();
    const experiences = await storage.getExperiences();
    const education = await storage.getEducation();
    const skills = await storage.getSkills();

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const skillsByCategory: Record<string, any[]> = {};
    skills?.forEach((skill) => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${profile.name} - Resume</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 8.5in; height: 11in; margin: 0 auto; padding: 0.5in; background: white; }
    h1 { font-size: 28px; margin-bottom: 5px; }
    h2 { font-size: 14px; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #0070f3; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
    h3 { font-size: 13px; font-weight: bold; margin-top: 10px; }
    p { font-size: 11px; margin-bottom: 5px; }
    .header { text-align: center; margin-bottom: 15px; }
    .title { font-size: 14px; color: #666; }
    .contact { font-size: 10px; color: #666; }
    .section { margin-bottom: 15px; }
    .job { margin-bottom: 12px; }
    .job-title { font-weight: bold; font-size: 12px; }
    .job-company { color: #0070f3; font-size: 11px; font-weight: bold; }
    .job-duration { font-size: 10px; color: #666; float: right; }
    .job-description { font-size: 10px; margin-top: 5px; line-height: 1.5; }
    .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 10px; }
    .skill-category { margin-bottom: 10px; }
    .skill-category-title { font-weight: bold; margin-bottom: 5px; color: #0070f3; }
    .skill-list { display: flex; flex-wrap: wrap; gap: 5px; }
    .skill-badge { background: #f0f0f0; padding: 3px 8px; border-radius: 3px; font-size: 9px; }
    .edu-item { margin-bottom: 10px; }
    @media print { body { margin: 0; padding: 0; } .container { max-width: 100%; height: auto; padding: 0.5in; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${profile.name}</h1>
      <p class="title">${profile.title}</p>
      <p class="contact">${profile.location} | ${profile.email}${profile.linkedinUrl ? " | " + profile.linkedinUrl : ""}</p>
    </div>
    <div class="section">
      <h2>Professional Summary</h2>
      <p>${profile.summary || profile.bio}</p>
    </div>
    <div class="section">
      <h2>Experience</h2>
      ${experiences?.map((exp) => `
        <div class="job">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <div class="job-title">${exp.title}</div>
              <div class="job-company">${exp.company}</div>
            </div>
            <div class="job-duration">${exp.duration}</div>
          </div>
          <div class="job-description">${exp.description}</div>
        </div>
      `).join("")}
    </div>
    <div class="section">
      <h2>Technical Skills</h2>
      <div class="skills-grid">
        ${Object.entries(skillsByCategory).map(([category, categorySkills]) => `
          <div class="skill-category">
            <div class="skill-category-title">${category}</div>
            <div class="skill-list">
              ${categorySkills.map((skill) => `<span class="skill-badge">${skill.name}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
    <div class="section">
      <h2>Education</h2>
      ${education?.map((edu) => `
        <div class="edu-item">
          <div style="font-weight: bold; font-size: 11px;">${edu.school}</div>
          <div style="font-size: 10px; color: #666;">${edu.degree}</div>
          <div style="font-size: 10px; color: #999;">${edu.year}</div>
        </div>
      `).join("")}
    </div>
  </div>
</body>
</html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", "attachment; filename=\"Lakshay_Sachdeva_Resume.html\"");
    res.send(html);
  });

  const httpServer = createServer(app);
  return httpServer;
}
