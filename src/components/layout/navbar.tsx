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
	const menuRef = useRef<HTMLDivElement>(null);
	const menuContentRef = useRef<HTMLDivElement>(null);
	const toggleButtonRef = useRef<HTMLButtonElement>(null);
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

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
			if (!mobileMenuOpen || !menuRef.current || !toggleButtonRef.current) {
				return;
			}

			const target = event.target as Node;
			if (
				!menuRef.current.contains(target) &&
				!toggleButtonRef.current.contains(target)
			) {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		document.addEventListener("touchend", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.removeEventListener("touchend", handleOutsideClick);
		};
	}, [mobileMenuOpen]);

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

	const handleScroll = (link: (typeof NAV_LINKS)[number]) => {
		setMobileMenuOpen(false);
		if ("external" in link && link.external) {
			goToTarget(link.target);
		} else {
			goToTarget(link.target);
		}
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
					className="p-0 text-lg font-semibold text-foreground hover:bg-transparent md:text-xl"
					onClick={() => goToTarget("#hero")}
					role="menuitem"
				>
					<div className="flex items-center gap-2">
						<EyeLogoIcon className="size-4" />
						<span>Carlos Aguilar</span>
					</div>
				</Button>

				<div
					className="hidden absolute left-1/2 -translate-x-1/2 md:flex items-center gap-2"
					role="menubar"
					aria-label="Navegacion de escritorio"
				>
					{NAV_LINKS.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							className="text-[15px] leading-none font-medium text-foreground/80 hover:text-foreground hover:bg-transparent md:text-[18px] lg:text-[22px] xl:text-[30px]"
							onClick={() => handleScroll(link)}
							role="menuitem"
						>
							{link.label}
						</Button>
					))}
				</div>

				<div className="hidden md:flex items-center gap-3">
					<ThemeToggle />

					<Button
						variant="default"
						size="sm"
						className="border border-slate-700/80 bg-[linear-gradient(135deg,#0B121B_0%,#101B29_52%,#162438_100%)] text-base font-semibold text-slate-50 shadow-[inset_0_1px_0_0_rgb(255_255_255/.08),0_0_0_1px_rgba(255,255,255,0.04),0_18px_42px_-24px_rgba(11,18,27,0.95)] hover:brightness-110 md:text-lg"
						onClick={() => goToTarget("#footer")}
						role="menuitem"
					>
						Contacto
					</Button>
				</div>

				<div className="flex md:hidden items-center gap-2">
					<ThemeToggle />

					<Button
						variant="ghost"
						size="sm"
						ref={toggleButtonRef}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="relative flex size-8 items-center justify-center"
						aria-expanded={mobileMenuOpen}
						aria-haspopup="true"
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
				ref={menuRef}
				id={mobileMenuId}
				role="menu"
				aria-label="Navegacion movil"
				className={cn(
					"absolute top-full mt-2 w-full px-2 lg:hidden",
					mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
				)}
				aria-hidden={!mobileMenuOpen}
			>
				<div
					ref={menuContentRef}
					className="rounded-lg border bg-card/75 p-4 shadow-lg flex flex-col gap-2 overflow-hidden"
					style={{ visibility: "hidden" }}
				>
					{NAV_LINKS.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							className="justify-start px-0 text-base font-medium text-foreground/80 hover:text-foreground"
							onClick={() => handleScroll(link)}
							role="menuitem"
						>
							{link.label}
						</Button>
					))}
					<Button
						variant="default"
						size="sm"
						className="mt-2 border border-slate-700/80 bg-[linear-gradient(135deg,#0B121B_0%,#101B29_52%,#162438_100%)] text-base font-semibold text-slate-50 shadow-[inset_0_1px_0_0_rgb(255_255_255/.08),0_0_0_1px_rgba(255,255,255,0.04),0_18px_42px_-24px_rgba(11,18,27,0.95)] hover:brightness-110"
						onClick={() => goToTarget("#footer")}
						role="menuitem"
					>
						Contacto
					</Button>
				</div>
			</div>
		</nav>
	);
}
