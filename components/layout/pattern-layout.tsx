import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

type PatternLayoutProps = {
    title: string;
    description: string;
    badge?: string;
    children: ReactNode;
};

export function PatternLayout({ title, description, badge, children }: PatternLayoutProps) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{title}</h1>

                    {badge && <Badge variant="secondary">{badge}</Badge>}
                </div>

                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            {/* Content */}
            <div className="space-y-10">{children}</div>
        </div>
    );
}
