import PostCard from '~/components/post-card';
import { getAllPostIds, getPostData } from '~/lib/posts';
import Layout from '~/components/layout';
import { NextPage } from 'next';
import { PostData } from '~/lib/types';

const Post: NextPage = ({ postData }) => (
    <Layout>
        <PostCard props={postData} />
    </Layout>
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
        postData: PostData;
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
