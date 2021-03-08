import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({
    res,
}: GetServerSidePropsContext): Promise<{ props: {} }> => {
    const robotsContent = getRobots();

    res.statusCode = 200;
    // Cashed 24Hr.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/plain');
    res.end(robotsContent);

    return {
        props: {},
    };
};

const getRobots = (): string => {
    return `User-agent: *
Allow: /
Sitemap: ${process.env.MYDOMAIN_BASEURL}/sitemap.xml`;
};

const Robots = (): null => null;
export default Robots;
