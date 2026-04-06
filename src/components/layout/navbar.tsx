import { useGSAP } from "@gsap/react";
import { useEffect, useId, useRef, useState } from "react";
import { EyeLogoIcon } from "@/components/icons/eye-logo-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
	type NavigationLink,
	primaryNavigation,
	sectionTargets,
} from "@/config/site";
import { useAppNavigation } from "@/hooks/use-app-navigation";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	ScrollTrigger,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import { cn } from "@/lib/utils";

registerGsapPlugins();

const colorWithOpacity = (token: string, opacity: number) => {
	const clamped = Math.min(Math.max(opacity, 0), 1);
	const percent = Number((clamped * 100).toFixed(2));
	return `color-mix(in oklab, var(${token}) ${percent}%, transparent)`;
};

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(
		typeof window !== "undefined" ? window.innerWidth < 1280 : false,
	);
	const [isNavbarElevated, setIsNavbarElevated] = useState(false);
	const navbarRef = useRef<HTMLDivElement>(null);
	const menuContentRef = useRef<HTMLDivElement>(null);
	const toggleButtonRef = useRef<HTMLButtonElement>(null);
	const firstMobileActionRef = useRef<HTMLButtonElement>(null);
	const lineOneRef = useRef<HTMLSpanElement>(null);
	const lineTwoRef = useRef<HTMLSpanElement>(null);
	const lineThreeRef = useRef<HTMLSpanElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
	const { scrollTo } = useLenis();
	const { goToTarget, isTargetActive, location } = useAppNavigation();
	const mobileMenuId = useId();

	const toggleTl = useRef<gsap.core.Timeline | null>(null);
	const menuTl = useRef<gsap.core.Timeline | null>(null);
	const navbarTl = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const updateViewport = () => {
			setIsMobile(window.innerWidth < 1280);
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);

		return () => {
			window.removeEventListener("resize", updateViewport);
		};
	}, []);

	useGSAP(
		() => {
			const lineOne = lineOneRef.current;
			const lineTwo = lineTwoRef.current;
			const lineThree = lineThreeRef.current;
			if (!lineOne || !lineTwo || !lineThree) return;

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.25,
					ease: premiumEase,
				},
			});

			tl.to(lineOne, { rotation: 45, y: 0 }, 0)
				.to(lineTwo, { opacity: 0, rotation: 45 }, 0)
				.to(lineThree, { rotation: -45, y: 0 }, 0);

			toggleTl.current = tl;

			return () => {
				tl.kill();
			};
		},
		{ scope: toggleButtonRef },
	);

	useGSAP(
		() => {
			const menu = menuContentRef.current;
			if (!menu) return;

			gsap.set(menu, {
				autoAlpha: 0,
				scale: 0.97,
				backdropFilter: "blur(0px)",
				borderColor: colorWithOpacity("--color-border", 0),
			});

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.25,
					ease: premiumEase,
				},
			});

			tl.to(menu, {
				autoAlpha: 1,
				scale: 1,
				backdropFilter: "blur(16px)",
				borderColor: colorWithOpacity("--color-border", 1),
				onStart: () => {
					menu.style.display = "flex";
				},
				onReverseComplete: () => {
					menu.style.display = "none";
				},
			});

			menuTl.current = tl;

			return () => {
				tl.kill();
			};
		},
		{ scope: menuContentRef },
	);

	useEffect(() => {
		const iconTl = toggleTl.current;
		const mTl = menuTl.current;

		if (mobileMenuOpen) {
			iconTl?.play();
			mTl?.play();
		} else {
			iconTl?.reverse();
			mTl?.reverse();
		}
	}, [mobileMenuOpen]);

	useEffect(() => {
		if (!isMobile && mobileMenuOpen) {
			setMobileMenuOpen(false);
		}
	}, [isMobile, mobileMenuOpen]);

	useEffect(() => {
		if (!mobileMenuOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMobileMenuOpen(false);
				toggleButtonRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [mobileMenuOpen]);

	useEffect(() => {
		if (!mobileMenuOpen || !isMobile) return;

		const htmlOverflow = document.documentElement.style.overflow;
		const bodyOverflow = document.body.style.overflow;

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		const frame = window.requestAnimationFrame(() => {
			firstMobileActionRef.current?.focus();
		});

		return () => {
			window.cancelAnimationFrame(frame);
			document.documentElement.style.overflow = htmlOverflow;
			document.body.style.overflow = bodyOverflow;
		};
	}, [isMobile, mobileMenuOpen]);

	useGSAP(
		() => {
			const navbar = navbarRef.current;
			if (!navbar) return;

			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
			navbarTl.current?.kill();
			navbarTl.current = null;

			if (isMobile) {
				setIsNavbarElevated(true);
				gsap.set(navbar, {
					backgroundColor: colorWithOpacity("--color-card", 0.75),
					borderColor: colorWithOpacity("--color-border", 1),
					backdropFilter: "blur(16px)",
					maxWidth: "100%",
					transform: "translateY(0px)",
					"--highlight-opacity": 1,
				});
				return;
			}

			setIsNavbarElevated(false);
			gsap.set(navbar, {
				backgroundColor: colorWithOpacity("--color-card", 0),
				borderColor: colorWithOpacity("--color-border", 0),
				backdropFilter: "blur(0px)",
				maxWidth: "100%",
				transform: "translateY(0px)",
				"--highlight-opacity": 0,
			});

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.35,
					ease: premiumEase,
				},
			});

			tl.to(navbar, {
				backgroundColor: colorWithOpacity("--color-card", 0.75),
				borderColor: colorWithOpacity("--color-border", 1),
				backdropFilter: "blur(16px)",
				maxWidth: "100%",
				transform: "translateY(6px)",
				"--highlight-opacity": 1,
			});

			navbarTl.current = tl;

			scrollTriggerRef.current = ScrollTrigger.create({
				start: "top+=12 top",
				onEnter: () => {
					setIsNavbarElevated(true);
					navbarTl.current?.play();
				},
				onLeaveBack: () => {
					setIsNavbarElevated(false);
					navbarTl.current?.reverse();
				},
			});

			return () => {
				scrollTriggerRef.current?.kill();
				scrollTriggerRef.current = null;
				navbarTl.current?.kill();
				navbarTl.current = null;
			};
		},
		{ dependencies: [isMobile] },
	);

	useEffect(() => {
		return () => {
			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (location.pathname !== "/" || !location.hash) return;

		const frame = window.requestAnimationFrame(() => {
			scrollTo(location.hash);
		});

		return () => {
			window.cancelAnimationFrame(frame);
		};
	}, [location.hash, location.pathname, scrollTo]);

	const handleScroll = (link: NavigationLink) => {
		setMobileMenuOpen(false);
		goToTarget(link.target);
	};

	return (
		<nav
			className="fixed top-2 inset-x-0 z-50 flex justify-center px-2 md:px-4"
			aria-label="Navegacion principal"
		>
			<div
				ref={navbarRef}
				className={cn(
					"relative grid w-full grid-cols-[minmax(0,auto)_1fr_minmax(0,auto)] items-center gap-3 rounded-lg px-4 py-1.5 xl:gap-6",
					"bg-card/75 lg:bg-card/0 border border-border lg:border-border/0 dark:card-highlight",
					"[--highlight-opacity:1] lg:[--highlight-opacity:0] text-foreground transition-shadow duration-350 ease-navbar",
					isNavbarElevated && "shadow-lg",
				)}
			>
				<Button
					variant="ghost"
					size="sm"
					className="min-w-0 justify-self-start p-0 font-semibold text-foreground hover:bg-transparent xl:min-w-[220px]"
					onClick={() => goToTarget(sectionTargets.hero)}
					aria-label="Ir al inicio"
				>
					<div className="flex items-center">
						<EyeLogoIcon className="size-4" />
					</div>
				</Button>

				<div className="hidden min-w-0 items-center justify-center gap-1 justify-self-center xl:flex 2xl:gap-2">
					{primaryNavigation.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							className={cn(
								"px-2 text-lg leading-none font-medium hover:bg-transparent xl:text-xl 2xl:text-2xl",
								isTargetActive(link.target)
									? "text-foreground"
									: "text-foreground/72 hover:text-foreground",
							)}
							onClick={() => handleScroll(link)}
							aria-current={isTargetActive(link.target) ? "page" : undefined}
						>
							{link.label}
						</Button>
					))}
				</div>

				<div className="hidden items-center justify-end gap-3 justify-self-end xl:flex xl:min-w-[220px]">
					<ThemeToggle />

					<Button
						variant="default"
						size="sm"
						className="border border-slate-700/80 bg-[linear-gradient(135deg,#0B121B_0%,#101B29_52%,#162438_100%)] text-base font-semibold text-slate-50 shadow-[inset_0_1px_0_0_rgb(255_255_255/.08),0_0_0_1px_rgba(255,255,255,0.04),0_18px_42px_-24px_rgba(11,18,27,0.95)] hover:brightness-110 xl:text-lg"
						onClick={() => goToTarget(sectionTargets.footer)}
					>
						Contacto
					</Button>
				</div>

				<div className="flex items-center justify-self-end gap-2 xl:hidden">
					<ThemeToggle />

					<Button
						variant="ghost"
						size="sm"
						ref={toggleButtonRef}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className={cn(
							"relative flex size-9 items-center justify-center rounded-full border border-border/70 bg-card/70 shadow-sm backdrop-blur-sm",
							mobileMenuOpen && "bg-card-elevated",
						)}
						aria-expanded={mobileMenuOpen}
						aria-controls={mobileMenuId}
						aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
					>
						<span
							ref={lineOneRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
							style={{ transform: "translateY(-6px)" }}
						/>
						<span
							ref={lineTwoRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
						/>
						<span
							ref={lineThreeRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
							style={{ transform: "translateY(6px)" }}
						/>
					</Button>
				</div>
			</div>

			<div
				className={cn(
					"fixed inset-0 z-[-1] bg-foreground/8 backdrop-blur-[2px] transition-opacity duration-200 xl:hidden",
					mobileMenuOpen
						? "pointer-events-auto opacity-100"
						: "pointer-events-none opacity-0",
				)}
				aria-hidden="true"
				onClick={() => setMobileMenuOpen(false)}
			/>

			<div
				id={mobileMenuId}
				className={cn(
					"absolute top-full mt-2 w-full px-2 xl:hidden",
					mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
				)}
				aria-hidden={!mobileMenuOpen}
			>
				<div
					ref={menuContentRef}
					className="flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-3 shadow-2xl backdrop-blur-xl"
					style={{ display: "none", visibility: "hidden" }}
				>
					{primaryNavigation.map((link, index) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							ref={index === 0 ? firstMobileActionRef : undefined}
							className={cn(
								"h-11 justify-start rounded-xl px-3 text-base font-medium",
								isTargetActive(link.target)
									? "bg-card-muted text-foreground"
									: "text-foreground/80 hover:bg-card-muted hover:text-foreground",
							)}
							onClick={() => handleScroll(link)}
							aria-current={isTargetActive(link.target) ? "page" : undefined}
						>
							{link.label}
						</Button>
					))}
					<Button
						variant="default"
						size="sm"
						className="mt-1 h-11 rounded-xl border border-slate-700/80 bg-[linear-gradient(135deg,#0B121B_0%,#101B29_52%,#162438_100%)] text-base font-semibold text-slate-50 shadow-[inset_0_1px_0_0_rgb(255_255_255/.08),0_0_0_1px_rgba(255,255,255,0.04),0_18px_42px_-24px_rgba(11,18,27,0.95)] hover:brightness-110"
						onClick={() => {
							setMobileMenuOpen(false);
							goToTarget(sectionTargets.footer);
						}}
					>
						Contacto
					</Button>
				</div>
			</div>
		</nav>
	);
}
