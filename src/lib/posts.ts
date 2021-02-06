import marked from 'marked';
import highlightjs from 'highlight.js';
import matter from 'gray-matter';
import { PostMeta, PostContent } from '../lib/types';

const getPostData = async (id: string): Promise<PostContent> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(`${process.env.MICROCMS_BASEURL}/blog/${id}`, key);
    const body = await res.json();

    const date = body.createdAt;
    const matterResult = matter(body.body);

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

const getSortedPostsData = async (
    params
): Promise<{
    sortedAllPostsData: PostMeta[];
    totalCount: number;
    limit: number;
}> => {
    const offset = params?.offset ? String(params?.offset) : '0';

    const query = {
        offset: String(Math.ceil(Number.parseInt(offset, 10) - 1) * 3),
        limit: '3',
    };

    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(`${process.env.MICROCMS_BASEURL}/blog?offset=${query.offset}&limit=${query.limit}`, key);
    const body = await res.json();

    const allPostsData = body.contents.map((content) => {
        // gray-matter を使用してメタデータを取得
        const matterResult = matter(content.body);

        // 更新日付を取得
        const date = new Date(content.createdAt);

        // 本文要約を取得
        const summary = matterResult.content.substr(0, 200);

        // idとメタデータを返却
        return {
            id: content.id,
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
    const sortedAllPostsData = allPostsData
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

    return {
        sortedAllPostsData,
        totalCount: body.totalCount,
        limit: body.limit,
    };
};

const getProfile = async (): Promise<string> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(`${process.env.MICROCMS_BASEURL}/profile`, key);
    const body = await res.json();
    const matterResult = matter(body.contents[0].body);

    marked.setOptions({
        highlight: (code, lang) => highlightjs.highlightAuto(code, [lang]).value,
        pedantic: false,
        gfm: true,
        breaks: true,
        silent: false,
    });
    const contentHtml = marked(matterResult.content);
    return contentHtml;
};

const getBlogPagePaths = async (): Promise<string[]> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key ?? '' },
    };
    const contents = await fetch(`${process.env.MICROCMS_BASEURL}/blog?offset=0&limit=5`, key)
        .then((res) => res.json())
        .catch(() => null);

    const paths = [...Array(Math.ceil(contents.totalCount / contents.limit))]
        .map((_, i) => i + 1)
        .map((offset) => `/blog/${offset}`);

    return paths;
};

export { getPostData, getSortedPostsData, getProfile, getBlogPagePaths };
