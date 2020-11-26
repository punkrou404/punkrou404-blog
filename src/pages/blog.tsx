import Card from '~/components/card';
import { getSortedPostsData } from '~/lib/posts';
import Layout from '~/components/layout';
import { NextPage } from 'next';
import { PostMeta } from '~/lib/types';

const Blog: NextPage = ({ allPostData }) => (
    <Layout>
        <div className="max-h-screen overflow-y-scroll">
            {allPostData.map((postMetaData) => (
                <Card props={postMetaData} key={postMetaData.id} />
            ))}
        </div>
    </Layout>
);

const getStaticProps = async (): Promise<{
    props: {
        allPostData: Array<PostMeta>;
    };
}> => {
    const allPostData = getSortedPostsData();
    return {
        props: {
            allPostData,
        },
    };
};

export default Blog;
export { getStaticProps };