"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Drop {
	id: string;
	x: number;
	y: number;
	speed: number;
	chars: MatrixChar[];
	changeFrequency: number;
	glowIntensity: number;
	fadeLength: number;
	katakanaRatio: number;
}

interface MatrixChar {
	id: string;
	value: string;
}

const LATIN_CHARS =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
const KATAKANA_CHARS =
	"ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
const COLUMN_SPACING = 14;
const RAIN_SPEED_MULTIPLIER = 1.9;

const getRandomChar = (katakanaRatio: number): string => {
	return Math.random() < katakanaRatio
		? KATAKANA_CHARS[Math.floor(Math.random() * KATAKANA_CHARS.length)]
		: LATIN_CHARS[Math.floor(Math.random() * LATIN_CHARS.length)];
};

const getRandomLength = (): number => 5 + Math.floor(Math.random() * 25);
const getRandomSpeed = (): number =>
	(0.5 + Math.random() * 2) * RAIN_SPEED_MULTIPLIER;
const getRandomKatakanaRatio = (): number => 0.6 + Math.random() * 0.3;
const createMatrixId = () =>
	`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
const createRandomChars = (katakanaRatio: number): MatrixChar[] =>
	Array.from({ length: getRandomLength() }, () => ({
		id: createMatrixId(),
		value: getRandomChar(katakanaRatio),
	}));

interface MatrixRainProps {
	className?: string;
}

export function MatrixRain({ className = "" }: MatrixRainProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [drops, setDrops] = useState<Drop[]>([]);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const dropsRef = useRef(drops);

	dropsRef.current = drops;

	const initDrops = useCallback((width: number, height: number) => {
		const numColumns = Math.floor(width / COLUMN_SPACING);
		const newDrops: Drop[] = Array.from({ length: numColumns }, () => {
			const katakanaRatio = getRandomKatakanaRatio();
			return {
				id: createMatrixId(),
				x: Math.random() * width,
				y: -Math.random() * height * 2,
				speed: getRandomSpeed(),
				chars: createRandomChars(katakanaRatio),
				changeFrequency: Math.random() * 0.15,
				glowIntensity: 0.5 + Math.random() * 0.5,
				fadeLength: 0.2 + Math.random() * 0.3,
				katakanaRatio,
			};
		});
		setDrops(newDrops);
	}, []);

	useEffect(() => {
		const updateDimensions = () => {
			if (containerRef.current) {
				const { offsetWidth, offsetHeight } = containerRef.current;
				setDimensions({ width: offsetWidth, height: offsetHeight });
				initDrops(offsetWidth, offsetHeight);
			}
		};

		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, [initDrops]);

	useEffect(() => {
		if (drops.length === 0 || dimensions.height === 0) return;

		let animationFrameId: number;

		const animate = () => {
			setDrops((prevDrops) =>
				prevDrops.map((drop) => {
					const newY = drop.y + drop.speed;
					const offScreen = dimensions.height + drop.chars.length * 20;

					if (newY > offScreen) {
						const newKatakanaRatio =
							Math.random() > 0.8
								? drop.katakanaRatio
								: getRandomKatakanaRatio();
						return {
							...drop,
							y: -Math.random() * 500 - drop.chars.length * 20,
							speed: getRandomSpeed(),
							chars:
								Math.random() > 0.8
									? drop.chars
									: createRandomChars(newKatakanaRatio),
							fadeLength: 0.2 + Math.random() * 0.3,
							katakanaRatio: newKatakanaRatio,
						};
					}

					const newChars = drop.chars.map((char) =>
						Math.random() < drop.changeFrequency
							? { ...char, value: getRandomChar(drop.katakanaRatio) }
							: char,
					);

					return { ...drop, y: newY, chars: newChars };
				}),
			);

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(animationFrameId);
	}, [drops.length, dimensions.height]);

	return (
		<div
			ref={containerRef}
			className={`w-full h-full bg-black overflow-hidden relative ${className}`}
			style={{
				fontFamily:
					"'Courier New', monospace, 'MS Gothic', 'Meiryo', sans-serif",
			}}
		>
			{drops.map((drop) => {
				const columnBottomY = drop.y + drop.chars.length * 20;
				const fadeStartY = dimensions.height * (1 - drop.fadeLength);
				const fadeOpacity =
					columnBottomY > fadeStartY
						? Math.max(
								0,
								1 -
									(columnBottomY - fadeStartY) /
										(dimensions.height * drop.fadeLength),
							)
						: 1;

				return (
					<div
						key={drop.id}
						className="absolute font-mono text-center"
						style={{
							left: `${drop.x}px`,
							top: `${drop.y}px`,
							opacity: fadeOpacity,
						}}
					>
						{drop.chars.map((char, charIndex) => {
							const charOpacity = 0.2 + (charIndex / drop.chars.length) * 0.8;
							const isLastChar = charIndex === drop.chars.length - 1;
							const isNearLastChar =
								charIndex >= drop.chars.length - 3 &&
								charIndex < drop.chars.length - 1;

							return (
								<div
									key={char.id}
									className={`text-lg ${isLastChar ? "text-green-300" : "text-green-500"}`}
									style={{
										opacity: Math.min(1, charOpacity),
										textShadow: isLastChar
											? `0 0 ${8 * drop.glowIntensity}px #00FF41`
											: isNearLastChar
												? `0 0 ${3 * drop.glowIntensity}px #008F11`
												: "none",
									}}
								>
									{char.value}
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default MatrixRain;
