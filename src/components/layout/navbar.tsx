import { useGSAP } from "@gsap/react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { EyeLogoIcon } from "@/components/icons/eye-logo-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	ScrollTrigger,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import { cn } from "@/lib/utils";

registerGsapPlugins();

const NAV_LINKS: Array<{ label: string; target: string; external?: boolean }> =
	[
		{ label: "Servicios", target: "#services" },
		{ label: "Proyectos", target: "#works" },
		{ label: "Galeria", target: "#showcase" },
		{ label: "Certificados", target: "/certificados", external: true },
		{ label: "Testimonios", target: "#testimonios" },
		{ label: "Preguntas", target: "#faq" },
	];

const colorWithOpacity = (token: string, opacity: number) => {
	const clamped = Math.min(Math.max(opacity, 0), 1);
	const percent = Number((clamped * 100).toFixed(2));
	return `color-mix(in oklab, var(${token}) ${percent}%, transparent)`;
};

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(
		typeof window !== "undefined" ? window.innerWidth < 1024 : false,
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
	const location = useLocation();
	const navigate = useNavigate();
	const mobileMenuId = useId();

	const toggleTl = useRef<gsap.core.Timeline | null>(null);
	const menuTl = useRef<gsap.core.Timeline | null>(null);
	const navbarTl = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const updateViewport = () => {
			setIsMobile(window.innerWidth < 1024);
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

	const goToTarget = (target: string) => {
		if (target.startsWith("#")) {
			if (location.pathname === "/") {
				scrollTo(target);
				window.history.replaceState(null, "", target);
				return;
			}

			navigate(`/${target}`);
			return;
		}

		if (location.pathname !== target) {
			navigate(target);
		}
	};

	const isLinkActive = (link: (typeof NAV_LINKS)[number]) => {
		if (link.target.startsWith("#")) {
			return location.pathname === "/" && location.hash === link.target;
		}

		return location.pathname === link.target;
	};

	const handleScroll = (link: (typeof NAV_LINKS)[number]) => {
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
					"relative flex w-full items-center justify-between rounded-lg py-1.5 px-4",
					"bg-card/75 lg:bg-card/0 border border-border lg:border-border/0 dark:card-highlight",
					"[--highlight-opacity:1] lg:[--highlight-opacity:0] text-foreground transition-shadow duration-350 ease-navbar",
					isNavbarElevated && "shadow-lg",
				)}
			>
				<Button
					variant="ghost"
					size="sm"
					className="p-0 font-semibold text-foreground hover:bg-transparent"
					onClick={() => goToTarget("#hero")}
				>
					<div className="flex items-center gap-2">
						<EyeLogoIcon className="size-4" />
						<span className="text-lg lg:text-xl xl:text-2xl">
							Carlos Aguilar
						</span>
					</div>
				</Button>

				<div className="hidden absolute left-1/2 -translate-x-1/2 translate-y-[3px] lg:flex items-center gap-2">
					{NAV_LINKS.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							className={cn(
								"text-lg leading-none font-medium hover:bg-transparent lg:text-xl xl:text-2xl",
								isLinkActive(link)
									? "text-foreground"
									: "text-foreground/72 hover:text-foreground",
							)}
							onClick={() => handleScroll(link)}
							aria-current={isLinkActive(link) ? "page" : undefined}
						>
							{link.label}
						</Button>
					))}
				</div>

				<div className="hidden lg:flex items-center gap-3">
					<ThemeToggle />

					<Button
						variant="default"
						size="sm"
						className="border border-slate-700/80 bg-[linear-gradient(135deg,#0B121B_0%,#101B29_52%,#162438_100%)] text-base font-semibold text-slate-50 shadow-[inset_0_1px_0_0_rgb(255_255_255/.08),0_0_0_1px_rgba(255,255,255,0.04),0_18px_42px_-24px_rgba(11,18,27,0.95)] hover:brightness-110 lg:text-lg"
						onClick={() => goToTarget("#footer")}
					>
						Contacto
					</Button>
				</div>

				<div className="flex lg:hidden items-center gap-2">
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
					"fixed inset-0 z-[-1] bg-foreground/8 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden",
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
					"absolute top-full mt-2 w-full px-2 lg:hidden",
					mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
				)}
				aria-hidden={!mobileMenuOpen}
			>
				<div
					ref={menuContentRef}
					className="flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-3 shadow-2xl backdrop-blur-xl"
					style={{ display: "none", visibility: "hidden" }}
				>
					{NAV_LINKS.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							ref={link === NAV_LINKS[0] ? firstMobileActionRef : undefined}
							className={cn(
								"h-11 justify-start rounded-xl px-3 text-base font-medium",
								isLinkActive(link)
									? "bg-card-muted text-foreground"
									: "text-foreground/80 hover:bg-card-muted hover:text-foreground",
							)}
							onClick={() => handleScroll(link)}
							aria-current={isLinkActive(link) ? "page" : undefined}
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
							goToTarget("#footer");
						}}
					>
						Contacto
					</Button>
				</div>
			</div>
		</nav>
	);
}
