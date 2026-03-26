export type ShowcaseHighlight = {
	title: string;
	description: string;
	src: string;
	poster: string;
	className?: string;
	mediaClassName?: string;
	projectUrl?: string;
};

export const showcaseHighlights: ShowcaseHighlight[] = [
	{
		title: "CRM mobile – interacción",
		description: "Flujo de autenticación y dashboard en móvil.",
		src: "/asociaCRMmockMobile.mp4",
		poster: "/Free mockup iPhone 15@1-1280x559.jpg",
		className: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
	},
	{
		title: "Apps GDL - mockup",
		description: "Preview de navegacion y pantallas clave.",
		src: "/AppsGDLmockup.mp4",
		poster: "/mockup2.png",
		className:
			"md:col-span-1 md:row-span-1 md:col-start-3 md:row-start-1 lg:col-span-2 lg:row-span-1 lg:col-start-3 lg:row-start-1",
	},
	{
		title: "",
		description: "",
		src: "",
		poster: "/1.png",
		className:
			"md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2",
		mediaClassName: "object-contain",
	},
	{
		title: "",
		description: "",
		src: "",
		poster:
			"/Minimalist Website Launch Computer Mockup Instagram Post.png",
		className:
			"md:col-span-2 md:row-span-2 md:col-start-2 md:row-start-3 lg:col-span-2 lg:row-span-3 lg:col-start-3 lg:row-start-2",
		mediaClassName: "object-contain",
	},
	{
		title: "",
		description: "",
		src: "",
		poster: "/logotipoEspecias.png",
		className:
			"md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-4 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-4",
	},
	{
		title: "",
		description: "",
		src: "",
		poster: "/Los mejores aromas.png",
		className:
			"md:col-span-1 md:row-span-1 md:col-start-1 md:row-start-3 lg:col-span-2 lg:row-span-1 lg:col-start-1 lg:row-start-3",
	},
];

