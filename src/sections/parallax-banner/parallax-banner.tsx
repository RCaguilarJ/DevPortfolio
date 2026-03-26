"use client";

import { useEffect, useRef, useState } from "react";

const IMAGES = {
	bg1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mars-1-Zo1NQgvW94gvEt8FJwXz5dun6O8uSM.png",
	starship:
		"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/starship-tRhmn71tSxiSlegY9cFrw1Baf0w6Sq.png",
	bg2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mars-2-tAeJpmeaAehnnvVfMdXZsHM2Z9FO86.png",
	astronaut:
		"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mars-3-knXGkzdjicV39ND36hwbZPUi5vmJcG.png",
};

const renderBannerChunk = (
	text: string,
	prefix: string,
	shouldAnimate: boolean,
) => (
	<span
		key={prefix}
		className={`font-bold text-white ${shouldAnimate ? "letter-rotate" : ""}`}
		style={{
			display: "inline-block",
			transformStyle: "preserve-3d",
			whiteSpace: "nowrap",
		}}
	>
		{text}
	</span>
);

export default function ParallaxBanner() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [needsPermission, setNeedsPermission] = useState(false);
	const [gyroActive, setGyroActive] = useState(false);
	const [shouldAnimate, setShouldAnimate] = useState(true);
	const frameRef = useRef<number | undefined>(undefined);
	const lastUpdateRef = useRef<number>(0);

	const requestOrientation = async () => {
		const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as {
			requestPermission?: () => Promise<string>;
		};
		if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
			try {
				const permissionState =
					await DeviceOrientationEventTyped.requestPermission();
				if (permissionState === "granted") {
					setNeedsPermission(false);
					setGyroActive(true);
					setShouldAnimate(true);
				}
			} catch {
				console.error("Permission denied");
			}
		} else {
			setNeedsPermission(false);
			setGyroActive(true);
			setShouldAnimate(true);
		}
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
			const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
			setMousePosition({ x, y });
		};

		const handleOrientation = (e: DeviceOrientationEvent) => {
			const now = Date.now();
			if (now - lastUpdateRef.current < 16) return;
			lastUpdateRef.current = now;

			if (frameRef.current) cancelAnimationFrame(frameRef.current);

			frameRef.current = requestAnimationFrame(() => {
				const isLandscape = window.innerWidth > window.innerHeight;
				let x = 0;
				if (isLandscape) {
					const beta = e.beta || 0;
					x = Math.max(-1, Math.min(1, beta / 45));
				} else {
					const gamma = e.gamma || 0;
					x = Math.max(-1, Math.min(1, gamma / 45));
				}
				setMousePosition({ x, y: 0 });
			});
		};

		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		const isTablet =
			/iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
		const isTouchDevice =
			isMobile ||
			isTablet ||
			"ontouchstart" in window ||
			navigator.maxTouchPoints > 0;

		if (isTouchDevice) {
			const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as {
				requestPermission?: () => Promise<string>;
			};
			if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
				setNeedsPermission(true);
			} else {
				setGyroActive(true);
				setShouldAnimate(true);
			}
		} else {
			window.addEventListener("mousemove", handleMouseMove);
			setShouldAnimate(true);
		}

		if (gyroActive) {
			window.addEventListener("deviceorientation", handleOrientation);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("deviceorientation", handleOrientation);
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, [gyroActive]);

	return (
		<section
			id="parallax-banner"
			className="relative h-[100svh] w-full overflow-hidden bg-black"
		>
			{needsPermission && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
					<button
						type="button"
						onClick={requestOrientation}
						className="px-8 py-4 bg-orange-600 text-white text-xl font-bold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
					>
						Enable Parallax Effect
					</button>
				</div>
			)}

			<div
				className={`absolute inset-0 ${shouldAnimate ? "zoom-layer-1" : ""}`}
				style={{
					transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)`,
					willChange: "transform",
					width: "130%",
					height: "130%",
					left: "-15%",
					top: "-15%",
				}}
			>
				<img
					src={IMAGES.bg1}
					alt="Mars planet from space"
					className="absolute inset-0 w-full h-full object-cover"
				/>
			</div>

			<div
				className={`absolute z-5 ${shouldAnimate ? "zoom-layer-starship" : ""}`}
				style={{
					transform: `translate3d(${mousePosition.x * 50}px, ${mousePosition.y * 50}px, 0) scale(0.75)`,
					willChange: "transform",
					width: "clamp(220px, 42vw, 800px)",
					aspectRatio: "1 / 1",
					left: "clamp(-72px, 1.5vw, 24px)",
					top: "clamp(56px, 9svh, 120px)",
				}}
			>
				<img
					src={IMAGES.starship}
					alt="Space station"
					className="w-full h-full object-contain object-left-top"
				/>
			</div>

			<div
				className={`absolute inset-0 z-10 ${shouldAnimate ? "zoom-layer-2" : ""}`}
				style={{
					transform: `translate3d(${mousePosition.x * 60}px, ${mousePosition.y * 60}px, 0)`,
					willChange: "transform",
					width: "130%",
					height: "130%",
					left: "-15%",
					top: "-15%",
				}}
			>
				<img
					src={IMAGES.bg2}
					alt="Spacecraft interior window"
					className="absolute inset-0 w-full h-full object-cover"
				/>
			</div>

			<div
				className={`absolute inset-0 z-15 pointer-events-none ${shouldAnimate ? "zoom-layer-3" : ""}`}
				style={{
					transform: `translate3d(${mousePosition.x * 120}px, ${mousePosition.y * 120}px, 0)`,
					willChange: "transform",
				}}
			>
				<div className="absolute inset-x-0 bottom-[-12svh] flex justify-center px-4 sm:bottom-[-14svh]">
					<img
						src={IMAGES.astronaut}
						alt="Astronaut"
						className="h-auto w-[clamp(560px,96vw,1680px)] max-w-none object-contain"
					/>
				</div>
			</div>

			<div
				className={`absolute inset-0 z-50 flex items-center justify-center px-4 pt-[6svh] pointer-events-none sm:px-6 md:px-8 ${shouldAnimate ? "zoom-layer-text" : ""}`}
				style={{
					transform: `translate3d(${mousePosition.x * 140}px, ${mousePosition.y * 140}px, 0)`,
					willChange: "transform",
					perspective: "1000px",
				}}
			>
				<div className="banner-copy z-40">
					<div className="banner-copy__word banner-copy__word--left">
						{renderBannerChunk("FULL STACK", "fs", shouldAnimate)}
					</div>
					<div className="banner-copy__gap" />
					<div className="banner-copy__word banner-copy__word--right">
						{renderBannerChunk("DEVELOPER", "dev", shouldAnimate)}
					</div>
				</div>
			</div>

			<style>{`
        .zoom-layer-1 {
          animation: zoomOut1 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-starship {
          animation: zoomOutStarship 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-2 {
          animation: zoomOut2 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-3 {
          animation: zoomOut3 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .zoom-layer-text {
          animation: zoomOutText 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .banner-copy {
          width: min(100%, 1480px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(120px, 18vw, 320px) minmax(0, 1fr);
          align-items: center;
          gap: clamp(10px, 1.5vw, 28px);
          font-size: clamp(28px, 5.8vw, 96px);
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-transform: uppercase;
        }

        .banner-copy__word {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          text-shadow: 0 8px 32px rgba(0, 0, 0, 0.28);
        }

        .banner-copy__word--left {
          justify-content: flex-end;
          text-align: right;
        }

        .banner-copy__word--right {
          justify-content: flex-start;
          text-align: left;
        }

        .banner-copy__gap {
          width: 100%;
          height: 100%;
        }

        @keyframes zoomOut1 {
          0% { scale: 1.3; }
          100% { scale: 1; }
        }
        @keyframes zoomOutStarship {
          0% { scale: 1.5; }
          100% { scale: 0.75; }
        }
        @keyframes zoomOut2 {
          0% { scale: 2.5; filter: blur(20px); }
          50% { filter: blur(10px); }
          100% { scale: 1; filter: blur(0px); }
        }
        @keyframes zoomOut3 {
          0% { scale: 8; filter: blur(40px); opacity: 0; }
          30% { filter: blur(25px); opacity: 0.3; }
          70% { filter: blur(10px); opacity: 0.7; }
          100% { scale: 1; filter: blur(0px); opacity: 1; }
        }
        @keyframes zoomOutText {
          0% { scale: 3.5; opacity: 0; }
          40% { opacity: 0.3; }
          70% { opacity: 0.7; }
          100% { scale: 1; opacity: 1; }
        }
        .letter-rotate {
          animation: rotateText 8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        .parallax-text {
          font-size: clamp(24px, 5vw, 40px);
          letter-spacing: 0.02em;
          line-height: 1.2;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 100%;
          gap: 0;
        }
        
        .parallax-text-small {
          font-size: clamp(12px, 2vw, 22px);
          letter-spacing: 0.02em;
          line-height: 1.2;
          justify-content: center;
          max-width: 100%;
          gap: 0;
          white-space: nowrap;
        }
        
        @media (min-width: 375px) {
          .parallax-text {
            font-size: clamp(28px, 6vw, 48px);
          }
          .parallax-text-small {
            font-size: clamp(14px, 2.5vw, 26px);
          }
        }
        
        @media (min-width: 480px) {
          .parallax-text {
            font-size: clamp(32px, 7vw, 56px);
          }
          .parallax-text-small {
            font-size: clamp(16px, 3vw, 30px);
          }
        }
        
        @media (min-width: 640px) {
          .parallax-text {
            font-size: clamp(36px, 8vw, 64px);
          }
          .parallax-text-small {
            font-size: clamp(18px, 3.5vw, 34px);
          }
        }
        
        @media (min-width: 768px) {
          .parallax-text {
            font-size: clamp(40px, 9vw, 72px);
          }
          .parallax-text-small {
            font-size: clamp(20px, 4vw, 38px);
          }
        }
        
        @media (min-width: 900px) {
          .parallax-text {
            font-size: clamp(44px, 10vw, 80px);
          }
          .parallax-text-small {
            font-size: clamp(22px, 4.5vw, 42px);
          }
        }
        
        @media (min-width: 1024px) {
          .parallax-text {
            font-size: clamp(48px, 11vw, 90px);
          }
          .parallax-text-small {
            font-size: clamp(24px, 5vw, 46px);
          }
        }
        
        @media (min-width: 1200px) {
          .parallax-text {
            font-size: clamp(52px, 12vw, 100px);
          }
          .parallax-text-small {
            font-size: clamp(26px, 5.5vw, 50px);
          }
        }
        
        @media (min-width: 1400px) {
          .parallax-text {
            font-size: clamp(56px, 13vw, 110px);
          }
          .parallax-text-small {
            font-size: clamp(28px, 6vw, 54px);
          }
        }

        @media (max-width: 1023px) {
          .banner-copy {
            grid-template-columns: minmax(0, 1fr) clamp(90px, 12vw, 160px) minmax(0, 1fr);
            font-size: clamp(24px, 6.5vw, 64px);
          }
        }

        @media (max-width: 767px) {
          .banner-copy {
            width: min(100%, 560px);
            grid-template-columns: 1fr;
            gap: 0.35rem;
            font-size: clamp(34px, 10vw, 64px);
            line-height: 0.9;
            text-align: center;
          }

          .banner-copy__word,
          .banner-copy__word--left,
          .banner-copy__word--right {
            justify-content: center;
            text-align: center;
          }

          .banner-copy__gap {
            display: none;
          }
        }
        
        @keyframes rotateText {
          0% { transform: rotateY(90deg); filter: blur(30px); opacity: 0; }
          40% { filter: blur(15px); opacity: 0.5; }
          70% { filter: blur(5px); opacity: 0.8; }
          100% { transform: rotateY(0deg); filter: blur(0px); opacity: 1; }
        }
      `}</style>
		</section>
	);
}
