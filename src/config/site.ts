import type { ComponentType, SVGProps } from "react";
import { GithubIcon, LinkedInIcon } from "@/components/icons/social-icons";

export const appRoutes = {
	home: "/",
	certificates: "/certificados",
	projects: "/proyectos",
} as const;

export const sectionTargets = {
	hero: "#hero",
	services: "#services",
	works: "#works",
	showcase: "#showcase",
	testimonials: "#testimonios",
	faq: "#faq",
	footer: "#footer",
} as const;

export type SectionTarget =
	(typeof sectionTargets)[keyof typeof sectionTargets];

export type AppRoute = (typeof appRoutes)[keyof typeof appRoutes];

export type NavigationTarget = SectionTarget | AppRoute;

export type NavigationLink = {
	label: string;
	target: NavigationTarget;
};

type SocialLink = {
	label: string;
	href: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const primaryNavigation: NavigationLink[] = [
	{ label: "Servicios", target: sectionTargets.services },
	{ label: "Proyectos", target: sectionTargets.works },
	{ label: "Galeria", target: sectionTargets.showcase },
	{ label: "Certificados", target: appRoutes.certificates },
	{ label: "Testimonios", target: sectionTargets.testimonials },
	{ label: "Preguntas", target: sectionTargets.faq },
];

export const siteConfig = {
	name: "Carlos Aguilar",
	role: "WEB DEVELOPER",
	resumeUrl: "/roberto-carlos-aguilar-jimenez-cv.pdf",
	baseUrl:
		"https://my-portfolio-proyect-gulzk2vto-carlagular800-5846s-projects.vercel.app",
	defaultTitle: "Carlos Aguilar - WEB DEVELOPER",
	defaultDescription:
		"Usa este espacio para describir el tipo de trabajo que haces, las industrias que atiendes y lo que hace unico tu enfoque.",
	keywords: [
		"portafolio",
		"freelance",
		"independiente",
		"desarrollador",
		"disenador",
	],
	author: "your-handle",
	email: "hello@vercel.app",
	whatsAppNumber: "3751111294",
	get whatsAppLink() {
		return "https://wa.me/523751111294";
	},
	socialProfiles: [
		"https://github.com/your-handle",
		"https://www.linkedin.com/in/your-profile",
		"https://www.instagram.com/your-handle",
	],
} as const;

export const footerSocialLinks: SocialLink[] = [
	{
		label: "GitHub",
		href: "https://github.com/RCaguilarJ",
		icon: GithubIcon,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/roberto-aguilar-27b2623a4/",
		icon: LinkedInIcon,
	},
];
