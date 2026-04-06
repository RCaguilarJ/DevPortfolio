import { siteConfig } from "@/config/site";

type MetaTag = {
	charSet?: string;
	name?: string;
	content?: string;
	property?: string;
	title?: string;
};

type LinkTag = {
	rel: string;
	href: string;
	as?: string;
	type?: string;
	sizes?: string;
	media?: string;
};

type ScriptTag = {
	type?: string;
	children?: string;
	src?: string;
	defer?: boolean;
	async?: boolean;
};

export type HeadTags = {
	meta?: MetaTag[];
	links?: LinkTag[];
	scripts?: ScriptTag[];
};

export type BlogSeoPayload = {
	slug: string;
	title: string;
	excerpt?: string;
	tags?: string[];
	date?: string;
};

export const absoluteUrl = (path = "/") => {
	if (!path) return siteConfig.baseUrl;
	if (path.startsWith("http://") || path.startsWith("https://")) {
		return path;
	}
	return new URL(path, siteConfig.baseUrl).toString();
};

const DEFAULT_IMAGE = absoluteUrl("/og-image.jpg");
const DEFAULT_LOGO = absoluteUrl("/favicon.svg?v=20260405b");

export const siteMetadata = {
	siteName: siteConfig.name,
	baseUrl: siteConfig.baseUrl,
	defaultTitle: siteConfig.defaultTitle,
	defaultDescription: siteConfig.defaultDescription,
	keywords: siteConfig.keywords,
	author: siteConfig.author,
	email: siteConfig.email,
	socialProfiles: siteConfig.socialProfiles,
	defaultOgImage: DEFAULT_IMAGE,
};

const defaultJsonLd = {
	"@context": "https://schema.org",
	"@type": "ProfessionalService",
	name: siteConfig.defaultTitle,
	image: DEFAULT_IMAGE,
	url: absoluteUrl("/"),
	description: siteConfig.defaultDescription,
	address: {
		"@type": "PostalAddress",
		addressCountry: "Worldwide",
	},
	email: siteConfig.email,
	sameAs: siteConfig.socialProfiles,
	offers: {
		"@type": "Offer",
		name: "Tu oferta de servicios",
		description:
			"Describe los servicios que ofreces, las herramientas con las que trabajas o los problemas que resuelves.",
	},
	knowsAbout: [
		"Sistemas de diseno",
		"Diseno de interfaces",
		"Desarrollo web",
		"Programacion creativa",
	],
};

export function getRootSeo(): HeadTags {
	const canonical = absoluteUrl("/");
	const meta: MetaTag[] = [
		{ charSet: "utf-8" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ title: siteConfig.defaultTitle },
		{ name: "description", content: siteConfig.defaultDescription },
		{ name: "keywords", content: siteConfig.keywords.join(", ") },
		{ name: "author", content: siteConfig.author },
		{ name: "robots", content: "index,follow" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: siteConfig.name },
		{ property: "og:url", content: canonical },
		{ property: "og:title", content: siteConfig.defaultTitle },
		{
			property: "og:description",
			content: siteConfig.defaultDescription,
		},
		{ property: "og:image", content: DEFAULT_IMAGE },
		{ name: "twitter:card", content: "summary_large_image" },
		{ property: "twitter:url", content: canonical },
		{ property: "twitter:title", content: siteConfig.defaultTitle },
		{
			property: "twitter:description",
			content: siteConfig.defaultDescription,
		},
		{ property: "twitter:image", content: DEFAULT_IMAGE },
	];

	const links: LinkTag[] = [
		{ rel: "canonical", href: canonical },
		{
			rel: "icon",
			href: "/favicon.svg?v=20260405b",
			type: "image/svg+xml",
			sizes: "any",
		},
		{ rel: "icon", href: "/favicon.ico?v=20260405b", sizes: "any" },
		{
			rel: "icon",
			href: "/favicon-96x96.png?v=20260405b",
			type: "image/png",
			sizes: "96x96",
		},
		{
			rel: "apple-touch-icon",
			href: "/apple-touch-icon.png?v=20260405b",
		},
		{ rel: "manifest", href: "/site.webmanifest?v=20260405b" },
	];

	const scripts: ScriptTag[] = [
		{
			type: "application/ld+json",
			children: JSON.stringify(defaultJsonLd),
		},
	];

	return { meta, links, scripts };
}

const getIsoDate = (input?: string) => {
	if (!input) return undefined;
	const parsed = new Date(input);
	if (Number.isNaN(parsed.getTime())) return undefined;
	return parsed.toISOString();
};

export function getBlogPostSeo(post: BlogSeoPayload): HeadTags {
	const canonical = absoluteUrl(`/blog/${post.slug}`);
	const description = post.excerpt?.trim() || siteConfig.defaultDescription;
	const keywords =
		post.tags && post.tags.length > 0
			? post.tags.join(", ")
			: siteConfig.keywords.join(", ");
	const isoDate = getIsoDate(post.date);

	const meta: MetaTag[] = [
		{ title: `${post.title} | Blog de portafolio` },
		{ name: "description", content: description },
		{ name: "author", content: siteConfig.author },
		{ name: "keywords", content: keywords },
		{ property: "og:type", content: "article" },
		{ property: "og:site_name", content: siteConfig.name },
		{ property: "og:url", content: canonical },
		{ property: "og:title", content: post.title },
		{
			property: "og:description",
			content: description,
		},
		{ property: "og:image", content: DEFAULT_IMAGE },
		{ property: "twitter:card", content: "summary_large_image" },
		{ property: "twitter:url", content: canonical },
		{ property: "twitter:title", content: post.title },
		{
			property: "twitter:description",
			content: description,
		},
		{ property: "twitter:image", content: DEFAULT_IMAGE },
	];

	if (isoDate) {
		meta.push(
			{ property: "article:published_time", content: isoDate },
			{ property: "article:modified_time", content: isoDate },
		);
	}

	(post.tags ?? []).forEach((tag) => {
		if (tag && tag.trim().length > 0) {
			meta.push({ property: "article:tag", content: tag });
		}
	});

	const blogJsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": canonical,
		},
		headline: post.title,
		description,
		image: DEFAULT_IMAGE,
		datePublished: isoDate,
		dateModified: isoDate,
		author: {
			"@type": "Person",
			name: siteConfig.author,
		},
		publisher: {
			"@type": "Organization",
			name: siteConfig.name,
			logo: {
				"@type": "ImageObject",
				url: DEFAULT_LOGO,
			},
		},
		keywords:
			post.tags && post.tags.length > 0 ? post.tags.join(", ") : undefined,
	};

	const links: LinkTag[] = [{ rel: "canonical", href: canonical }];
	const scripts: ScriptTag[] = [
		{
			type: "application/ld+json",
			children: JSON.stringify(blogJsonLd),
		},
	];

	return { meta, links, scripts };
}
