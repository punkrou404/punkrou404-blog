import { NextPage } from 'next';
import PageHead from '~/components/page-head';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';

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
                {/* ここに自分の全部の行動履歴を(insta,tweet,blog,位置情報,etc..)出力したい */}
                <div className="border m-5">timeline1</div>
                <div className="border m-5">timeline2</div>
                <div className="border m-5">timeline3</div>
                <div className="border m-5">timeline4</div>
                <div className="border m-5">timeline5</div>
                <div className="border m-5">timeline6</div>
                <div className="border m-5">timeline7</div>
                <div className="border m-5">timeline8</div>
                <div className="border m-5">timeline9</div>
            </div>
        </>
    );
};

export default Home;
