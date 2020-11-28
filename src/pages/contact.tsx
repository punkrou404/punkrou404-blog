import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';

const Contact: NextPage = () => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Contact',
        },
    ]);

    return (
        <>
            <section>Contact.</section>
        </>
    );
};

export default Contact;
