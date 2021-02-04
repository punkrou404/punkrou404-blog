import { NextPage } from 'next';
import PageHead from '~/components/page-head';

const Home: NextPage = () => {
    return (
        <>
            <PageHead
                subtitle={`Top page `}
                description={`Top page`}
                image={``}
                url={``}
            ></PageHead>
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
