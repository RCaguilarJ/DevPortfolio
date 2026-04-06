import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";

const postThemeValidator = z.union([z.literal("light"), z.literal("dark")]);
export type T = z.infer<typeof postThemeValidator>;
const storageKey = "_preferred-theme";

type CookieStoreLike = {
	set(options: {
		name: string;
		value: string;
		expires?: number;
		path?: string;
	}): Promise<void>;
};

// Funciones para manejo de cookies en el cliente (browser)
export function getCookieClient(name: string): string | undefined {
	if (typeof document === "undefined") return undefined;
	const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
	return match ? decodeURIComponent(match[2]) : undefined;
}

export async function setCookieClient(name: string, value: string, days = 365) {
	if (typeof document === "undefined" || typeof window === "undefined") return;

	const expiresAt = Date.now() + days * 864e5;
	const cookieStore = (window as Window & { cookieStore?: CookieStoreLike })
		.cookieStore;

	if (cookieStore) {
		await cookieStore.set({
			name,
			value,
			expires: expiresAt,
			path: "/",
		});
	}
}

export const getThemeServerFn = createServerFn().handler(
	async () => (getCookie(storageKey) || "dark") as T,
);

export const setThemeServerFn = createServerFn({ method: "POST" })
	.inputValidator(postThemeValidator)
	.handler(async ({ data }) => setCookie(storageKey, data));
