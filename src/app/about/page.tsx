import {
  AboutHero,
  ExpertiseSection,
  MissionSection,
  CommitmentSection,
  TeamSection,
  GallerySection,
} from "@/components/AboutPage";
import toursData from "@/data/tours.json";

export const metadata = {
  title: "About Us | Travel Agency",
  description:
    "Learn about our travel agency, our mission, vision, and the passionate team behind your unforgettable adventures.",
};

export default function AboutPage() {
  const { aboutUs } = toursData;

  return (
    <main>
      <AboutHero hero={aboutUs.hero} stats={aboutUs.stats} />
      <ExpertiseSection expertise={aboutUs.expertise} />
      <MissionSection mission={aboutUs.mission} vision={aboutUs.vision} />
      <CommitmentSection commitment={aboutUs.commitment} />
      <TeamSection team={aboutUs.team} />
      <GallerySection gallery={aboutUs.gallery} />
    </main>
  );
}
