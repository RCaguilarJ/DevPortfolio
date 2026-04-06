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
		<Card className="relative w-full aspect-video overflow-hidden">
			<div className="relative w-full h-full p-1 rounded-lg">
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover rounded-md overflow-hidden bg-card-elevated border border-border/80 p-0.5"
				/>

				{hasText ? (
					<div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3 sm:p-4">
						<div className="min-w-0 max-w-2xl flex-1">
							<CardTitle
								className={cn(
									"text-sm sm:text-base lg:text-lg leading-snug break-words",
									titleClass,
								)}
							>
								{title}
							</CardTitle>
							<CardDescription
								className={cn(
									"text-xs sm:text-sm leading-snug break-words overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]",
									descriptionClass,
								)}
							>
								{description}
							</CardDescription>
						</div>

						<Button
							asChild
							size="sm"
							variant="secondary"
							className="w-fit shrink-0"
						>
							<a href={link} target="_blank" rel="noreferrer">
								Ver proyecto
							</a>
						</Button>
					</div>
				) : null}
			</div>
		</Card>
	);
}
