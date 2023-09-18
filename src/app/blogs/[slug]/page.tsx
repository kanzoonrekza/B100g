import React from "react";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";

const queryBlogPage = (uid: string) => {
	const client = createClient();
	return client.getByUID("blogs", uid);
};

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}) {
	const page = await queryBlogPage(params.slug);

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
		openGraph: {
			title: page.data.meta_title,
			description: page.data.meta_description,
			images: prismic.asImageSrc(page.data.meta_image),
		},
	};
}

export default async function BlogPage({
	params,
}: {
	params: { slug: string };
}) {
	const page = await queryBlogPage(params.slug);

	return (
		<main className="grid gap-10 py-24 pt-12">
			<h1 className="max-w-6xl px-6 mx-auto text-4xl font-bold text-center md:text-6xl">
				{page.data.title}
			</h1>
			<PrismicNextImage
				className="object-cover w-full h-40 max-w-6xl mx-auto lg:h-80"
				field={page.data.meta_image}
			></PrismicNextImage>
			<article className="max-w-2xl px-6 mx-auto prose text-white prose-invert prose-a:no-underline">
				<SliceZone slices={page.data.slices} components={components} />
			</article>
		</main>
	);
}
