import Card from '../components/card';
import { getSortedPostsData } from '../lib/posts';
import { NextPage } from 'next';
import { PostMetaData } from '../lib/types';

const Home: NextPage = ({ allPostsData }) => {
    return (
        <>
            <section>
                <h2>Blog</h2>
                <div className="flex flex-wrap -m-3">
                    {allPostsData.map((postMetaData) => (
                        <Card props={postMetaData} key={postMetaData.id} />
                    ))}
                </div>
            </section>
        </>
    );
};

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
