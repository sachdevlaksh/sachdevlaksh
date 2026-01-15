import { useProfile, useExperiences, useEducation, useSkills, useCertifications, useContactMutation } from "@/hooks/use-portfolio";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { ExperienceCard } from "@/components/ExperienceCard";
import { SkillBadge } from "@/components/SkillBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Send, Github, Linkedin, Mail, MapPin, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function Home() {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: experiences, isLoading: loadingExp } = useExperiences();
  const { data: education, isLoading: loadingEdu } = useEducation();
  const { data: skills, isLoading: loadingSkills } = useSkills();
  const { data: certs, isLoading: loadingCerts } = useCertifications();
  const contactMutation = useContactMutation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertContactMessageSchema>>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof insertContactMessageSchema>) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message sent",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    });
  };

  if (loadingProfile || loadingExp || loadingEdu || loadingSkills || loadingCerts) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!profile) return null;

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  return (
    <div className="min-h-screen bg-slate-50 text-foreground selection:bg-primary/20">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none brightness-100 contrast-150" />

          <div className="container mx-auto px-4 md:px-6 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 md:w-40 md:h-40 bg-zinc-800 rounded-full mx-auto mb-8 flex items-center justify-center border-2 border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden"
              >
                {profile.imageUrl ? (
                  <img 
                    src={profile.imageUrl} 
                    alt={profile.name} 
                    className="w-full h-full object-cover transition-all duration-500 scale-[1.01] hover:scale-100"
                    style={{ 
                      filter: 'contrast(1.02) brightness(1.02) saturate(1.02)',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      imageRendering: 'auto'
                    }}
                  />
                ) : (
                  <span className="text-3xl md:text-4xl font-bold font-mono text-primary">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              >
                Hi, I'm <span className="text-gradient">{profile.name}</span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-muted-foreground font-light mb-4"
              >
                {profile.title}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-2 text-zinc-500 mb-10 font-mono text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
              >
                <Button 
                  size="lg" 
                  className="rounded-full px-8 text-base font-medium bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Contact Me
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 text-base font-medium border-slate-200 hover:bg-slate-100 transition-all"
                  onClick={() => window.location.href = "/api/resume/download"}
                  data-testid="button-download-resume"
                >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 text-base font-medium border-slate-200 hover:bg-slate-100 transition-all"
                  onClick={() => window.print()}
                  data-testid="button-print-resume"
                >
                  <Loader2 className="mr-2 h-4 w-4 transform -rotate-90" /> Print to PDF
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex justify-center gap-6"
              >
                {profile.linkedinUrl && (
                  <a 
                    href={profile.linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-white transition-colors"
                    data-testid="link-linkedin"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {profile.githubUrl && (
                  <a 
                    href={profile.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-zinc-500 hover:text-white transition-colors"
                    data-testid="link-github"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                <a 
                  href={`mailto:${profile.email}`} 
                  className="text-zinc-500 hover:text-white transition-colors"
                  data-testid="link-email"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <button
                  onClick={() => {
                    const url = window.location.href;
                    const text = `Check out my portfolio: ${url}`;
                    if (navigator.share) {
                      navigator.share({ title: `${profile.name} - ${profile.title}`, text, url });
                    } else {
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
                    }
                  }}
                  className="text-zinc-500 hover:text-white transition-colors"
                  data-testid="button-share"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionHeading title="About Me" align="center" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl text-lg leading-relaxed text-slate-600"
            >
              <p>{profile.bio || profile.summary}</p>
            </motion.div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionHeading title="Experience" subtitle="My professional journey and key achievements." />
            <div className="space-y-12 md:space-y-8 relative">
              {/* Timeline Vertical Line for Mobile */}
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-zinc-800 md:hidden" />
              
              {experiences?.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <SectionHeading title="Technical Skills" subtitle="Technologies and tools I work with." align="center" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {Object.entries(skillsByCategory).map(([category, categorySkills], i) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 rounded-2xl border-slate-100 hover:border-primary/20 transition-all group shadow-sm hover:shadow-md"
                >
                  <h3 className="text-lg font-bold mb-4 text-primary font-mono uppercase tracking-wider text-sm group-hover:translate-x-1 transition-transform">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, j) => (
                      <SkillBadge key={skill.id} name={skill.name} index={j} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionHeading title="Education" />
            <div className="grid gap-6">
              {education?.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 glass-card rounded-xl border-l-4 border-l-primary"
                >
                  <div>
                    <h3 className="text-xl font-bold">{edu.school}</h3>
                    <p className="text-zinc-400 mt-1">{edu.degree}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 font-mono text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    {edu.year}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <SectionHeading title="Certifications" subtitle="Professional certifications and credentials." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certs?.map((cert: any, i: number) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-6 rounded-xl border-slate-100 hover:border-primary/30 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md"
                  data-testid={`card-certification-${cert.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{cert.name}</h3>
                      <p className="text-sm text-slate-500">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap ml-2">
                      {cert.category}
                    </span>
                  </div>
                  {cert.year && (
                    <p className="text-xs text-slate-400 font-mono">{cert.year}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <SectionHeading title="Get in Touch" subtitle="Have a project in mind or want to say hi?" align="center" />
            
            <div className="glass-card p-8 rounded-2xl mt-8 border-slate-100">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-slate-50 border-slate-200 focus:border-primary/50 text-slate-900 placeholder:text-slate-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-slate-50 border-slate-200 focus:border-primary/50 text-slate-900 placeholder:text-slate-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-600">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="min-h-[120px] bg-slate-50 border-slate-200 focus:border-primary/50 resize-none text-slate-900 placeholder:text-slate-400" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 shadow-xl shadow-primary/20 transition-all hover:scale-[1.01]"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
