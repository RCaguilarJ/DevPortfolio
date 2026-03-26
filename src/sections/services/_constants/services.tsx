import {
	FigmaLogoIcon,
	FileIcon,
	FilePlusIcon,
	FileTextIcon,
	GitHubLogoIcon,
	PersonIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { CleanCodeCardContent } from "@/sections/services/_components/clean-code-card-content";
import {
	ConvertingCardContent,
	type ConvertingCardIconSet,
} from "@/sections/services/_components/converting-card-content";
import { ServicesCardContent } from "@/sections/services/_components/services-card-content";

export interface ServiceItem {
	name: string;
	description: string;
}

export interface ServiceFeature {
	name: string;
	description: string;
	href: string;
	className: string;
	background: ReactNode;
}

const convertingCardIcons: ConvertingCardIconSet = {
	destination: {
		id: "client",
		Icon: PersonIcon,
	},
	hub: {
		id: "handoff",
		Icon: FigmaLogoIcon,
	},
	sources: [
		{
			id: "brief",
			Icon: FileTextIcon,
		},
		{
			id: "spec",
			Icon: FilePlusIcon,
		},
		{
			id: "assets",
			Icon: FileIcon,
		},
		{
			id: "repo",
			Icon: GitHubLogoIcon,
		},
	],
};

export const serviceItems: ServiceItem[] = [
	{
		name: "Wordpress",
		description:
			"Diseño y desarrollo de páginas web implementadas para PYMES y macro negocios.",
	},
	{
		name: "Figma",
		description:
			"Diseño de interfaces UX/UI, prototipo de entrega para muestra al cliente, branding para página web personalizada.",
	},
	{
		name: "Javascript ( y sus frameworks",
		description:
			"Orquestando un SaaS para la gestion de un sistema enfocado para el entorno médico, con el uso de react como front y node.js como back y mongo.DB para la base de datos.",
	},
	{
		name: "PHP",
		description:
			"Creación de onepages, landingpages y plugins personalizados para el cliente en páginas creadas con wordpress.",
	},
	{
		name: "Terminal",
		description:
			"Despliegue de los proyectos para el entorno de producción desde la terminal de CPanel para el servidor del cliente.",
	},
	{
		name: "Pase de optimizacion",
		description:
			"Auditorias de rendimiento, accesibilidad o UX que mantengan el trabajo pulido.",
	},
	{
		name: "Auditoria de sistemas",
		description:
			"Revisiones de plataforma, migracion de stack o modernizacion que mantengan a los equipos listos para escalar.",
	},
];

export const bestPractices: ServiceItem[] = [
	{
		name: "Principio 01 - Liderar con resultados",
		description:
			"Al coordinar un equipo en un proyecto extenso donde se involucran diseñadores gráficos, especialistas en figma, front y back engineer suelo usar herramientas como JIRA o TRELLO para llevar un control con y resultados del avance del mismo.Oportunidad que se me dió por unica vez y fui reconocido por mi desempeño.",
	},
	{
		name: "Principio 02 - Apegarme al diseño y cronograma",
		description:
			"Los tiempos y el resultado del proyecto son fundamentales para cumplir con las expectativas del cliente y mantener la calidad dandonos a distinguir de las demas empresas.",
	},
	{
		name: "Herramientas de despliegue ",
		description:
			"Cuando el área de DevOps se atrasa pero necesitas ver en producción los resultados y el flujo de tu proyecto, me vi en la necesidad de buscar alternativas como vercel y ngrok para asegurarme de que el flujo fuera el correcto antes de lanzarlo a las primeras etapas de producción.",
	},
	{
		name: "Principio 04 - Prototipar temprano",
		description:
			"Desde que mandan el Figma, comienzo a prototipar para validar ideas y obtener feedback rápido y acelerar de manera eficiente el proyecto.",
	},
	{
		name: "Principio 05 - Cuidar los detalles",
		description:
			"Los detalles son fundamentales para garantizar la calidad y la satisfacción del cliente, incluso los que él mismo no nota; asi como una buena estructura en la base de datos o las buenas prácticas del código ya sea del front o del back y estas son de las cosas que más me obsecionan.",
	},
	{
		name: "Principio 06 - Construir para el cambio",
		description:
			"Siempre hay  que mantiener la arquitectura flexible y escalable, lista para el futuro y preparada para lo que pida la V2.",
	},
	{
		name: "Principio 07 - Documentar el camino",
		description:
			"Documentar y describir cada paso que das son de las cosas más esenciales en este rubro, ya que de esa manera se facilita la colaboración y el mantenimiento a largo plazo.",
	},
	{
		name: "Principio 08 - Probar sin descanso",
		description:
			"Hace pruebas exhaustivas para asegurar la calidad y funcionalidad del producto antes de su lanzamiento es lo que garantiza el éxito del proyecto.",
	},
	{
		name: "Principio 09 - Colaborar abiertamente",
		description:
			"Siempre me a gustado apoyar a miembros de mi equipo explicando cosas que me pidan que les explique de la manera que a mí me hubiera gustado que lo hicieran.",
	},
	{
		name: "Principio 10 - Iterar despues del lanzamiento",
		description:
			"Mantenerce cerca de analiticas, feedback de usuarios o datos de retencion son esenciales para planear el siguiente release y llenar las expectivas tanto del cliente como del usuario.",
	},
];

export const serviceFeatures: ServiceFeature[] = [
       {
	       name: "Stack's",
	       description:
		       "Lo que eh aprendido con el tiempo creando proyectos desde cero tanto en desarrollo como en wordpress.",
	       href: "#",
	       className: "col-span-1",
	       background: <ServicesCardContent items={serviceItems} delay={4500} maxVisible={6} />,
       },
       {
	       name: "De diseno a desarrollo",
	       description:
		       "Replicamos el diseño de fgma, analizo las herramientas necesarias y escalables a utilizar, se empieza a codificar, creamos repositorios para pruebas locales y posteriormente se despliega en producción.",
	       href: "#",
	       className: "col-span-1",
	       background: <ConvertingCardContent icons={convertingCardIcons} />,
       },
       {
	       name: "Estandares de codigo",
	       description:
		       "Valores de ingenieria, rituales de revision o lineamientos que mantienen mi trabajo sostenible.",
	       href: "#",
	       className: "col-span-1",
	       background: <CleanCodeCardContent items={bestPractices} />,
       },
];
