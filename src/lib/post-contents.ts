import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import { POSTS_PATH } from '~/pages/api/const';
import { Content } from '~/pages/api/types';

interface OutputGetSource {
    id: string;
    fileContent: Buffer;
}

export const getSources = (): OutputGetSource[] => {
    return fs
        .readdirSync(POSTS_PATH)
        .filter((e) => /\.md$/.test(e))
        .map((e) => {
            const fullPath = path.join(POSTS_PATH, e);
            const fileContent = fs.readFileSync(fullPath);
            const id = e.replace(/\.md$/, '');
            return {
                id,
                fileContent,
            };
        });
};

export const getContentsByMarkdownFile = (sources: OutputGetSource[]): Content[] => {
    return sources.map((e) => {
        const matterResult = matter(e.fileContent);
        const summary = matterResult.content.substr(0, 200);
        const body = matterResult.content;
        const id = e.id;
        return Object.assign(
            {
                id,
                summary,
                body,
            },
            matterResult.data as {
                title: string;
                topics: string[];
                published: boolean;
                createdAt: string;
                updatedAt: string;
                publishedAt: string;
                revisedAt: string;
                content: string;
            }
        );
    });
};
