import Layout from '../components/layout';
import { NextPage } from 'next';
import SNS from '../components/sns';

const Home: NextPage = () => (
    <Layout>
        <section className="grid grid-cols-6 gap-4 justify-center items-center h-screen">
            <div className="col-start-1 col-span-6 h-full ">{/*padding area.*/}</div>
            <div className="col-start-3 col-span-1 place-self-center">
                <img src="profile.png" />
            </div>
            <div className="flex-col col-start-4 col-span-1 place-self-center">
                <div className="font-semibold text-xl text-white">Sato Kotaro</div>
                <div className="font-semibold text-l text-white">@punkrou404</div>
                <div className="font-semibold text-m text-gray-400 pt-6">
                    frontend, backend, infrastructure, sauna, and more...
                </div>
            </div>
            <div className="col-start-3 col-span-2 h-full">
                <SNS />
            </div>
            <div className="col-start-1 col-span-6">{/*padding area.*/}</div>
        </section>
    </Layout>
);

export default Home;
