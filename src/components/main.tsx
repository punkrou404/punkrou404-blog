import React, { ReactNode } from 'react';
import GithubGrass from '~/components/github_grass';

type MainProps = {
    children: ReactNode;
};

const Main = ({ children }: MainProps): JSX.Element => {
    return (
        <main className="p-5 sm:grid sm:grid-cols-6">
            <aside className="border sm:col-start-1 sm:col-span-1" />
            <div className="border sm:col-start-2 sm:col-span-4">{children}</div>
            <aside className="border sm:col-start-6 sm:col-span-6">
                <GithubGrass></GithubGrass>
            </aside>
        </main>
    );
};

export default Main;
