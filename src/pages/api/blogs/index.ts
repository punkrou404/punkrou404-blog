import matter from 'gray-matter';
import { NextApiRequest, NextApiResponse } from 'next';

const PER_PAGE = 5 as const;
const MAX_PAGE = 5 as const;

interface MicrocmsContent {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    body: string;
}

export interface Content {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    summary: string;
    title: string;
    type: string;
    topics: string[];
    published: boolean;
}

export interface GetBlogOutput {
    contents: Content[];
    totalCount: number;
}

const parsedContent = (content: MicrocmsContent) => {
    const matterResult = matter(content.body);
    return {
        id: content.id,
        createdAt: new Date(content.createdAt).toISOString(),
        updatedAt: new Date(content.updatedAt).toISOString(),
        publishedAt: new Date(content.publishedAt).toISOString(),
        revisedAt: new Date(content.publishedAt).toISOString(),
        summary: matterResult.content.substr(0, 200),
        ...(matterResult.data as {
            title: string;
            type: string;
            topics: string[];
            published: boolean;
        }),
    };
};

const getBlog = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(`[getBlog] start`);
    console.log(`[getBlog]Query parameter validation start`);

    const query = new URLSearchParams();
    if (req.query.offset) {
        const offset = Number(req.query.offset);
        console.log(`[getBlog] offset=${offset}`);
        if (isNaN(offset)) {
            res.status(400).json({ message: `Bad Request. "offset" is a number.` });
            return;
        }
        query.append(`offset`, String(offset * PER_PAGE));
        query.append(`limit`, String(MAX_PAGE));
    }

    console.log(`[getBlog]Query parameter validation end`);
    console.log(`[getBlog]External API access start`);

    const urls = `${process.env.MICROCMS_BASEURL}/blog?${query}`;
    console.log(`[getBlog]External API URL=${urls}`);
    const result = await fetch(urls, {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    });
    const blog = await result.json();

    console.log(`[getBlog]External API access end`);
    console.log(`[getBlog]Parsed blog type start`);

    const contents = blog.contents.map((content): Content => parsedContent(content));

    console.log(`[getBlog]Parsed blog type end`);
    console.log(`[getBlog]Response setting start`);

    res.status(200).json({
        contents,
        totalCount: blog.totalCount,
    });

    console.log(`[getBlog]Response setting end`);
    console.log(`[getBlog] end`);
};

export default getBlog;
