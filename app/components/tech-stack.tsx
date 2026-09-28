import { Card } from "@/components/ui/card"

const technologies = [
  {
    category: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Next.js (App Router)", "Tailwind CSS", "HTML/CSS"],
  },
  {
    category: "Backend & Data",
    skills: ["Node.js", "Express", "Java", "Spring Boot", "Python", "Firestore", "Firebase Auth", "MySQL / JPA"],
  },
  {
    category: "Integrations",
    skills: ["Mercado Pago (Checkout Bricks, webhooks)", "Meta Graph API", "Resend", "Sentry", "Socket.io"],
  },
  {
    category: "AI & Tooling",
    skills: ["Claude Code", "GitHub Copilot", "OpenAI Codex", "Cursor", "Vercel AI SDK", "Gemini / OpenAI / Claude APIs"],
  },
  {
    category: "Quality & Delivery",
    skills: ["Vitest", "Testing Library", "Postman", "Git / GitHub", "Vercel", "Firebase Hosting"],
  },
  {
    category: "Ways of working",
    skills: ["Scrum", "Jira", "Figma", "Technical writing (EN C1 / ES native)"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-6">
          <h3 className="mb-4 text-lg font-semibold">{tech.category}</h3>
          <div className="flex flex-wrap gap-2">
            {tech.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
