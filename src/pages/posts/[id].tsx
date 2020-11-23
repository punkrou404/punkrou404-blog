import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import { NextPage } from 'next';

const Post: NextPage = ({ postData }) => (
    <Layout>
        {postData.title}
        <br />
        {postData.id}
        <br />
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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

const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
};

export default Post;
export { getStaticPaths, getStaticProps };
