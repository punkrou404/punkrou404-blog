import { DOWNLOAD_POST_LIMIT } from '~/pages/api/const';
import matter from 'gray-matter';
import { Content, MicrocmsContent } from '~/pages/api/types';

export const getAllContents = async (): Promise<Content[]> => {
    console.log(`[getAllContents] start`);
    console.log(`[getAllContents]Get Total PostCount API access start`);

    const header = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };
    const firstUrls = `${process.env.MICROCMS_BASEURL}/blog`;

    const firstRes = await fetch(firstUrls, header);
    const json = await firstRes.json();
    const totalCount = json.totalCount;

    console.log(`[getAllContents]Get Total PostCount API access end`);
    console.log(`[getAllContents]Get All Post API access start`);

    console.log(
        `[getAllContents] For the acquisition limit is 5MB, so I want to loop to some extent to prevent errors.`
    );
    console.log(`[getAllContents] @ref https://document.microcms.io/content-api/get-list-contents`);

    const totalPageCount = Math.ceil(totalCount / DOWNLOAD_POST_LIMIT);
    const results = await [...Array(totalPageCount)]
        .map(async (_, i) => {
            console.log(`[getAllContents]API request count: ${i + 1}/${totalPageCount}`);
            const query = new URLSearchParams({
                offset: String(DOWNLOAD_POST_LIMIT * i),
                limit: String(DOWNLOAD_POST_LIMIT),
            });
            const urls = `${process.env.MICROCMS_BASEURL}/blog?${query}`;

            console.log(`[getAllContents]API urls: ${urls}`);
            const result = await fetch(urls, header);
            const json = await result.json();
            return json.contents as MicrocmsContent[];
        })
        .reduce(async (c, p): Promise<MicrocmsContent[]> => (await c).concat(p));

    console.log(`[getAllContents]Get All Post API access end`);
    console.log(`[getAllContents]Convert post types start`);

    const contents = results.map((r) => {
        const matterResult = matter(r.body);
        const { id, createdAt, updatedAt, publishedAt, revisedAt } = r;
        const { title, topics, published } = matterResult.data;
        const body = matterResult.content;
        const summary = body.substr(0, 200);
        return {
            id,
            summary,
            body,
            title,
            topics,
            published,
            createdAt,
            updatedAt,
            publishedAt,
            revisedAt,
        } as Content;
    });

    console.log(`[getAllContents]Convert post types end`);
    console.log(`[getAllContents] end`);

    return contents;
};
