// Funciones para manejo de cookies en el cliente (browser)
export function getCookieClient(name: string): string | undefined {
	if (typeof document === "undefined") return undefined;
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? decodeURIComponent(match[2]) : undefined;
}

export function setCookieClient(name: string, value: string, days = 365) {
	if (typeof document === "undefined") return;
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";

const postThemeValidator = z.union([z.literal("light"), z.literal("dark")]);
export type T = z.infer<typeof postThemeValidator>;
const storageKey = "_preferred-theme";

export const getThemeServerFn = createServerFn().handler(
	async () => (getCookie(storageKey) || "dark") as T,
);

export const setThemeServerFn = createServerFn({ method: "POST" })
	.inputValidator(postThemeValidator)
	.handler(async ({ data }) => setCookie(storageKey, data));
