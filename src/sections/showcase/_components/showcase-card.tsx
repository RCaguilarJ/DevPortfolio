import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ShowcaseHighlight } from "@/sections/showcase/_constants/showcase";

type ShowcaseCardProps = Omit<ShowcaseHighlight, "className"> & {
	showText?: boolean;
	mediaClassName?: string;
};

export default function ShowcaseCard({
	title,
	description,
	src,
	poster,
	showText = true,
	mediaClassName,
}: ShowcaseCardProps) {
	return (
		<Card className="relative w-full lg:h-full">
			<div className="relative w-full aspect-video lg:h-full lg:aspect-auto p-1 rounded-lg">
				{src ? (
					<video
						className={cn(
							"h-full w-full object-cover rounded-md overflow-hidden bg-card-elevated border border-border/80 p-0.5",
							mediaClassName,
						)}
						src={src}
						poster={poster}
						autoPlay
						loop
						muted
						playsInline
						preload="metadata"
					/>
				) : (
					<img
						className={cn(
							"h-full w-full object-cover rounded-md overflow-hidden bg-card-elevated border border-border/80 p-0.5",
							mediaClassName,
						)}
						src={poster}
						alt={title || "Showcase"}
						loading="lazy"
					/>
				)}
			</div>

			{showText && (title || description) && (
				<div className="absolute bottom-0 left-0 right-0 p-4">
					<CardTitle className="text-black">{title}</CardTitle>
					<CardDescription className="text-black/70">
						{description}
					</CardDescription>
				</div>
			)}
		</Card>
	);
}
