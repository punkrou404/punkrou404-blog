import PostCard from '~/components/post-card';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React from 'react';
import PageHead from '~/components/page-head';
import { Post, PostDetail } from '~/api/types';
import { selectBlogById } from '~/api/blog/select_blog_by_id';
import { getAllContents } from '~/api/blog/get_all_contents';
import { ISR_TIME } from '~/lib/const';

type blogIdPaths = `/blog/post/${string}`;

const BlogPostId = (props: PostDetail): JSX.Element => {
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
            text: props.title,
        },
    ]);

    return (
        <>
            <PageHead
                subtitle={`${props.title}`}
                description={`Blog detail page`}
                image={``}
                url={``}
            ></PageHead>
            <PostCard props={props} />
        </>
    );
};

export const getStaticProps = async (context: {
    params: { id: string };
}): Promise<{
    props: PostDetail;
    revalidate: number;
}> => {
    const id = context.params.id;
    const postDetail = await selectBlogById(id);
    return {
        props: postDetail,
        revalidate: ISR_TIME,
    };
};

export const getStaticPaths = async (): Promise<{
    paths: blogIdPaths[];
    fallback: boolean;
}> => {
    const posts = await getAllContents();
    const paths = posts.map((c: Post) => `/blog/post/${c.id}` as blogIdPaths);

    return { paths, fallback: false };
};

export default BlogPostId;
