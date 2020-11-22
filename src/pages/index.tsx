import { getSortedPostsData } from '../lib/posts';
import { NextPage } from 'next';
import { PostMetaData } from '../lib/types';

const Home: NextPage = ({ allPostsData }) => {
    return (
        <>
            <section>
                <h2>Blog</h2>
                <ul className="flex flex-wrap overflow-hidden md:-mx-2">
                    {allPostsData.map(({ id, date, title }) => (
                        <li key={id} className="w-1/5 overflow-hidden md:my-2 md:px-2">
                            {title}
                            <br />
                            {id}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
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
