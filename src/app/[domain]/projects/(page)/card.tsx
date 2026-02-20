"use client";
import Link from "next/link";
import {
    IconArrowUpRight,
    IconBrandGithub,
    IconExternalLink,
    IconSparkles,
} from "@tabler/icons-react";
export default function ProjectCard({ project }: { project: any }) {
    const technologies: string[] = project.technologies || [];

    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
        >
            {/* Hover shimmer */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Arrow icon (top right) */}
            <IconArrowUpRight
                size={18}
                className="absolute right-4 top-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
            />

            {/* Featured badge */}
            {project.featured && (
                <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    <IconSparkles size={10} />
                    Featured
                </span>
            )}

            <h3 className="mb-1.5 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {project.title}
            </h3>

            {project.tagline && (
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {project.tagline}
                </p>
            )}

            {/* Tech tags */}
            {technologies.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {technologies.slice(0, 4).map((tech, i) => (
                        <span
                            key={i}
                            className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                            {tech}
                        </span>
                    ))}
                    {technologies.length > 4 && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                            +{technologies.length - 4}
                        </span>
                    )}
                </div>
            )}

            {/* Quick external links – don't trigger the card link */}
            {(project.project_url || project.github_url) && (
                <div className="mt-4 flex gap-3 border-t border-border pt-4">
                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                            <IconExternalLink size={13} />
                            Live
                        </a>
                    )}
                    {project.github_url && (
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                        >
                            <IconBrandGithub size={13} />
                            Source
                        </a>
                    )}
                </div>
            )}
        </Link>
    );
}
