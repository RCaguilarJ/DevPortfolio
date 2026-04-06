import { useEffect, useState } from "react";

export function useDocumentFontsReady() {
	const [fontsReady, setFontsReady] = useState(() => {
		if (typeof document === "undefined") return false;
		if (!("fonts" in document)) return true;
		return document.fonts.status === "loaded";
	});

	useEffect(() => {
		if (fontsReady || typeof document === "undefined") return;
		if (!("fonts" in document)) {
			setFontsReady(true);
			return;
		}

		let isActive = true;
		document.fonts.ready.then(() => {
			if (isActive) {
				setFontsReady(true);
			}
		});

		return () => {
			isActive = false;
		};
	}, [fontsReady]);

	return fontsReady;
}
