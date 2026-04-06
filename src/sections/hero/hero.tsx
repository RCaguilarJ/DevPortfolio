"use client";

import { useGSAP } from "@gsap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-bg-vid.mp4";
import { Button } from "@/components/ui/button";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import { sectionTargets, siteConfig } from "@/config/site";
import { useDocumentFontsReady } from "@/hooks/use-document-fonts-ready";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	SplitText,
} from "@/lib/gsap-config";
import { Icons } from "@/lib/icons";
import { useLenis } from "@/lib/lenis-context";
import { heroContent } from "@/sections/hero/_constants/hero-content";
import { renderPixelGrid } from "@/sections/hero/_lib/pixel-grid";

registerGsapPlugins();

export default function Hero() {
	const heroRef = useRef<HTMLElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const actionsRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const pixelGridRef = useRef<HTMLDivElement>(null);
	const cvDialogRef = useRef<HTMLDivElement>(null);
	const fontsLoaded = useDocumentFontsReady();
	const [isResumeOpen, setIsResumeOpen] = useState(false);

	const { scrollTo } = useLenis();

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
				splits.forEach((split) => {
					split.revert();
				});
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

		const grid = pixelGridRef.current;
		const pixels = renderPixelGrid(grid);
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

	useEffect(() => {
		const card = cardRef.current;
		if (!card) return;

		card.addEventListener("mouseleave", handleMouseLeave);
		return () => {
			card.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [handleMouseLeave]);

	useEffect(() => {
		if (!isResumeOpen) {
			return;
		}

		const htmlOverflow = document.documentElement.style.overflow;
		const bodyOverflow = document.body.style.overflow;

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		const focusFrame = window.requestAnimationFrame(() => {
			cvDialogRef.current?.focus();
		});

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsResumeOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			window.cancelAnimationFrame(focusFrame);
			document.documentElement.style.overflow = htmlOverflow;
			document.body.style.overflow = bodyOverflow;
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isResumeOpen]);

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
						<ShinyBadge>{heroContent.badge}</ShinyBadge>
					</div>

					<h1
						ref={titleRef}
						className="text-balance text-3xl/tight sm:text-4xl/tight md:text-5xl/tight tracking-tight text-foreground invisible flex justify-center items-center space-x-2"
					>
						<span>{heroContent.title}</span>
					</h1>

					<p
						ref={descriptionRef}
						className="mt-3 text-sm/relaxed md:text-base/relaxed text-foreground invisible"
					>
						{heroContent.description}
					</p>

					<div
						ref={actionsRef}
						className="mt-5 invisible flex flex-col gap-3 sm:flex-row sm:items-center"
					>
						<Button
							variant="secondary"
							className="rounded-full"
							onClick={() => scrollTo(sectionTargets.works)}
						>
							{heroContent.primaryAction}
						</Button>

						<Button
							variant="default"
							className="rounded-full bg-[linear-gradient(135deg,#D9FF6B_0%,#B6F036_100%)] text-slate-950 shadow-[inset_0_1px_0_0_rgb(255_255_255/.42),0_16px_40px_-24px_rgba(182,240,54,0.85)] hover:brightness-95"
							onClick={() => setIsResumeOpen(true)}
						>
							<Icons.FileUpload className="size-4" />
							{heroContent.resumeAction}
						</Button>
					</div>

					<div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-foreground/55">
						<span className="inline-flex size-2 rounded-full bg-[#D9FF6B]" />
						<span>{heroContent.resumeEyebrow}</span>
					</div>
				</div>
			</div>

			{isResumeOpen && (
				<div
					className="fixed inset-0 z-40 flex items-end bg-black/72 px-3 py-3 backdrop-blur-md sm:items-center sm:px-6 sm:py-6"
					onClick={(event) => {
						if (event.target === event.currentTarget) {
							setIsResumeOpen(false);
						}
					}}
					onKeyDown={(event) => {
						if (event.key === "Escape") {
							setIsResumeOpen(false);
						}
					}}
					role="dialog"
					aria-modal="true"
					aria-labelledby="resume-title"
				>
					<div
						ref={cvDialogRef}
						tabIndex={-1}
						className="relative mx-auto grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,23,0.98)_0%,rgba(8,10,14,0.98)_100%)] shadow-[0_40px_140px_-40px_rgba(0,0,0,1)] lg:grid-cols-[minmax(320px,0.48fr)_minmax(0,1fr)]"
					>
						<button
							type="button"
							className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-black/45 p-2 text-white transition-colors hover:bg-black/70"
							onClick={() => setIsResumeOpen(false)}
							aria-label="Cerrar vista previa del CV"
						>
							<Icons.X className="size-5" />
						</button>

						<div className="flex flex-col justify-between gap-6 border-b border-white/10 p-6 sm:p-8 lg:border-r lg:border-b-0">
							<div>
								<span className="inline-flex rounded-full border border-[#D9FF6B]/30 bg-[#D9FF6B]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D9FF6B]">
									{heroContent.resumeEyebrow}
								</span>
								<h2
									id="resume-title"
									className="mt-4 text-3xl font-semibold tracking-tight text-white"
								>
									{heroContent.resumeTitle}
								</h2>
								<p className="mt-3 max-w-md text-sm leading-relaxed text-white/68 sm:text-base">
									{heroContent.resumeDescription}
								</p>
							</div>

							<div className="grid gap-3 text-sm text-white/74 sm:grid-cols-2 lg:grid-cols-1">
								<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
									<p className="text-[11px] uppercase tracking-[0.18em] text-white/42">
										Formato
									</p>
									<p className="mt-2 font-medium text-white">
										PDF listo para compartir
									</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
									<p className="text-[11px] uppercase tracking-[0.18em] text-white/42">
										Acceso
									</p>
									<p className="mt-2 font-medium text-white">
										Vista previa integrada y descarga directa
									</p>
								</div>
							</div>

							<div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
								<a
									href={siteConfig.resumeUrl}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#D9FF6B_0%,#B6F036_100%)] px-5 py-3 text-sm font-semibold text-slate-950 shadow-[inset_0_1px_0_0_rgb(255_255_255/.42),0_16px_40px_-24px_rgba(182,240,54,0.85)] transition-[transform,filter] duration-200 hover:brightness-95"
								>
									{heroContent.resumeOpenAction}
									<Icons.ArrowRight className="size-4" />
								</a>
								<a
									href={siteConfig.resumeUrl}
									download
									className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
								>
									{heroContent.resumeDownloadAction}
									<Icons.FileUpload className="size-4" />
								</a>
							</div>
						</div>

						<div className="min-h-[55vh] bg-neutral-950 p-2 sm:p-3">
							<div className="h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white">
								<iframe
									src={`${siteConfig.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
									title="Vista previa del curriculum vitae"
									className="h-[60vh] w-full bg-white sm:h-[72vh] lg:h-full"
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
