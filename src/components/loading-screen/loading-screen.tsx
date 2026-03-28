"use client";

import { useEffect, useState } from "react";
import heroVideo from "@/assets/hero-bg-vid.mp4";

interface LoadingScreenProps {
	onComplete: () => void;
	targetUrl: string;
	minDuration?: number;
}

export default function LoadingScreen({
	onComplete,
	targetUrl,
	minDuration = 3000,
}: LoadingScreenProps) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const startTime = Date.now();
		let animationFrame: number;

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const durationProgress = Math.min(elapsed / minDuration, 1);
			const randomProgress = Math.min(
				durationProgress * 100 + Math.random() * 20,
				100,
			);

			setProgress(Math.min(Math.round(randomProgress), 99));

			if (durationProgress < 1) {
				animationFrame = requestAnimationFrame(animate);
			} else {
				setProgress(100);
				setTimeout(() => {
					onComplete();
					window.location.href = targetUrl;
				}, 500);
			}
		};

		animationFrame = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrame);
	}, [minDuration, onComplete, targetUrl]);

	return (
		<div
			className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
			style={{ background: "oklch(0.14 0.004 265)" }}
		>
			<div className="absolute inset-0 overflow-hidden">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 h-full w-full object-cover opacity-30"
				>
					<source src={heroVideo} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-[oklch(0.14_0.004_265/0.7)]" />
			</div>

			<div className="relative z-10 flex flex-col items-center gap-6">
				<div className="relative w-32 h-32 flex items-center justify-center">
					<svg
						className="w-full h-full -rotate-90"
						viewBox="0 0 100 100"
						aria-hidden="true"
					>
						<circle
							cx="50"
							cy="50"
							r="45"
							fill="none"
							stroke="oklch(1 0 0 / 0.1)"
							strokeWidth="4"
						/>
						<circle
							cx="50"
							cy="50"
							r="45"
							fill="none"
							stroke="oklch(0.75 0.15 265)"
							strokeWidth="4"
							strokeLinecap="round"
							strokeDasharray={`${progress * 2.83} 283`}
							className="transition-all duration-150 ease-out"
						/>
					</svg>
					<output
						className="absolute text-2xl font-bold text-foreground"
						htmlFor="progress"
					>
						{progress}%
					</output>
				</div>

				<div className="text-center">
					<p className="text-lg text-foreground/80">Cargando proyectos...</p>
					<p className="text-sm text-foreground/50 mt-1">
						Preparando tu experiencia
					</p>
				</div>
			</div>
		</div>
	);
}
