import { Suspense, lazy, useEffect, useState } from "react";
import { CubeIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";
import ShowcaseCard from "@/sections/showcase/_components/showcase-card";
import { showcaseHighlights } from "@/sections/showcase/_constants/showcase";

const RocketShowcase = lazy(
	() => import("@/sections/showcase/_components/rocket-showcase"),
);

function ClientOnly({
	children,
	fallback = null,
}: {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!mounted) return fallback;
	return <>{children}</>;
}

export default function Showcase() {
	const appsGdlHighlight = showcaseHighlights.find(
		(highlight) => highlight.src === "/AppsGDLmockup.mp4",
	);

	const rocketFallback = (minHeightClass: string) => (
		<div
			className={cn(
				"relative w-full h-full overflow-hidden rounded-2xl border border-border/80 bg-card-elevated",
				minHeightClass,
			)}
		/>
	);

	return (
		<Section
			id="showcase"
			title="Proyectos destacados"
			description="En esta galería te muestro un poco sobre los proyectos que más me han marcado a lo largo de mi trayectoria."
			className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:auto-rows-[clamp(180px,_18vw,_220px)] lg:auto-rows-[clamp(200px,_12vw,_240px)] md:grid-flow-row-dense"
			badgeText="Galeria"
			badgeIcon={<CubeIcon aria-hidden="true" className="size-3.5" />}
		>
			<div className="w-full md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-1 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1">
				{appsGdlHighlight ? (
					<ShowcaseCard
						title={appsGdlHighlight.title}
						description={appsGdlHighlight.description}
						src={appsGdlHighlight.src}
						poster={appsGdlHighlight.poster}
						mediaClassName={appsGdlHighlight.mediaClassName}
						showText={false}
					/>
				) : (
					<ClientOnly fallback={rocketFallback("min-h-[320px]")}>
						<Suspense fallback={rocketFallback("min-h-[320px]")}>
							<RocketShowcase className="min-h-[320px]" />
						</Suspense>
					</ClientOnly>
				)}
			</div>
			{showcaseHighlights.map(
				(
					{ className, title, description, src, poster, mediaClassName },
					index,
				) => {
					if (src === "/AppsGDLmockup.mp4") {
						return (
							<div
								key={`rocket-${index}`}
								className={cn("w-full lg:col-span-1 lg:row-span-1", className)}
							>
								<ClientOnly fallback={rocketFallback("min-h-[220px]")}>
									<Suspense fallback={rocketFallback("min-h-[220px]")}>
										<RocketShowcase className="min-h-[220px]" />
									</Suspense>
								</ClientOnly>
							</div>
						);
					}

					return (
						<div
							key={`${poster}-${index}`}
							className={cn("w-full lg:col-span-1 lg:row-span-1", className)}
						>
							<ShowcaseCard
								title={title}
								description={description}
								src={src}
								poster={poster}
								mediaClassName={mediaClassName}
								showText={false}
							/>
						</div>
					);
				},
			)}
		</Section>
	);
}
