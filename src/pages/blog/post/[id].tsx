import PostCard from '~/components/post-card';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React from 'react';
import PageHead from '~/components/page-head';
import { getBlog, getBlogByID } from '~/lib/blog';
import { NextPage } from 'next';

const BlogPostId: NextPage = ({ content }): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: '/blog',
        },
        {
            id: 3,
            text: content.title,
        },
    ]);

    return (
        <>
            <PageHead
                subtitle={`${content.title}`}
                description={`Blog detail page`}
                image={``}
                url={``}
            ></PageHead>
            <PostCard props={content} />
        </>
    );
};

export const getStaticProps = async (context: {
    params: { id: string };
}): Promise<{
    props: {
        content: {
            time2FinishReading: number;
            title: string;
            type: string;
            topics: string[];
            published: boolean;
            id: string;
            contentHtml: string;
            date: string;
        };
    };
}> => {
    return {
        props: {
            content: await getBlogByID(context.params.id),
        },
    };
};

export const getStaticPaths = async (): Promise<{
    paths: `/blog/post/${string}`[];
    fallback: boolean;
}> => {
    const paths = await (await getBlog()).contents.map((c) => `/blog/post/${c.id}`);
    return {
        paths,
        fallback: false,
    };
};
export default BlogPostId;
