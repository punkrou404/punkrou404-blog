import React from 'react';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import Card from '~/components/card';
import PageHead from '~/components/page-head';
import { NextPageContext } from 'next';

const BlogSearch = ({ contents, totalCount, keyword }): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Blog',
            href: `/blog/search?keyword=${keyword}`,
        },
        {
            id: 3,
            text: `"${String(keyword)}"`,
        },
    ]);

    return (
        <div>
            <PageHead
                subtitle={`Blog page. search for "${String(keyword)}"`}
                description={`Blog list`}
                image={``}
                url={``}
            />
            <div className="text-blue-500">
                {`Blog page. search for "${String(keyword)}". ${totalCount} hits.`}
            </div>
            {contents.map((content) => (
                <Card props={content} key={content.id} />
            ))}
        </div>
    );
};

export const getServerSideProps = async (params: NextPageContext) => {
    const { keyword } = params.query;
    const res = await fetch(
        `${process.env.MYDOMAIN_BASEURL}/api/blog?${new URLSearchParams({
            keyword: String(keyword),
        })}`,
        {
            method: 'GET',
        }
    );
    const json = await res.json();
    const totalCount = json.contents.length;

    return {
        props: {
            contents: json.contents,
            totalCount: totalCount,
            keyword,
        },
    };
};

export default BlogSearch;
