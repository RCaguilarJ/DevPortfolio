import type { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { EyeLogoIcon } from "@/components/icons/eye-logo-icon";
import { useLenis } from "@/lib/lenis-context";
import {
	footerLinks,
	footerSocialLinks,
} from "@/sections/footer/_constants/footer";

const WHATSAPP_NUMBER = "3751111294";
const WHATSAPP_LINK = "https://wa.me/523751111294";

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const { scrollTo } = useLenis();
	const location = useLocation();
	const navigate = useNavigate();

	const handleNavigationClick = (
		event: MouseEvent<HTMLAnchorElement>,
		target: string,
	) => {
		event.preventDefault();
		if (target.startsWith("#")) {
			if (location.pathname === "/") {
				scrollTo(target);
				window.history.replaceState(null, "", target);
				return;
			}

			navigate(`/${target}`);
			return;
		}

		navigate(target);
	};

	return (
		<footer id="footer" className="w-full">
			<div className="w-full mx-auto grid gap-8 px-4 py-8 md:p-8 md:grid-cols-[minmax(0,1fr)_120px] border-border/80 border-x border-dashed">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<div className="flex gap-2 items-center text-foreground">
							<EyeLogoIcon className="size-4" />
							<p className="text-sm font-medium">Carlos Aguilar</p>
						</div>
						<p className="text-xs text-foreground/70 leading-relaxed max-w-xs"></p>
					</div>

					<div className="flex items-center gap-3">
						{footerSocialLinks.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noreferrer"
								aria-label={label}
								className="group flex size-6 rounded items-center justify-center text-foreground/70 hover:text-foreground transition-[color,shadow] duration-100 ease-out-quad focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
							>
								<Icon aria-hidden="true" />
							</a>
						))}
					</div>

					<a
						href={WHATSAPP_LINK}
						target="_blank"
						rel="noreferrer"
						aria-label={`Abrir WhatsApp al ${WHATSAPP_NUMBER}`}
						className="group inline-flex w-fit items-center gap-3 rounded-full border border-border/80 bg-card-muted/70 px-3 py-2 text-sm text-foreground/80 transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quad hover:border-border hover:bg-card hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
					>
						<span className="flex size-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M19.05 4.94A9.83 9.83 0 0 0 12.03 2C6.6 2 2.18 6.42 2.18 11.85c0 1.74.45 3.44 1.31 4.95L2 22l5.36-1.4a9.8 9.8 0 0 0 4.67 1.19h.01c5.43 0 9.85-4.42 9.85-9.85a9.78 9.78 0 0 0-2.84-7ZM12.04 20.1h-.01a8.14 8.14 0 0 1-4.15-1.13l-.3-.18-3.18.83.85-3.1-.2-.32a8.12 8.12 0 0 1-1.25-4.35c0-4.5 3.66-8.15 8.16-8.15 2.17 0 4.21.85 5.74 2.38a8.08 8.08 0 0 1 2.38 5.76c0 4.49-3.66 8.15-8.14 8.15Zm4.47-6.11c-.24-.12-1.4-.69-1.62-.77-.22-.08-.37-.12-.53.12s-.61.77-.75.93c-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.7-.63-1.18-1.4-1.32-1.63-.14-.24-.01-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.28-.73-1.75-.19-.46-.38-.4-.53-.41h-.45c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.31.98 2.47c.12.16 1.69 2.58 4.09 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.52.09.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z" />
							</svg>
						</span>
						<span className="flex flex-col leading-tight">
							<span className="text-[11px] uppercase tracking-[0.18em] text-foreground/50">
								WhatsApp
							</span>
							<span className="font-medium text-foreground">
								{WHATSAPP_NUMBER}
							</span>
						</span>
					</a>
				</div>

				<div className="flex flex-col gap-2">
					<p className="text-xs text-foreground">Navegacion</p>
					<ul className="space-y-2 text-xs text-foreground/70">
						{footerLinks.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									onClick={(event) => handleNavigationClick(event, link.href)}
									className="hover:text-foreground rounded transition-[color,shadow] duration-100 ease-out-quad focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="text-xs text-foreground/70 border-t border-border/80">
				<div className="w-full mx-auto flex flex-col md:flex-row gap-1 px-4 py-4 md:px-2 items-center justify-between">
					<p>(c) {currentYear} Carlos Aguilar.</p>
					<p></p>
				</div>
			</div>
		</footer>
	);
}
