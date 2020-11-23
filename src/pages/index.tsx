import Card from '../components/card';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout';
import { NextPage } from 'next';
import { PostMetaData } from '../lib/types';

const Home: NextPage = ({ allPostsData }) => (
    <Layout>
        <section>
            <div className="flex flex-wrap -m-3">
                {allPostsData.map((postMetaData) => (
                    <Card props={postMetaData} key={postMetaData.id} />
                ))}
            </div>
        </section>
    </Layout>
);

const getStaticProps = async (): Promise<{
    props: {
        allPostsData: Array<PostMetaData>;
    };
}> => {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
};

export default Home;

export { getStaticProps };
