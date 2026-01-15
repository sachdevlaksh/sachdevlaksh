import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Mail, Phone, MapPin, Linkedin, Instagram, Menu, X, Palette, Code, Users, Leaf, Award, GraduationCap, Briefcase, ChevronDown } from "lucide-react";

import heroImage from "@assets/generated_images/Hero_landscape_architecture_project_148c65ea.png";
import portraitImage from "@assets/generated_images/Professional_portrait_headshot_7ba11605.png";
import project1 from "@assets/generated_images/Residential_garden_project_4f9cb2e3.png";
import project2 from "@assets/generated_images/Commercial_plaza_project_905b7783.png";
import project3 from "@assets/generated_images/Rooftop_garden_project_912c4578.png";
import project4 from "@assets/generated_images/Park_playground_project_716c23f7.png";
import project5 from "@assets/generated_images/Office_campus_project_08b0c0ba.png";
import project6 from "@assets/generated_images/Coastal_promenade_project_8ddc0638.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setMobileMenuOpen(false);
    }
  };

  const skills = [
    {
      icon: Palette,
      title: "Design & Conceptualization",
      description: "Creating innovative spaces that blend aesthetics with functionality"
    },
    {
      icon: Code,
      title: "CAD & 3D Software",
      description: "Expert in AutoCAD, SketchUp, Rhino, and Adobe Creative Suite"
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Leading teams and coordinating with stakeholders for timely delivery"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Environmental design focused on passive energy and resource optimization"
    }
  ];

  const experience = [
    {
      role: "Landscape Architect",
      company: "Brick Design",
      period: "2023 - 2025",
      responsibilities: [
        "Manage a team of architects, designers and consultants",
        "Oversee project budgets and timelines, ensuring on-time and within-budget delivery",
        "Collaborate with clients, contractors and project teams to ensure alignment with project goals"
      ]
    },
    {
      role: "Lead Architect",
      company: "Avante Architect",
      period: "2021 - 2023",
      responsibilities: [
        "Develop conceptual designs and construction drawings for commercial and residential projects",
        "Conduct site visits to ensure compliance with construction plans and building codes",
        "Lead client meetings and presentations"
      ]
    },
    {
      role: "Senior Architect",
      company: "Godrej Properties",
      period: "2019 - 2021",
      responsibilities: [
        "Collaborate on conceptual designs and construction drawings",
        "Ensure compliance with construction plans, building codes and regulations",
        "Participate in client meetings and project coordination"
      ]
    }
  ];

  const projects = [
    { image: project1, title: "Modern Residential Garden", category: "Residential", aspect: "landscape" },
    { image: project2, title: "Urban Commercial Plaza", category: "Commercial", aspect: "portrait" },
    { image: project3, title: "Rooftop Green Space", category: "Urban Design", aspect: "landscape" },
    { image: project4, title: "Sustainable Park Design", category: "Public Space", aspect: "wide" },
    { image: project5, title: "Corporate Campus", category: "Commercial", aspect: "portrait" },
    { image: project6, title: "Coastal Promenade", category: "Environmental", aspect: "landscape" }
  ];

  const education = [
    {
      degree: "Masters of Landscape Architecture",
      institution: "Ganga College of Architecture and Town Planning",
      period: "2019 - 2021"
    },
    {
      degree: "Bachelor of Architecture",
      institution: "Ganga College of Architecture and Town Planning",
      period: "2013 - 2018"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-serif text-xl md:text-2xl font-bold text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md"
              data-testid="link-home"
            >
              Sonali Ahuja
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-base"
                  data-testid={`link-${item.toLowerCase()}`}
                >
                  {item}
                </Button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button & Theme Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu-toggle"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="w-full justify-start text-base"
                  data-testid={`link-mobile-${item.toLowerCase()}`}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Landscape Architecture Project"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6" data-testid="text-hero-name">
            Sonali Ahuja
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-4 font-light tracking-wide" data-testid="text-hero-title">
            Landscape Architect
          </p>
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-subtitle">
            7 years of experience creating sustainable spaces that combine functionality, aesthetics, and environmental consciousness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="px-8 py-6 text-base md:text-lg font-semibold rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white"
              data-testid="button-view-projects"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="px-8 py-6 text-base md:text-lg font-semibold rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white"
              data-testid="button-contact"
            >
              Contact Me
            </Button>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
            aria-label="Scroll to about section"
            data-testid="button-scroll-down"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden">
                <img
                  src={portraitImage}
                  alt="Sonali Ahuja"
                  className="w-full h-full object-cover"
                  data-testid="img-portrait"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground" data-testid="text-about-heading">
                About Me
              </h2>
              <div className="space-y-4 text-base md:text-lg leading-relaxed text-foreground/90">
                <p data-testid="text-about-intro">
                  As a creative and detail-oriented architect with 7 years of experience, I have a passion for designing
                  spaces that combine functionality, sustainability and aesthetics.
                </p>
                <p data-testid="text-about-philosophy">
                  I excel in collaborating with clients, engineers and contractors to deliver projects that meet the vision
                  and exceed expectations. With a strong background in sustainability, I am dedicated to finding innovative
                  solutions that optimize space, passive energy and resources while enhancing the living experience.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold text-xl md:text-2xl mb-4 text-foreground" data-testid="text-core-values">
                  Core Values
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Sustainability", "Innovation", "Collaboration", "Excellence"].map((value) => (
                    <Badge key={value} variant="secondary" className="text-sm px-4 py-2" data-testid={`badge-value-${value.toLowerCase()}`}>
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-foreground" data-testid="text-skills-heading">
            Skills & Expertise
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-skill-${index}`}>
                <CardContent className="p-6 md:p-8 space-y-4 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-lg bg-primary/10">
                    <skill.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg md:text-xl text-foreground">
                    {skill.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-foreground" data-testid="text-experience-heading">
            Professional Experience
          </h2>
          <div className="space-y-8 md:space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 md:pl-12" data-testid={`card-experience-${index}`}>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-4 border-background" />

                <Card className="hover-elevate transition-all duration-300">
                  <CardContent className="p-6 md:p-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-xl md:text-2xl text-foreground">
                          {job.role}
                        </h3>
                        <p className="text-base md:text-lg text-primary font-medium">
                          {job.company}
                        </p>
                      </div>
                      <Badge variant="outline" className="self-start">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {job.period}
                      </Badge>
                    </div>
                    <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1.5">•</span>
                          <span className="flex-1">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-center mb-4 text-foreground" data-testid="text-projects-heading">
            Featured Projects
          </h2>
          <p className="text-center text-muted-foreground text-base md:text-lg mb-12 md:mb-16 max-w-2xl mx-auto">
            A selection of landscape architecture projects showcasing sustainable design and creative vision
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover-elevate transition-all duration-300"
                data-testid={`card-project-${index}`}
              >
                <div className={`relative overflow-hidden ${
                  project.aspect === "wide" ? "aspect-video" :
                  project.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm border-white/20 text-white">
                      {project.category}
                    </Badge>
                    <h3 className="font-semibold text-lg md:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-foreground" data-testid="text-education-heading">
            Education
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-education-${index}`}>
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 mb-2">
                    <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg md:text-xl text-foreground">
                    {edu.degree}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {edu.institution}
                  </p>
                  <Badge variant="outline">
                    <Award className="w-3 h-3 mr-1" />
                    {edu.period}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6 text-foreground" data-testid="text-contact-heading">
            Let's Work Together
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            I'm always interested in discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-6 md:p-8 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-2">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Email</h3>
                <a
                  href="mailto:sonaliahujaquattro@gmail.com"
                  className="text-sm md:text-base text-primary hover:underline block"
                  data-testid="link-email"
                >
                  sonaliahujaquattro@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-300">
              <CardContent className="p-6 md:p-8 space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-2">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Phone</h3>
                <a
                  href="tel:+919034613069"
                  className="text-sm md:text-base text-primary hover:underline block"
                  data-testid="link-phone"
                >
                  +91 9034613069
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full w-12 h-12"
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full w-12 h-12"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                data-testid="link-instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm md:text-base text-muted-foreground" data-testid="text-footer">
            © 2025 Sonali Ahuja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
