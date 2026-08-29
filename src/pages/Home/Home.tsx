import { HeroSection } from "./sections/HeroSection";
import { ProjectsPreviewSection } from "./sections/ProjectsPreviewSection";
import { MethodTeaserSection } from "./sections/MethodTeaserSection";
import { BlogPreviewSection } from "./sections/BlogPreviewSection";
import { ContactTeaserSection } from "./sections/ContactTeaserSection";

export function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectsPreviewSection />
      <MethodTeaserSection />
      <BlogPreviewSection />
      <ContactTeaserSection />
    </main>
  );
}
