import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	type FaqItem,
	faqItems,
	faqItemsMobile,
} from "@/sections/faq/_constants/faq";

const renderAccordion = (items: FaqItem[], prefix: string) => (
	<Accordion variant="card" type="single" size="md">
		{items.map((item, index) => {
			const value = `${prefix}-${index}`;

			return (
				<AccordionItem key={value} value={value}>
					<AccordionTrigger>{item.question}</AccordionTrigger>
					<AccordionContent>{item.answer}</AccordionContent>
				</AccordionItem>
			);
		})}
	</Accordion>
);

export default function FAQ() {
	return (
		<Section
			id="faq"
			title="Preguntas frecuentes"
			description="Aquí puedo explicarte un poco sobre tiempos y estilo de colaboracion para que conozcas un poco sobre mi."
			className="flex flex-col gap-6"
			badgeText="FAQ"
			badgeIcon={
				<QuestionMarkCircledIcon aria-hidden="true" className="size-3.5" />
			}
		>
			<div className="hidden md:block">
				{renderAccordion(faqItems, "desktop")}
			</div>
			<div className="md:hidden">
				{renderAccordion(faqItemsMobile, "mobile")}
			</div>
		</Section>
	);
}
