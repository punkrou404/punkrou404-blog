import PostCard from '~/components/post-card';
import { getAllPostIds, getPostData } from '~/lib/posts';
import { NextPage } from 'next';
import { PostContent } from '~/lib/types';

const Post: NextPage = ({ postData }) => (
    <>
        <PostCard props={postData} />
    </>
);

const getStaticPaths = async (): Promise<{
    paths: {
        params: {
            id: string;
        };
    }[];
    fallback: boolean;
}> => {
    const paths = getAllPostIds();
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

export default Post;
export { getStaticPaths, getStaticProps };
