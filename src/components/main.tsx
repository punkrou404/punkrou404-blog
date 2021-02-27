import React, { ReactNode } from 'react';
import GithubGrass from '~/components/github_grass';
import { CardOutside } from '~/components/card';
import Profile from './profile';

type MainProps = {
    children: ReactNode;
};

const Main = ({ children }: MainProps): JSX.Element => {
    return (
        <main className="p-5 sm:grid sm:grid-cols-6">
            <aside className="sm:col-start-1 sm:col-span-1">
                <div className="sticky top-10">
                    <CardOutside action={false}>
                        <Profile></Profile>
                    </CardOutside>
                </div>
            </aside>
            <div className="sm:col-start-2 sm:col-span-4">{children}</div>
            <aside className="sm:col-start-6 sm:col-span-6">
                <CardOutside action={false}>
                    <GithubGrass></GithubGrass>
                </CardOutside>
            </aside>
        </main>
    );
};

export default Main;
