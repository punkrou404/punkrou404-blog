import { ReactNode } from 'react';

type P = {
    children?: ReactNode;
    action?: boolean;
};

export const CardOutside = ({ children, action = true }: P): JSX.Element => {
    const style = action ? 'hover:bg-blue-300 active:bg-blue-500' : '';

    return (
        <div className={`w-full flex flex-col p-3 text-gray-500`}>
            <div
                className={`cursor-pointer p-2 bg-blue-200 rounded-lg shadow-lg flex-1 flex flex-col ${style}`}
            >
                <div className={`p-4 rounded-lg  bg-white`}>{children}</div>
            </div>
        </div>
    );
};
