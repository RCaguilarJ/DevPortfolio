import { allPosts } from "content-collections";

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	excerpt?: string;
	tags?: string[];
	readingTime: string;
};

function calculateReadingTime(text: string): string {
	const wordsPerMinute = 200;
	const words = text.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);
	if (minutes < 1) return "less than 1 min read";
	return `${minutes} min read`;
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
	return allPosts
		.map((post) => {
			const content = post.content ?? "";
			const slug = post._meta.path.replace(/\.mdx$/, "") ?? post._meta.path;

			return {
				slug,
				title: post.title ?? slug,
				date: post.date ?? "",
				excerpt: post.excerpt ?? "",
				tags: post.tags ?? [],
				readingTime: calculateReadingTime(content),
			} satisfies PostMeta;
		})
		.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
