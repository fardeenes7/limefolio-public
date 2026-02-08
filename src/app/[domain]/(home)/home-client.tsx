"use client";

/**
 * Home Page Client Component
 *
 * Uses the useTemplate hook to get the appropriate home component
 * for the current theme with automatic fallback to default.
 */

import { useTemplate } from "@/hooks/use-template";

interface HomeClientProps {
    data: any;
}

export default function HomeClient({ data }: HomeClientProps) {
    const { HomeComponent } = useTemplate();

    return <HomeComponent data={data} />;
}
