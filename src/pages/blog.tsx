import Card from '~/components/card';
import { getSortedPostsData } from '~/lib/posts';
import { NextPage } from 'next';
import { PostMeta } from '~/lib/types';

const Blog: NextPage = ({ allPostData }) => (
    <div className="">
        {allPostData.map((postMetaData) => (
            <Card props={postMetaData} key={postMetaData.id} />
        ))}
    </div>
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
