import { BlogError } from '~/pages/api/types';
import { MAX_DIPLAY_POST as MAX_DISPLAY_POST, POSTS_PATH } from '~/pages/api/const';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const offset = async (
    offset: string | string[]
): Promise<{
    contents: ({ id: string; summary: string } & { [key: string]: any })[];
    totalCount: number;
}> => {
    console.log(`[offset] start`);
    console.log(`[offset]Query parameter validation start`);

    console.log(`[offset] offset=${offset}`);
    const postIndex = Number(offset) - 1;
    if (isNaN(postIndex) || postIndex < 0) {
        throw {
            status: 400,
            message: `Bad Request. "offset" is a positive integer.`,
        } as BlogError;
    }

    console.log(`[offset]Query parameter validation end`);
    console.log(`[offset]Get metadata to display on the page start`);

    const end = MAX_DISPLAY_POST + postIndex;
    const fileNames = fs.readdirSync(POSTS_PATH).filter((e) => /\.md$/.test(e));
    const totalCount = fileNames.length;
    const contents = fileNames
        .filter((_, i) => postIndex <= i && i < end)
        .map((e) => {
            const fullPath = path.join(POSTS_PATH, e);
            const postContent = fs.readFileSync(fullPath);
            const matterResult = matter(postContent);
            const id = e.replace(/\.md$/, '');
            const summary = matterResult.content.substr(0, 200);
            const res = Object.assign(
                {
                    id,
                    summary,
                },
                matterResult.data
            );
            return res;
        });

    console.log(`[offset]Get metadata to display on the page end`);
    console.log(`[offset] end`);

    return {
        contents,
        totalCount,
    };
};
