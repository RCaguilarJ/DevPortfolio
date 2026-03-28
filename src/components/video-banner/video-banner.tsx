"use client";

import heroVideo from "@/assets/hero-bg-vid.mp4";
import { EyeLogoIcon } from "@/components/icons/eye-logo-icon";
import { Button } from "@/components/ui/button";

interface VideoBannerProps {
	title?: string;
	subtitle?: string;
	buttonText?: string;
	buttonLink?: string;
	videoSrc?: string;
	logoSize?: number;
	className?: string;
}

export default function VideoBanner({
	title = "FULL STACK DEVELOPER",
	subtitle = "enfocado en proyectos full stack de javascript con frameworks como react y node js",
	buttonText = "Ver Productos",
	buttonLink = "/productos",
	videoSrc = heroVideo,
	logoSize = 48,
	className = "",
}: VideoBannerProps) {
	const handleClick = () => {
		window.location.href = buttonLink;
	};

	return (
		<section
			className={`relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden ${className}`}
			style={{ background: "oklch(0.14 0.004 265)" }}
		>
			<div className="absolute inset-0 overflow-hidden">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 h-full w-full object-cover opacity-50"
				>
					<source src={videoSrc} type="video/mp4" />
				</video>

				<div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.004_265/0.4)] via-transparent to-[oklch(0.14_0.004_265/0.6)]" />
				<div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.004_265/0.4)] via-transparent to-transparent" />
			</div>

			<div className="relative z-10 w-full px-4 md:px-16 py-24 flex flex-col items-center justify-center min-h-[100vh]">
				<EyeLogoIcon
					className={`w-[${logoSize}px] h-[${logoSize}px] mb-6`}
					style={{ width: logoSize, height: logoSize }}
				/>

				<h1 className="text-balance text-3xl/tight sm:text-4xl/tight md:text-5xl/tight tracking-tight text-foreground flex justify-center items-center text-center">
					{title}
				</h1>

				<p className="mt-3 text-sm/relaxed md:text-base/relaxed text-foreground text-center max-w-xl">
					{subtitle}
				</p>

				<div className="mt-5">
					<Button
						variant="secondary"
						className="rounded-full"
						onClick={handleClick}
					>
						{buttonText}
					</Button>
				</div>
			</div>
		</section>
	);
}
