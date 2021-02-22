import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import MarkdownPreview from '~/components/markdown-preview';
import React from 'react';
import PageHead from '~/components/page-head';

const About: NextPage<{
    profile: string;
}> = ({ profile }): JSX.Element => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'About',
        },
    ]);

    return (
        <>
            <PageHead
                subtitle={`About page`}
                description={`About page`}
                image={``}
                url={``}
            ></PageHead>
            <section className="">
                <div className="py-5">{/* padding area */}</div>
                <div className="font-semibold text-m text-gray-400 pt-6">
                    <MarkdownPreview content={profile} />
                </div>
            </section>
        </>
    );
};

const getStaticProps = async (): Promise<{
    props: {
        profile: string;
    };
}> => {
    const res = await fetch(`${process.env.MYDOMAIN_BASEURL}/api/profile`, {
        method: 'GET',
    });
    const json = await res.json();
    return {
        props: {
            profile: json.message,
        },
    };
};

export default About;
export { getStaticProps };
