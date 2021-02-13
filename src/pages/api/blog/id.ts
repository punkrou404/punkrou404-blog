import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import marked from 'marked';
import path from 'path';
import fs from 'fs';
import { POSTS_PATH } from '~/pages/api/const';
import { BlogError, ContentHeader } from '~/pages/api/types';

interface OutputBody extends ContentHeader {
    id: string;
    contentHtml: string;
    time2FinishReading: number;
}

export const id = async (id: string | string[]): Promise<OutputBody> => {
    console.log(`[getBlogByID] start`);
    console.log(`[getBlogByID]Query parameter validation start`);

    if (!id) {
        throw {
            status: 400,
            message: `Bad Request. "id" is required.`,
        } as BlogError;
    }

    console.log(`[getBlogByID]Query parameter validation end`);
    console.log(`[getBlogByID]Read post content to local file start`);

    const fullPath = path.join(POSTS_PATH, `${id}.md`);
    if (!fs.existsSync(fullPath)) {
        throw {
            status: 404,
            message: `Not found.`,
        } as BlogError;
    }
    const postContent = await fs.readFileSync(fullPath);
    const matterResult = matter(postContent);

    console.log(`[getBlogByID]Read post content to local file end`);
    console.log(`[getBlogByID]Response setting start`);

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

    const res = Object.assign(
        {
            id,
            contentHtml,
            time2FinishReading,
        },
        matterResult.data
    ) as OutputBody;

    console.log(`[getBlogByID]Response setting end`);
    console.log(`[getBlogByID] end`);

    return res;
};
