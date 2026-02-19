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

export default async function getSite(domain: string) {
    // Preview domain — return static sample data without hitting the API.
    // Template can be overridden via ?template=<slug> in the page component.
    if (domain === "preview") {
        return SAMPLE_DATA;
    }

    const res = await fetcher("/", {
        headers: {
            "x-public-domain": domain,
        },
        next: {
            revalidate: 3600,
            tags: [`${domain}-site`],
        },
    });
    return res;
}
