import Contact from "@/sections/contact/contact";
import FAQ from "@/sections/faq/faq";
import Footer from "@/sections/footer/footer";
import ParallaxBanner from "@/sections/parallax-banner/parallax-banner";
import Resume from "@/sections/resume/resume";
import Services from "@/sections/services/services";
import Showcase from "@/sections/showcase/showcase";
import Testimonials from "@/sections/testimonials/testimonials";
import Works from "@/sections/works/works";

export default function HomePage() {
	return (
		<main className="flex flex-col items-stretch justify-start w-full divide-y divide-border/80">
			<ParallaxBanner />
			<Resume />
			<Services />
			<Works />
			<Showcase />
			<Testimonials />
			<FAQ />
			<Contact />
			{/* TODO: Seccion de blog en pausa */}
			<Footer />
		</main>
	);
}
