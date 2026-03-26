import { useQuery } from "@tanstack/react-query";
import { getAllPostsMeta, type PostMeta } from "@/lib/posts";
import Blog from "@/sections/blog/blog";
import FAQ from "@/sections/faq/faq";
import Footer from "@/sections/footer/footer";
import ParallaxBanner from "@/sections/parallax-banner/parallax-banner";
import Services from "@/sections/services/services";
import Showcase from "@/sections/showcase/showcase";
import Testimonials from "@/sections/testimonials/testimonials";
import Works from "@/sections/works/works";

export default function HomePage() {
	const { data: posts = [] } = useQuery<PostMeta[]>({
		queryKey: ["posts"],
		queryFn: getAllPostsMeta,
	});

	return (
		<main className="flex flex-col items-stretch justify-start w-full divide-y divide-border/80">
			<ParallaxBanner />
			<Services />
			<Works />
			<Showcase />
			<Testimonials />
			<FAQ />
			{/* TODO: Seccion de blog en pausa */}
			{/* <Blog posts={posts} /> */}
			<Footer />
		</main>
	);
}
