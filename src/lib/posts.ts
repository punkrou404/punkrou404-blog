import fs from 'fs';
import marked from 'marked';
import highlightjs from 'highlight.js';
import path from 'path';
import matter from 'gray-matter';
import { PostID, PostMeta, PostContent } from '../lib/types';

const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

const getAllPostIds = (): PostID[] => {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
};

const getPostData = async (id: string): Promise<PostContent> => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const date = fs.statSync(fullPath).mtime.toISOString();
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
    const time2FinishReading = Math.floor(
        contentHtml.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '').length / 500
    );

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
        time2FinishReading,
    };
};

const getSortedPostsData = (): PostMeta[] => {
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

            // 更新日付を取得
            const date = fs.statSync(fullPath).mtime;

            // 本文要約を取得
            const summary = matterResult.content.substr(0, 200);

            // idとメタデータを返却
            return {
                id,
                date,
                summary,
                ...(matterResult.data as {
                    title: string;
                    type: string;
                    topics: string[];
                    published: boolean;
                }),
            };
        });

    // 日付でポストをソート
    return allPostsData
        .sort((a, b) => {
            if (a.date.getTime() < b.date.getTime()) {
                return 1;
            } else {
                return -1;
            }
        })
        .map((post) => {
            return {
                ...(post as {
                    id: string;
                    published: boolean;
                    summary: string;
                    title: string;
                    topics: string[];
                    type: string;
                }),
                date: post.date.toISOString(),
            };
        });
};

export { getAllPostIds, getPostData, getSortedPostsData };
