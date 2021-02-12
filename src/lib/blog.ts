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

export interface GetBlogByIDOutput {
    time2FinishReading: number;
    title: string;
    type: string;
    topics: string[];
    published: boolean;
    id: string;
    contentHtml: string;
    date: string;
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

export const getBlogByID = async (id: string): Promise<GetBlogByIDOutput> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(`${process.env.MICROCMS_BASEURL}/blog/${id}`, key);
    const content: MicrocmsContent = await res.json();
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

export const getBlog = async (): Promise<GetBlogOutput> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(`${process.env.MICROCMS_BASEURL}/blog`, key);
    const blog = await res.json();

    const contents = blog.contents.map((content): Content => parsedContent(content));

    return {
        contents,
        totalCount: blog.totalCount,
    };
};

export const getBlogByQuery = async (
    offset: number,
    perPage: number,
    maxPage: number
): Promise<GetBlogOutput> => {
    const key = {
        headers: { 'X-API-KEY': process.env.microcms_access_key },
    };

    const res = await fetch(
        `${process.env.MICROCMS_BASEURL}/blog?offset=${(offset - 1) * perPage}&limit=${maxPage}`,
        key
    );
    const blog = await res.json();

    const contents = blog.contents.map((content): Content => parsedContent(content));

    return {
        contents,
        totalCount: blog.totalCount,
    };
};
