import { GridIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Section from "@/components/layout/section";
import LoadingScreen from "@/components/loading-screen/loading-screen";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { works } from "@/sections/works/_constants/works";
import WorksCard from "./_components/works-card";

const featuredWorks = works.filter((item) => item.showOnHome);

export default function Works() {
	const [showLoading, setShowLoading] = useState(false);

	const handleVerMas = () => {
		setShowLoading(true);
	};

	return (
		<>
			<Section
				id="works"
				title="Mira algunos proyectos destacados"
				description="Solo Proyecto 1 y Proyecto 3 se muestran en home como destacados. El resto queda disponible en Ver todos los proyectos."
				className="grid grid-cols-1 gap-4"
				badgeText="Proyectos destacados"
				badgeIcon={<GridIcon aria-hidden="true" className="size-3.5" />}
			>
				{featuredWorks.map((item) => (
					<WorksCard
						key={item.title}
						image={item.image}
						title={item.title}
						description={item.description}
						link={item.link}
						textClassName={item.textClassName}
					/>
				))}

				<div className="flex justify-center mt-8">
					<Button
						variant="secondary"
						className="rounded-full gap-2"
						onClick={handleVerMas}
					>
						Ver todos los proyectos
						<Icons.ArrowRight className="w-4 h-4" />
					</Button>
				</div>
			</Section>

			{showLoading && (
				<LoadingScreen
					onComplete={() => setShowLoading(false)}
					targetUrl="/proyectos"
				/>
			)}
		</>
	);
}
