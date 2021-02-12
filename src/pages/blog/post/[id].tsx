import PostCard from '~/components/post-card';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React from 'react';
import PageHead from '~/components/page-head';
import { getBlog, getBlogByID, GetBlogByIDOutput } from '~/lib/blog';

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
    return {
        props: {
            content: await getBlogByID(context.params.id),
        },
    };
};

type blogPostIDPaths = `/blog/post/${string}`;

export const getStaticPaths = async (): Promise<{
    paths: blogPostIDPaths[];
    fallback: boolean;
}> => {
    const paths = (await getBlog()).contents.map((c) => `/blog/post/${c.id}` as blogPostIDPaths);
    return {
        paths,
        fallback: false,
    };
};
export default BlogPostId;
