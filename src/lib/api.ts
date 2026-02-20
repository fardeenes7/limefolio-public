"use server";

import { SAMPLE_DATA } from "@/lib/sample-data";

async function fetcher(pathname: string, options: RequestInit = {}) {
    const apiUrl = process.env.API_URL?.replace(/\/$/, "");
    const reqUrl = `${apiUrl}/${pathname.replace(/^\//, "")}`;
    try {
        const res = await fetch(reqUrl, options);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function domainHeaders(domain: string) {
    return { "x-public-domain": domain };
}

export default async function getSite(domain: string) {
    // Preview domain — return static sample data without hitting the API.
    // Template can be overridden via ?template=<slug> in the page component.
    if (domain === "preview") {
        return SAMPLE_DATA;
    }

    const res = await fetcher("/", {
        headers: domainHeaders(domain),
        next: {
            // revalidate: 3600,
            tags: [`${domain}-site`],
        },
    });
    return res;
}

export async function getProjects(domain: string) {
    if (domain === "preview") {
        return SAMPLE_DATA.projects;
    }

    const res = await fetcher("/projects/", {
        headers: domainHeaders(domain),
        next: { tags: [`${domain}-projects`] },
    });
    return Array.isArray(res) ? res : (res?.results ?? []);
}

export async function getProject(domain: string, slug: string) {
    if (domain === "preview") {
        return (
            SAMPLE_DATA.projects.find((p: any) => p.slug === slug) ??
            SAMPLE_DATA.projects[0]
        );
    }

    const res = await fetcher(`/projects/${slug}/`, {
        headers: domainHeaders(domain),
        next: { tags: [`${domain}-project-${slug}`] },
    });
    return res;
}
