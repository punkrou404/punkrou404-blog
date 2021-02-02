import { NextPage, NextPageContext } from 'next';
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from '@material-ui/lab';
import { PostMeta } from '~/lib/types';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import { getSortedPostsData } from '~/lib/posts';

const DynamicPage: NextPage<{
    allPostData: {
        sortedAllPostsData: PostMeta[];
        totalCount: number;
        limit: number;
    };
}> = ({ allPostData }) => {
    const router = useRouter();
    const offset = Number(router.query.offset) || 1;
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/${String(offset)}`,
        },
        {
            id: 3,
            text: String(offset),
        },
    ]);

    const handleChangePage = useCallback(
        (_: React.ChangeEvent<unknown>, page: number) => {
            void router.push(`/blog/${page}`);
        },
        [router]
    );

    return (
        <div>
            <Pagination
                count={Math.ceil(allPostData.totalCount / allPostData.limit)}
                page={offset}
                onChange={handleChangePage}
            />
            {allPostData.sortedAllPostsData.map((postMetaData) => (
                <Card props={postMetaData} key={postMetaData.id} />
            ))}
            <Pagination
                count={Math.ceil(allPostData.totalCount / allPostData.limit)}
                page={offset}
                onChange={handleChangePage}
            />
        </div>
    );
};

const getServerSideProps = async (
    params: NextPageContext
): Promise<{
    props: {
        allPostData: {
            sortedAllPostsData: PostMeta[];
            totalCount: number;
            limit: number;
        };
    };
}> => {
    const allPostData = await getSortedPostsData(params.query);
    return {
        props: {
            allPostData,
        },
    };
};

export default DynamicPage;
export { getServerSideProps };
