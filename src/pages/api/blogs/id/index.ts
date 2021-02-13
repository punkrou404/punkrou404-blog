import { NextApiRequest, NextApiResponse } from 'next';
import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import marked from 'marked';

interface MicrocmsContent {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    body: string;
}

const getBlogsByID = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    console.log(`[getBlogsByID] start`);
    console.log(`[getBlogsByID]Query parameter validation start`);

    const id = req.query.id;
    console.log(`[getBlogsByID] id=${id}`);
    if (!id) {
        return res.status(400).json({ message: `Bad Request. "id" is required.` });
    }

    console.log(`[getBlogsByID]Query parameter validation end`);
    console.log(`[getBlogsByID]External API access start`);

    const urls = `${process.env.MICROCMS_BASEURL}/blog/${id}`;
    console.log(`[getBlogsByID]External API URL=${urls}`);
    const result = await fetch(urls, {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    });
    const content: MicrocmsContent = await result.json();

    console.log(`[getBlogsByID]External API access end`);
    console.log(`[getBlogsByID]Response setting start`);

    const date = content.createdAt;
    const matterResult = matter(content.body);
    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const contentHtml = marked(matterResult.content);
    const onlyContentString = /<("[^"]*"|'[^']*'|[^'">])*>/g;
    const time2FinishReading =
        Math.floor(contentHtml.replace(onlyContentString, '').length / 500) || 1;

    res.status(200).json({
        id,
        contentHtml,
        date,
        ...(matterResult.data as {
            title: string;
            type: string;
            topics: string[];
            published: boolean;
        }),
        time2FinishReading,
    });

    console.log(`[getBlogsByID]Response setting end`);
    console.log(`[getBlogsByID] end`);
};

export default getBlogsByID;
