import Card from '~/components/card';
import { getSortedPostsData } from '~/lib/posts';
import { NextPage } from 'next';
import { PostMeta } from '~/lib/types';
import { useBreadcrumb } from '~/lib/use-breadcrumb';

const Blog: NextPage<{
    allPostData: PostMeta[];
}> = ({ allPostData }) => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
        },
    ]);
    return (
        <div className="">
            {allPostData.map((postMetaData) => (
                <Card props={postMetaData} key={postMetaData.id} />
            ))}
        </div>
    );
};

const getStaticProps = async (): Promise<{
    props: {
        allPostData: Array<PostMeta>;
    };
}> => {
    const allPostData = await getSortedPostsData();
    return {
        props: {
            allPostData,
        },
    };
};

export default Blog;
export { getStaticProps };
