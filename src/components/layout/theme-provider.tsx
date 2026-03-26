"use client";

import {
	createContext,
	type PropsWithChildren,
	use,
	useCallback,
	useEffect,
	useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren;

const ThemeContext = createContext<ThemeContextVal | null>(null);

const STORAGE_KEY = "_preferred-theme";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "dark";
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia("(prefers-color-scheme: light)").matches
		? "light"
		: "dark";
}

export function ThemeProvider({ children }: Props) {
	const [theme, setThemeState] = useState<Theme>("dark");

	const syncDomTheme = useCallback((nextTheme: Theme) => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(nextTheme);
		root.dataset.theme = nextTheme;
	}, []);

	useEffect(() => {
		const initial = getInitialTheme();
		setThemeState(initial);
		syncDomTheme(initial);
	}, [syncDomTheme]);

	function setTheme(val: Theme) {
		if (val === theme) return;
		setThemeState(val);
		syncDomTheme(val);
		localStorage.setItem(STORAGE_KEY, val);
	}

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
}

export function useTheme() {
	const val = use(ThemeContext);
	if (!val) throw new Error("useTheme called outside of ThemeProvider!");
	return val;
}
