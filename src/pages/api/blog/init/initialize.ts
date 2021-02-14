import path from 'path';
import fs from 'fs';
import { DOWNLOAD_POST_LIMIT, POSTS_PATH } from '~/pages/api/const';
import matter from 'gray-matter';
import { BlogError, ContentHeader, MicrocmsContent } from '~/pages/api/types';

interface OutputInitialize {
    totalCount: number;
    totalPageCount: number;
}

export const initialize = async (): Promise<OutputInitialize> => {
    console.log(`[initialize] start`);
    console.log(`[initialize]First API access start`);

    const header = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };
    const firstUrls = `${process.env.MICROCMS_BASEURL}/blog`;

    const firstRes = await fetch(firstUrls, header);
    const json = await firstRes.json();
    const totalCount = json.totalCount;

    console.log(`[initialize]First API access end`);
    console.log(`[initialize]Write all post to local file start`);

    const totalPageCount = Math.ceil(totalCount / DOWNLOAD_POST_LIMIT);
    await [...Array(totalPageCount)].forEach(async (_, i) => {
        console.log(`[initialize]API request count: ${i + 1}/${totalPageCount}`);
        const query = new URLSearchParams({
            offset: String(DOWNLOAD_POST_LIMIT * i),
            limit: String(DOWNLOAD_POST_LIMIT),
        });
        const urls = `${process.env.MICROCMS_BASEURL}/blog?${query}`;

        console.log(`[initialize]API urls: ${urls}`);
        const result = await fetch(urls, header);
        const json = await result.json();

        console.log(`[initialize]Write per file start`);

        json.contents.forEach((c: MicrocmsContent): void => {
            // 1. API result Header
            // 2. Meta information in Body of API result
            // Combine the above and write to a file
            const postPath = path.join(POSTS_PATH, `${c.id}.md`);
            const matterResult = matter(c.body);
            const { createdAt, updatedAt, publishedAt, revisedAt } = c;
            const { title, type, topics, published } = matterResult.data;
            const header: ContentHeader = {
                title,
                type,
                topics,
                published,
                createdAt,
                updatedAt,
                publishedAt,
                revisedAt,
            };
            const body = matter.stringify(matterResult.content, header);
            try {
                fs.writeFileSync(postPath, body);
            } catch (e) {
                console.error(e);
                throw {
                    status: 500,
                    message: `Server Error.`,
                } as BlogError;
            }
        });

        console.log(`[initialize]Write per file end`);
    });

    console.log(`[initialize]Write all post to local file end`);
    console.log(`[initialize]Response setting start`);

    const res = {
        totalCount,
        totalPageCount,
    } as OutputInitialize;

    console.log(`[initialize]Response setting end`);
    console.log(`[initialize] end`);

    return res;
};
