import PostCard from '~/components/post-card';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React from 'react';
import PageHead from '~/components/page-head';

interface GetBlogByIDOutput {
    time2FinishReading: number;
    title: string;
    type: string;
    topics: string[];
    published: boolean;
    id: string;
    contentHtml: string;
    date: string;
}

const BlogPostId = ({ content }: GetBlogByIDOutput): JSX.Element => {
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
        content: GetBlogByIDOutput;
    };
}> => {
    const res = await fetch(
        `${process.env.MYDOMAIN_BASEURL}/api/blogs/id?${new URLSearchParams(context.params)}`,
        {
            method: 'GET',
        }
    );
    return {
        props: {
            content: await res.json(),
        },
    };
};

type blogPostIDPaths = `/blog/post/${string}`;

export const getStaticPaths = async (): Promise<{
    paths: blogPostIDPaths[];
    fallback: boolean;
}> => {
    const res = await fetch(`${process.env.MYDOMAIN_BASEURL}/api/blogs`, {
        method: 'GET',
    });
    const paths = (await res.json()).contents.map((c) => `/blog/post/${c.id}` as blogPostIDPaths);
    return {
        paths,
        fallback: false,
    };
};
export default BlogPostId;
