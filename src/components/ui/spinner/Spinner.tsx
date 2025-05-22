// components/ui/Spinner.tsx
import { Loader2 } from "lucide-react";
import { cn } from "../../../lib/utils";

interface SpinnerProps {
    className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className={cn("h-12 w-12 animate-spin text-primary", className)} />
        </div>
    );
};
