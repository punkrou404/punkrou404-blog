import React from 'react';
import { NextPage } from 'next';

const ErrorIndex: NextPage = () => {
    return <div>{`送信が失敗しました。前の画面に戻りもう一度送信してください。`}</div>;
};

export default ErrorIndex;
