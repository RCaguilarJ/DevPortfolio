const GRID_SIZE = 4;
const CLEAR_PIXEL_COUNT = 3;
const DARK_PIXEL_COLOR = "oklch(0.14 0 0)";
const ACCENT_PIXEL_COLOR = "oklch(0.55 0.25 265)";

export function renderPixelGrid(grid: HTMLDivElement) {
	const pixelSize = 100 / GRID_SIZE;
	const totalPixels = GRID_SIZE * GRID_SIZE;
	const clearIndices = new Set<number>();

	grid.innerHTML = "";

	while (clearIndices.size < CLEAR_PIXEL_COUNT) {
		clearIndices.add(Math.floor(Math.random() * totalPixels));
	}

	let pixelIndex = 0;
	for (let row = 0; row < GRID_SIZE; row++) {
		for (let col = 0; col < GRID_SIZE; col++) {
			if (clearIndices.has(pixelIndex)) {
				pixelIndex++;
				continue;
			}

			const pixel = document.createElement("div");
			const normalizedPosition =
				(col + (GRID_SIZE - 1 - row)) / ((GRID_SIZE - 1) * 2);
			const targetOpacity = 0.5 + normalizedPosition * 0.5;
			const backgroundColor =
				Math.random() < 0.5 ? ACCENT_PIXEL_COLOR : DARK_PIXEL_COLOR;

			pixel.style.cssText = `
				position:absolute;
				width:${pixelSize}%;
				height:${pixelSize}%;
				left:${col * pixelSize}%;
				top:${row * pixelSize}%;
				opacity:0;
				display:block;
				background:${backgroundColor};
			`;
			pixel.setAttribute("data-target-opacity", targetOpacity.toString());
			grid.appendChild(pixel);
			pixelIndex++;
		}
	}

	return Array.from(grid.children) as HTMLElement[];
}
