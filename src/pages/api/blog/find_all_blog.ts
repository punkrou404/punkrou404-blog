import { POSTS_PATH } from '~/pages/api/const';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface OutputFindAllBlog {
    contents: ({ id: string; summary: string } & { [key: string]: any })[];
    totalCount: number;
}

export const findAllBlog = async (): Promise<OutputFindAllBlog> => {
    console.log(`[findAllBlog] start`);
    console.log(`[findAllBlog]Get metadata to display on the page start`);

    const fileNames = fs.readdirSync(POSTS_PATH).filter((e) => /\.md$/.test(e));
    const totalCount = fileNames.length;
    const contents = fileNames.map((e) => {
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

    console.log(`[findAllBlog]Get metadata to display on the page end`);
    console.log(`[findAllBlog] end`);

    return {
        contents,
        totalCount,
    };
};
