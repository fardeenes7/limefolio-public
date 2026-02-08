import getSite from "@/lib/api";
import { notFound } from "next/navigation";
import HomeClient from "@/app/[domain]/(home)/home-client";

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

    // Pass data to client component which uses useTemplate hook
    return <HomeClient data={siteData} />;
}
