"use client";

import {
	ArrowTopRightIcon,
	CopyIcon,
	EnvelopeClosedIcon,
	GitHubLogoIcon,
	LinkedInLogoIcon,
	PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { type SVGProps, useState } from "react";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import { cn } from "@/lib/utils";

const EMAIL_ADDRESS = "carlagular60@gmail.com";
const WHATSAPP_NUMBER = "3751111294";
const WHATSAPP_LINK = "https://wa.me/523751111294";

const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<title>WhatsApp</title>
		<path d="M19.05 4.94A9.83 9.83 0 0 0 12.03 2C6.6 2 2.18 6.42 2.18 11.85c0 1.74.45 3.44 1.31 4.95L2 22l5.36-1.4a9.8 9.8 0 0 0 4.67 1.19h.01c5.43 0 9.85-4.42 9.85-9.85a9.78 9.78 0 0 0-2.84-7ZM12.04 20.1h-.01a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.18.83.85-3.1-.2-.32a8.12 8.12 0 0 1-1.25-4.35c0-4.5 3.66-8.15 8.16-8.15 2.17 0 4.21.85 5.74 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.14 8.15Zm4.47-6.11c-.24-.12-1.4-.69-1.62-.77-.22-.08-.37-.12-.53.12s-.61.77-.75.93c-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.7-.63-1.18-1.4-1.32-1.63-.14-.24-.01-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.41h-.45c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.52.09.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
	</svg>
);

const CONTACT_CHANNELS = [
	{
		label: "LinkedIn",
		value: "/in/roberto-aguilar-27b2623a4",
		href: "https://www.linkedin.com/in/roberto-aguilar-27b2623a4/",
		Icon: LinkedInLogoIcon,
		iconClassName: "text-sky-500 dark:text-sky-300",
	},
	{
		label: "GitHub",
		value: "github.com/RCaguilarJ",
		href: "https://github.com/RCaguilarJ",
		Icon: GitHubLogoIcon,
		iconClassName: "text-foreground",
	},
	{
		label: "WhatsApp",
		value: WHATSAPP_NUMBER,
		href: WHATSAPP_LINK,
		Icon: WhatsAppIcon,
		iconClassName: "text-[#25D366]",
	},
	{
		label: "Correo",
		value: EMAIL_ADDRESS,
		href: `mailto:${EMAIL_ADDRESS}`,
		Icon: EnvelopeClosedIcon,
		iconClassName: "text-violet-500 dark:text-violet-300",
	},
] as const;

export default function Contact() {
	const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
		"idle",
	);

	const handleCopyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL_ADDRESS);
			setCopyState("copied");
		} catch {
			setCopyState("error");
		}

		window.setTimeout(() => {
			setCopyState("idle");
		}, 1800);
	};

	const copyLabel =
		copyState === "copied"
			? "Correo copiado"
			: copyState === "error"
				? "No se pudo copiar"
				: "Copiar correo";

	return (
		<section
			id="contact"
			className="relative w-full overflow-hidden border-border/80 divide-y divide-border/80 divide-dashed"
		>
			<div className="relative isolate overflow-hidden px-4 py-10 md:px-8 md:py-16">
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-card to-background" />
				<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-radial-[circle_at_top] from-gradient-from/18 via-gradient-to/8 to-transparent blur-2xl" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-radial-[circle_at_bottom] from-gradient-to/14 via-gradient-from/8 to-transparent blur-2xl" />

				<div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
					<div className="w-fit">
						<ShinyBadge>
							<PaperPlaneIcon aria-hidden="true" className="size-3.5" />
							Contacto directo
						</ShinyBadge>
					</div>

					<h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
						Hablemos de tu siguiente proyecto
					</h2>

					<p className="max-w-2xl text-balance text-base font-medium leading-relaxed text-foreground/70 md:text-xl">
						Si quieres trabajar conmigo, revisar una idea o simplemente abrir
						conversacion, aqui tienes mis canales directos.
					</p>

					<button
						type="button"
						onClick={handleCopyEmail}
						className="group inline-flex items-center gap-3 rounded-full border border-slate-700/80 bg-[linear-gradient(135deg,#0B121B_0%,#101B29_52%,#162438_100%)] px-6 py-3 text-base font-semibold text-slate-50 shadow-[inset_0_1px_0_0_rgb(255_255_255/.08),0_0_0_1px_rgba(255,255,255,0.04),0_18px_42px_-24px_rgba(11,18,27,0.95)] transition-[transform,box-shadow,filter] duration-200 ease-out-quad hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
					>
						{copyLabel}
						<CopyIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
					</button>
				</div>
			</div>

			<div className="px-4 py-8 md:px-8 md:py-10">
				<div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
					{CONTACT_CHANNELS.map(({ label, href, Icon, iconClassName }) => (
						<a
							key={label}
							href={href}
							target={href.startsWith("mailto:") ? undefined : "_blank"}
							rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
							className="group relative overflow-hidden rounded-[2rem] border border-slate-700/80 bg-[linear-gradient(145deg,#0B121B_0%,#101926_46%,#152233_100%)] p-5 text-left text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_18px_38px_-26px_rgba(11,18,27,0.9)] transition-[transform,border-color,box-shadow,filter] duration-200 ease-out-quad hover:-translate-y-1 hover:border-slate-500/80 hover:brightness-110 hover:shadow-lg"
						>
							<div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/18 to-transparent" />
							<div className="flex items-start justify-between gap-4">
								<span className="flex size-12 items-center justify-center rounded-2xl border border-white/8 bg-white/4 shadow-inner">
									<Icon
										className={cn("size-5", iconClassName)}
										aria-hidden="true"
									/>
								</span>
								<ArrowTopRightIcon className="mt-1 size-4 text-slate-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-50" />
							</div>

							<div className="mt-14 flex flex-col gap-2">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
									{label}
								</p>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
