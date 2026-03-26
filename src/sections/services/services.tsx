import { StarIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { serviceFeatures } from "@/sections/services/_constants/services";

import { ServiceCard as Card } from "./_components/service-card";

export default function Services() {
	return (
		<Section
			id="services"
			title="Conocimiento adquirido"
			description="Durante mi trayectoria, he desarrollado habilidades en diversas áreas como 
			desarrollador web, comenzando con wordpress hasta llegar a proyectos full stack
			que resuelven problematicas del día a día, asi como el buen uso de la IA apoyandome
			con cosas puntuales para acelerar el proceso."
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
			badgeText="¿Qué es lo que sé hacer?"
			badgeIcon={<StarIcon aria-hidden="true" />}
		>
			{serviceFeatures.map((feature) => {
				const featureId = `service-title-${feature.name
					.toLowerCase()
					.replace(/\s+/g, "-")}`;

				return (
					<Card key={feature.name} {...feature} aria-labelledby={featureId} />
				);
			})}
		</Section>
	);
}
