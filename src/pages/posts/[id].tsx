import PostCard from '~/components/post-card';
import { getAllPostIds, getPostData } from '~/lib/posts';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { PostContent } from '~/lib/types';
import { useBreadcrumb } from '~/lib/use-breadcrumb';

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
            <PostCard props={postData} />
        </>
    );
};

const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

const getStaticProps: GetStaticProps = async ({
    params,
}): Promise<{
    props: {
        postData: PostContent;
    };
}> => {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
};

export default Blog;
export { getStaticPaths, getStaticProps };
