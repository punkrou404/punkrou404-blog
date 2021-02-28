import React from 'react';
import { NextPage } from 'next';
import { CardOutside } from '~/components/card-outside';

const ErrorIndex: NextPage = () => {
    return <CardOutside action={false}>{`送信しました。`}</CardOutside>;
};

export default ErrorIndex;
