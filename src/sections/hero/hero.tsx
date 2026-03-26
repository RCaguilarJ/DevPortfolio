"use client";

import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	SplitText,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import heroVideo from "@/assets/hero-bg-vid.mp4";

registerGsapPlugins();

export default function Hero() {
	const heroRef = useRef<HTMLElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const actionsRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const pixelGridRef = useRef<HTMLDivElement>(null);

	const [fontsLoaded, setFontsLoaded] = useState(() => {
		if (typeof document === "undefined") return false;
		if (!("fonts" in document)) return true;
		return document.fonts.status === "loaded";
	});

	const { scrollTo } = useLenis();

	useEffect(() => {
		if (fontsLoaded || typeof document === "undefined") return;
		if (!("fonts" in document)) {
			setFontsLoaded(true);
			return;
		}
		let isActive = true;
		document.fonts.ready.then(() => {
			if (isActive) setFontsLoaded(true);
		});
		return () => {
			isActive = false;
		};
	}, [fontsLoaded]);

	useGSAP(
		(context) => {
			if (!fontsLoaded) return;
			const hero = heroRef.current;
			if (!hero) return;

			gsap.set(
				[
					badgeRef.current,
					titleRef.current,
					descriptionRef.current,
					actionsRef.current,
				],
				{ autoAlpha: 1 },
			);

			const splits: SplitText[] = [];
			context.add(() => {
				splits.forEach((split) => split.revert());
			});

			const titleSplit = titleRef.current
				? new SplitText(titleRef.current, { type: "lines" })
				: null;

			const descriptionSplit = descriptionRef.current
				? new SplitText(descriptionRef.current, { type: "lines" })
				: null;

			if (titleSplit) splits.push(titleSplit);
			if (descriptionSplit) splits.push(descriptionSplit);

			const timeline = gsap.timeline({
				defaults: { ease: premiumEase },
				scrollTrigger: {
					trigger: hero,
					start: "top 80%",
					once: true,
				},
			});

			if (badgeRef.current) {
				timeline.from(badgeRef.current, {
					yPercent: 30,
					autoAlpha: 0,
					filter: "blur(16px)",
					duration: 0.9,
					ease: premiumEase,
				});
			}

			if (titleSplit) {
				timeline.from(
					titleSplit.lines,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						stagger: 0.15,
						duration: 0.9,
						ease: premiumEase,
					},
					"-=0.6",
				);
			}

			if (descriptionSplit) {
				timeline.from(
					descriptionSplit.lines,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						stagger: 0.15,
						duration: 0.9,
						ease: premiumEase,
					},
					"-=0.6",
				);
			}

			if (actionsRef.current) {
				const buttons = Array.from(
					actionsRef.current.children,
				) as HTMLElement[];
				timeline.fromTo(
					buttons,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
					},
					{
						yPercent: 0,
						autoAlpha: 1,
						filter: "blur(0px)",
						clearProps: "filter",
						stagger: 0.15,
						duration: 0.9,
						ease: premiumEase,
					},
					"-=0.6",
				);
			}
		},
		{
			scope: heroRef,
			dependencies: [fontsLoaded],
		},
	);

	const handleMouseLeave = useCallback(() => {
		if (!cardRef.current || !pixelGridRef.current) return;

		const gridSize = 4;
		const pixelSize = 100 / gridSize;
		const grid = pixelGridRef.current;

		grid.innerHTML = "";

		const totalPixels = gridSize * gridSize;
		const clearIndices = new Set<number>();
		while (clearIndices.size < 3) {
			clearIndices.add(Math.floor(Math.random() * totalPixels));
		}

		let pixelIndex = 0;
		for (let row = 0; row < gridSize; row++) {
			for (let col = 0; col < gridSize; col++) {
				if (clearIndices.has(pixelIndex)) {
					pixelIndex++;
					continue;
				}

				const pixel = document.createElement("div");
				const isPurple = Math.random() < 0.5;

				const normalizedPosition =
					(col + (gridSize - 1 - row)) / ((gridSize - 1) * 2);
				const targetOpacity = 0.5 + normalizedPosition * 0.5;

				pixel.style.cssText = `
          position:absolute;
          width:${pixelSize}%;
          height:${pixelSize}%;
          left:${col * pixelSize}%;
          top:${row * pixelSize}%;
          opacity:0;
          display:block;
          background:${isPurple ? "oklch(0.55 0.25 265)" : "oklch(0.14 0 0)"};
        `;
				pixel.setAttribute("data-target-opacity", targetOpacity.toString());
				grid.appendChild(pixel);

				pixelIndex++;
			}
		}

		const pixels = Array.from(grid.children) as HTMLElement[];
		const stepDur = 0.45;
		const staggerDur = stepDur / pixels.length;

		const tl = gsap.timeline();

		tl.to(cardRef.current, { scale: 0.995, duration: 0.2, ease: "power2.in" });

		tl.to(
			pixels,
			{
				opacity: (_i: number, target: HTMLElement) =>
					target.getAttribute("data-target-opacity") || "1",
				duration: 0.45,
				ease: "power2.in",
				stagger: { each: staggerDur, from: "random" },
			},
			"<",
		);

		tl.to(
			pixels,
			{ opacity: 0, duration: 0.3, ease: "power2.out" },
			`+=${stepDur}`,
		);
		tl.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.in" }, "<");
		tl.set(pixels, { display: "none" });
	}, []);

	return (
		<section
			ref={heroRef}
			id="hero"
			className="relative w-full min-h-[100vh] flex items-center justify-center"
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
					<source src={heroVideo} type="video/mp4" />
				</video>

				<div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0.004_265/0.4)] via-transparent to-[oklch(0.14_0.004_265/0.6)]" />
				<div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.004_265/0.4)] via-transparent to-transparent" />
			</div>

			<div className="relative z-10 w-full px-4 md:px-16 py-24">
				<div
					ref={cardRef}
					onMouseLeave={handleMouseLeave}
					className="relative overflow-hidden rounded-2xl p-6 md:p-8 max-w-2xl"
					style={{
						backdropFilter: "blur(16px)",
						WebkitBackdropFilter: "blur(16px)",
						background: "oklch(1 0 0 / 0.05)",
						border: "1px solid oklch(1 0 0 / 0.10)",
					}}
				>
					<div
						ref={pixelGridRef}
						className="absolute inset-0 pointer-events-none z-10"
					/>

					<div ref={badgeRef} className="mb-4 invisible">
						<ShinyBadge>WEB DEVELOPER</ShinyBadge>
					</div>

					<h1
						ref={titleRef}
						className="text-balance text-3xl/tight sm:text-4xl/tight md:text-5xl/tight tracking-tight text-foreground invisible flex justify-center items-center space-x-2"
					>
						<span>FULL STACK DEVELOPER</span>
					</h1>

					<p
						ref={descriptionRef}
						className="mt-3 text-sm/relaxed md:text-base/relaxed text-foreground invisible"
					>
						enfocado en proyectos full stack de javascript con frameworks como
						react y node js asi como amplio conocimiento en wordpress
					</p>

					<div ref={actionsRef} className="mt-5 invisible">
						<Button
							variant="secondary"
							className="rounded-full"
							onClick={() => scrollTo("#works")}
						>
							Ver portafolio
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
