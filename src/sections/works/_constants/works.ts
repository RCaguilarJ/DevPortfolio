export interface WorksItem {
	image: string;
	title: string;
	description: string;
	link: string;
	textClassName?: string;
}

export const works: WorksItem[] = [
	{
		image: "/2.png",
		title: "Proyecto 1",
		description:
			"Sisteme de gestión médica para casos clínicos de los pacientes para el sector salud Para entrar el usuario es admin@admin.com y la contrasena admin123.",
		link: "https://amdj.desingsgdl.app/login",
	},
	{
		image: "/mockup2.png",
		title: "Proyecto 2",
		description:
			"App para agendar las citas y se reflejen en el sistema médico. favor de abrir en una ventana pequeña que simule el tamaño de un celular o en su defecto desde un celular",
		link: "https://app.desingsgdl.app/views/login.php",
		textClassName: "text-black",
	},
];
