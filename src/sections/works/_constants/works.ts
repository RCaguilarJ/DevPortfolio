export interface WorksItem {
	image: string;
	title: string;
	description: string;
	link: string;
	showOnHome?: boolean;
	textClassName?: string;
}

export const works: WorksItem[] = [
	{
		image: "/2.png",
		title: "Proyecto 1",
		description:
			"Sistema de gestion medica para el seguimiento de pacientes del sector salud. Demo: admin@admin.com / admin123.",
		link: "https://amdj.desingsgdl.app/login",
		showOnHome: true,
	},
	{
		image: "/mockup2.png",
		title: "Proyecto 2",
		description:
			"App para agendar citas conectada con el sistema medico. Se aprecia mejor en una ventana tipo celular o directamente desde un movil.",
		link: "https://app.desingsgdl.app/views/login.php",
		textClassName: "text-black",
	},
	{
		image: "/project3.png",
		title: "Proyecto 3",
		description:
			"Landing y plataforma de BrandUp Network desplegada en Vercel.",
		link: "https://brandup-network-proyect.vercel.app/",
		showOnHome: true,
	},
	{
		image: "/port.png",
		title: "Port",
		description: "Imagen agregada para la vista completa de proyectos.",
		link: "https://brandup-network-proyect.vercel.app/",
		showOnHome: false,
	},
];
