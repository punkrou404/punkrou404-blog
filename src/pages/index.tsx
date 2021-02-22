import { NextPage } from 'next';
import PageHead from '~/components/page-head';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';
import Timeline from '~/components/timeline';

const Home: NextPage = () => {
    return (
        <>
            <PageHead
                subtitle={`Top page `}
                description={`Top page`}
                image={``}
                url={``}
            ></PageHead>
            <Alert severity="info">
                {`RSSフィードを公開しています。`}
                <Link href={`/api/blog/feed`}>
                    <span className="active:text-blue-500 hover:text-blue-400 cursor-pointer">{`こちら`}</span>
                </Link>
                {`を参照`}
            </Alert>
            <div className="border">
                <Timeline></Timeline>
            </div>
        </>
    );
};

export default Home;
