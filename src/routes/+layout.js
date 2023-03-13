export const prerender = true;
import { client } from "$lib/graphql-client";
import { pagesQuery, categoriesQuery, sectionsQuery } from "$lib/graphql-queries";

export const load = async ({ params }) => {
	const { pages } = await client.request(pagesQuery);
	const { categories} = await client.request(categoriesQuery);
	const { sections} = await client.request(sectionsQuery);

	return {
		pages,categories, sections
	};
};
