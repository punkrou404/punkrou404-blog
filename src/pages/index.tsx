import { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <>
            <section>
                <p className="text-5xl text-center text-gray-700 dark:text-gray-100">
                    [Your Self Introduction]
                </p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
        </>
    );
};

export default Home;
