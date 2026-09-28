import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, Github, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectLink {
  label: string
  href: string
  kind: "live" | "code"
}

interface ProjectCardProps {
  title: string
  subtitle: string
  description: string
  highlights: string[]
  image?: string
  links: ProjectLink[]
  tags: string[]
  isPrivate?: boolean
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  highlights,
  image,
  links,
  tags,
  isPrivate,
}: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-video">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-end bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-700 p-5 text-white">
            <span className="text-xs uppercase tracking-widest text-cyan-200">{subtitle}</span>
            <span className="text-2xl font-bold leading-tight">{title}</span>
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="mb-1 text-xl font-semibold">{title}</h3>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{subtitle}</p>
        <p className="mb-3 text-sm text-muted-foreground">{description}</p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4 p-4 pt-0">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline"
          >
            {link.kind === "code" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
            {link.label}
          </Link>
        ))}
        {isPrivate && (
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Private code — demo on request
          </span>
        )}
      </CardFooter>
    </Card>
  )
}
