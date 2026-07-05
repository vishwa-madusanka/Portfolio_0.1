import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section"
import CertificationsSection from "@/components/sections/certifications-section"
import ContactSection from "@/components/sections/contact-section"
import Navigation from "@/components/navigation"
import LiveGitHubWidget from "@/components/widgets/live-github-widget"

export default function Home() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--blueprint-navy)", color: "var(--blueprint-white)" }}
    >
      <Navigation />
      <HeroSection />
      {/*
        LiveGitHubWidget is an async Server Component. Pass it as a slot prop
        so it can be rendered inside AboutSection (a Client Component) without
        violating the Server/Client boundary.
      */}
      <AboutSection githubWidget={<LiveGitHubWidget />} />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  )
}
