import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";
import ContactFormCard from "@/sections/contact/_components/contact-form-card";
import { GridPattern } from "@/sections/contact/_components/grid-pattern";

export default function Contact() {
	return (
		<Section
			id="contact"
			title="Inicia un proyecto o saluda"
			description="Comparte un poco sobre tu idea, tiempos o reto. Diles a los visitantes que tan rapido respondes y que detalles ayudan a contestar mas rapido."
			className="flex justify-center overflow-hidden"
			badgeText="Contacto"
			badgeIcon={<PaperPlaneIcon aria-hidden="true" className="size-3.5" />}
		>
			<ContactFormCard />
			<GridPattern
				squares={[
					[4, 4],
					[5, 1],
					[8, 2],
					[5, 3],
					[5, 5],
					[10, 10],
					[12, 15],
					[15, 10],
					[10, 15],
					[15, 10],
					[10, 15],
					[15, 10],
				]}
				className={cn(
					"mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
					"inset-x-0 inset-y-[-30%] h-[150%] skew-y-12",
				)}
			/>
		</Section>
	);
}
