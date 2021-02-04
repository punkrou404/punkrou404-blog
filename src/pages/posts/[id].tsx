import PostCard from '~/components/post-card';
import { getPostData } from '~/lib/posts';
import { NextPage, NextPageContext } from 'next';
import { PostContent } from '~/lib/types';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React from 'react';
import PageHead from '~/components/page-head';

const Blog: NextPage<{
    postData: PostContent;
}> = ({ postData }) => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: '/blog/1',
        },
        {
            id: 3,
            text: postData.title,
        },
    ]);

    return (
        <>
            <PageHead
                subtitle={`${postData.title}`}
                description={`Blog detail page`}
                image={``}
                url={``}
            ></PageHead>
            <PostCard props={postData} />
        </>
    );
};

const getServerSideProps = async (
    params: NextPageContext
): Promise<{
    props: {
        postData: PostContent;
    };
}> => {
    const postData = await getPostData(params.query.id as string);
    return {
        props: {
            postData,
        },
    };
};

export default Blog;
export { getServerSideProps };
