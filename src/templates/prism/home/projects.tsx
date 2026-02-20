import { GradientText } from "../components/gradient-text";
import Link from "next/link";
import {
    IconArrowRight,
    IconArrowUpRight,
    IconStar,
} from "@tabler/icons-react";
/** Cycle through Stripe-like card accent colours */
const CARD_GLOWS = [
    "rgba(99,102,241,0.35)", // indigo
    "rgba(168,85,247,0.30)", // purple
    "rgba(236,72,153,0.30)", // pink
    "rgba(6,182,212,0.30)", // cyan
    "rgba(139,92,246,0.32)", // violet
    "rgba(16,185,129,0.28)", // emerald
];

const PILL_COLORS = [
    {
        bg: "rgba(99,102,241,0.15)",
        border: "rgba(99,102,241,0.3)",
        text: "#818cf8",
    },
    {
        bg: "rgba(6,182,212,0.12)",
        border: "rgba(6,182,212,0.3)",
        text: "#22d3ee",
    },
    {
        bg: "rgba(236,72,153,0.12)",
        border: "rgba(236,72,153,0.3)",
        text: "#f472b6",
    },
    {
        bg: "rgba(16,185,129,0.12)",
        border: "rgba(16,185,129,0.3)",
        text: "#34d399",
    },
    {
        bg: "rgba(245,158,11,0.12)",
        border: "rgba(245,158,11,0.3)",
        text: "#fbbf24",
    },
];

function TechPill({ label, index }: { label: string; index: number }) {
    const col = PILL_COLORS[index % PILL_COLORS.length];
    return (
        <span
            className="inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold"
            style={{
                background: col.bg,
                border: `1px solid ${col.border}`,
                color: col.text,
            }}
        >
            {label}
        </span>
    );
}

export default function ProjectsSection({ projects }: { projects: any[] }) {
    if (!projects.length) return null;

    const featured = projects.filter((p) => p.featured);
    const displayed = featured.length ? featured : projects.slice(0, 6);
    const hero = displayed[0];
    const rest = displayed.slice(1, 5);
    const hasMore = projects.length > displayed.length;

    return (
        <section id="projects" className="py-28">
            <div className="mx-auto max-w-6xl px-6">
                {/* Section label */}
                <div className="mb-14">
                    <p
                        className="mb-3 text-xs font-bold uppercase tracking-[0.2em]"
                        style={{ color: "#818cf8" }}
                    >
                        Work
                    </p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                            Featured <GradientText>Projects</GradientText>
                        </h2>
                        {hasMore && (
                            <Link
                                href="/projects"
                                className="hidden items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
                            >
                                All projects <IconArrowRight size={15} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Hero card */}
                    <Link
                        href={`/projects/${hero.slug}`}
                        className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 lg:col-span-2 bg-foreground/5 border-border/40 border hover:border-primary/40"
                        style={{
                            boxShadow: `0 0 0 0 ${CARD_GLOWS[0]}`,
                        }}
                    >
                        {/* Gradient shimmer overlay */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
                            style={{
                                background:
                                    "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.04) 100%)",
                            }}
                        />

                        <div
                            className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                            style={{
                                background: "rgba(99,102,241,0.15)",
                                border: "1px solid rgba(99,102,241,0.3)",
                                color: "#818cf8",
                            }}
                        >
                            <IconStar size={11} /> Featured
                        </div>

                        <h3 className="mb-3 text-2xl font-bold text-foreground transition-colors">
                            {hero.title}
                        </h3>
                        {hero.tagline && (
                            <p className="mb-5 text-muted-foreground leading-relaxed">
                                {hero.tagline}
                            </p>
                        )}
                        {hero.technologies?.length > 0 && (
                            <div className="mt-auto flex flex-wrap gap-2">
                                {hero.technologies
                                    .slice(0, 5)
                                    .map((tech: string, i: number) => (
                                        <TechPill
                                            key={i}
                                            label={tech}
                                            index={i}
                                        />
                                    ))}
                            </div>
                        )}
                        <IconArrowUpRight
                            size={20}
                            className="absolute right-5 top-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
                        />
                    </Link>

                    {/* Smaller cards */}
                    {rest.map((project: any, idx: number) => (
                        <Link
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="group relative flex flex-col overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 bg-foreground/5 border-border/40 border hover:border-primary/40"
                        >
                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                                {project.title}
                            </h3>
                            {project.tagline && (
                                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                                    {project.tagline}
                                </p>
                            )}
                            {project.technologies?.length > 0 && (
                                <div className="mt-auto flex flex-wrap gap-1.5">
                                    {project.technologies
                                        .slice(0, 3)
                                        .map((tech: string, i: number) => (
                                            <TechPill
                                                key={i}
                                                label={tech}
                                                index={i + idx + 1}
                                            />
                                        ))}
                                </div>
                            )}
                            <IconArrowUpRight
                                size={18}
                                className="absolute right-4 top-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary"
                            />
                        </Link>
                    ))}
                </div>

                {hasMore && (
                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            href="/projects"
                            className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            View all projects →
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
