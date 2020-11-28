import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';

const About: NextPage = () => {
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
            <section>About.</section>
        </>
    );
};

export default About;
