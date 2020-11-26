import fs from 'fs';
import marked from 'marked';
import highlightjs from 'highlight.js';
import path from 'path';
import matter from 'gray-matter';
import { PostData } from '../lib/types';

const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

const getAllPostIds = (): {
    params: { id: string };
}[] => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
};

const getPostData = async (id: string) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const date = fs.statSync(fullPath).mtime;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const contentHtml = marked(matterResult.content);

    return {
        id,
        contentHtml,
        date,
        ...(matterResult.data as {
            title: string;
            type: string;
            topics: string[];
            published: boolean;
        }),
    };
};

const getSortedPostsData = (): PostData[] => {
    // /posts/ 配下のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        // `[id].tsx`を解析対象外にする
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            // idを取得するために`.md`を削除
            const id = fileName.replace(/\.md$/, '');

            // 文字列としてmarkdown読み込む
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // gray-matter を使用してメタデータを取得
            const matterResult = matter(fileContents);
            const date = fs.statSync(fullPath).mtime;

            // idとメタデータを返却
            return {
                id,
                date,
                ...(matterResult.data as {
                    title: string;
                    type: string;
                    topics: string[];
                    published: boolean;
                }),
            };
        });

    // 日付でポストをソート
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
};

export { getAllPostIds, getPostData, getSortedPostsData };
