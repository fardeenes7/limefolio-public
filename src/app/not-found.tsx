import { Figtree } from "next/font/google";
import NotFoundComponent from "@/components/not-found";

const figtree = Figtree({ subsets: ["latin"] });

export default function NotFound() {
    return (
        <html lang="en" className={`${figtree.className}`}>
            <body className="font-figtree">
                <NotFoundComponent />
            </body>
        </html>
    );
}
