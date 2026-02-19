import getSite from "@/lib/api";
import { notFound } from "next/navigation";
import { getTemplate } from "@/templates";

export default async function Home({
    params,
}: {
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    const siteData = await getSite(domain);

    if (!siteData || siteData.error) {
        return notFound();
    }

    // Resolve the correct template entirely on the server.
    // getTemplate() falls back to "default" if the theme is unknown.
    const template = getTemplate(siteData.template);
    // const HomeComponent = template.home;

    return <template.home data={siteData} />;
}
