import { GridIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { works } from "@/sections/works/_constants/works";
import WorksCard from "./_components/works-card";

export default function Works() {
	return (
		<Section
			id="works"
			title="Mira algunos proyectos destacados"
			description="Sustituye por casos reales que muestren tu rango - desde productos hasta experimentos creativos."
			className="grid grid-cols-1 gap-4"
			badgeText="Proyectos destacados"
			badgeIcon={<GridIcon aria-hidden="true" className="size-3.5" />}
		>
			{works.map((item) => (
				<WorksCard
					key={item.title}
					image={item.image}
					title={item.title}
					description={item.description}
					link={item.link}
					textClassName={item.textClassName}
				/>
			))}
		</Section>
	);
}
