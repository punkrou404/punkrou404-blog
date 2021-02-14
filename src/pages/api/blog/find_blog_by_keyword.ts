import { BlogError } from '~/pages/api/types';
import { POSTS_PATH } from '~/pages/api/const';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface InputFindBlogByKeyword {
    keyword: string | string[];
}

interface OutputFindBlogByKeyword {
    contents: ({ id: string; summary: string } & { [key: string]: any })[];
    totalCount: number;
}

export const findBlogByKeyword = async ({
    keyword,
}: InputFindBlogByKeyword): Promise<OutputFindBlogByKeyword> => {
    console.log(`[findBlogByKeyword] start`);
    console.log(`[findBlogByKeyword]Query parameter validation start`);

    console.log(`[findBlogByKeyword] keyword=${keyword}`);
    if (!keyword) {
        throw {
            status: 400,
            message: `Bad Request. "keyword" is required. keyword: ${keyword}`,
        } as BlogError;
    }

    console.log(`[findBlogByKeyword]Query parameter validation end`);
    console.log(`[findBlogByKeyword]Get metadata to display on the page start`);

    const contents = fs
        .readdirSync(POSTS_PATH)
        .filter((e) => /\.md$/.test(e))
        .map((e) => {
            const fileContent = fs.readFileSync(path.join(POSTS_PATH, e));
            const id = e.replace(/\.md$/, '');
            const approximation = matter(fileContent).content.indexOf(`${keyword}`);
            return {
                fileContent,
                id,
                approximation,
            };
        })
        .filter((e) => e.approximation != -1)
        .map((e) => {
            const matterResult = matter(e.fileContent);
            const summary = matterResult.content.substr(0, 200);
            const id = e.id;
            const res = Object.assign(
                {
                    id,
                    summary,
                },
                matterResult.data
            );
            return res;
        });
    const totalCount = contents.length;

    console.log(`[findBlogByKeyword]Get metadata to display on the page end`);
    console.log(`[findBlogByKeyword] end`);

    return {
        contents,
        totalCount,
    };
};
