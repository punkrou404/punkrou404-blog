import React from 'react';
import { NextPage } from 'next';
import { CardOutside } from '~/components/card-outside';

const ErrorIndex: NextPage = () => {
    return (
        <CardOutside action={false}>
            {`送信が失敗しました。前の画面に戻りもう一度送信してください。`}
        </CardOutside>
    );

};

export default ErrorIndex;
