import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WorksCardProps {
	image: string;
	title: string;
	description: string;
	link: string;
	textClassName?: string;
}

export default function WorksCard({
	image,
	title,
	description,
	link,
	textClassName,
}: WorksCardProps) {
	const hasText = Boolean(title?.trim() || description?.trim());
	const titleClass = textClassName ?? "text-primary";
	const descriptionClass = textClassName
		? cn(textClassName, "opacity-80")
		: "text-primary/45";

	return (
		<Card className="w-full overflow-hidden">
			<div className="border-b border-border/80 bg-card-elevated/70 p-1">
				<div className="relative aspect-video overflow-hidden rounded-md border border-border/80 bg-card-elevated">
					<img
						src={image}
						alt={title}
						className="h-full w-full object-contain object-center"
					/>
				</div>
			</div>

			{hasText ? (
				<div className="flex flex-col gap-3 p-4 sm:p-5">
					<div className="min-w-0">
						<CardTitle
							className={cn(
								"text-lg sm:text-xl leading-tight break-words",
								titleClass,
							)}
						>
							{title}
						</CardTitle>
						<CardDescription
							className={cn(
								"text-sm sm:text-base leading-relaxed break-words",
								descriptionClass,
							)}
						>
							{description}
						</CardDescription>
					</div>

					<Button asChild size="sm" variant="secondary" className="w-fit">
						<a href={link} target="_blank" rel="noreferrer">
							Ver proyecto
						</a>
					</Button>
				</div>
			) : null}
		</Card>
	);
}
