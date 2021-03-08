import { GetServerSidePropsContext } from 'next';
import { MYDOMAIN } from '~/api/const';

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
Sitemap: https://${MYDOMAIN}/sitemap.xml`;
};

const Robots = (): null => null;
export default Robots;
