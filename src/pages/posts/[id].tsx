import PostCard from '~/components/post-card';
import { getAllPostIds, getPostData } from '~/lib/posts';
import { NextPage } from 'next';
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
            href: '/blog',
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

const getStaticPaths = async (): Promise<{
    paths: {
        params: {
            id: string;
        };
    }[];
    fallback: boolean;
}> => {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    };
};

const getStaticProps = async ({
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
