import { site, expertise } from "@/data/site";

/**
 * Structured data (Schema.org) so Google understands who Mehedi is and what he
 * does — helps with the knowledge panel, rich results and entity ranking.
 */
export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: `${site.url}${site.profileImage}`,
    jobTitle: site.role,
    description: site.description,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Bangladesh",
    },
    sameAs: [site.social.github, site.social.linkedin],
    knowsAbout: expertise,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "en",
    description: site.description,
    publisher: { "@type": "Person", name: site.name },
  };

  const professional = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name} — ${site.role}`,
    url: site.url,
    image: `${site.url}${site.profileImage}`,
    description:
      "Full stack web development services: React, Next.js, Node.js, PHP, WordPress, REST APIs, databases, SEO and performance optimization.",
    areaServed: "Worldwide",
    provider: { "@type": "Person", name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professional) }}
      />
    </>
  );
}
