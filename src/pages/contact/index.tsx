import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { NextPage } from 'next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import PageHead from '~/components/page-head';

interface Contact {
    name: string;
    email: string;
    body: string;
}

const Contact: NextPage = () => {
    useBreadcrumb([
        {
            id: 1,
            text: 'Home',
            href: '/',
        },
        {
            id: 2,
            text: 'Contact',
        },
    ]);

    const router = useRouter();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .nullable()
            .max(64, 'It is too long!!!!!!')
            .required('名前は必須項目です'),
        email: Yup.string()
            .nullable()
            .max(256, 'It is too long!!!!!!')
            .email('正しいメールアドレスではありません')
            .required('メールアドレスは必須です'),
        body: Yup.string()
            .nullable()
            .max(1024, 'It is too long!!!!!!')
            .required('お問い合わせ内容は必須です。'),
    });

    const onSubmit = async (contact: Contact): Promise<void> => {
        try {
            const res = await fetch(`/api/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(contact),
            });

            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }

            void router.push('/contact/success');
        } catch (err) {
            console.log(err);
            void router.push('/contact/error');
        }
    };

    const { control, handleSubmit, errors } = useForm<Contact>({
        mode: 'onBlur',
        resolver: yupResolver(validationSchema),
    });

    return (
        <>
            <PageHead
                subtitle={`Contact page`}
                description={`Contact page`}
                image={``}
                url={``}
            ></PageHead>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className={``}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            as={TextField}
                            control={control}
                            variant={`standard`}
                            required
                            fullWidth
                            id={`name`}
                            label={`お名前`}
                            name={`name`}
                            autoComplete={`name`}
                            defaultValue={``}
                            error={!!errors.name?.message}
                        />
                        {errors.name && <p className={`red`}>{errors.name.message}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            as={TextField}
                            control={control}
                            variant={`standard`}
                            required
                            fullWidth
                            id={`email`}
                            label={`メールアドレス`}
                            name={`email`}
                            autoComplete={`email`}
                            defaultValue={``}
                            error={!!errors.email?.message}
                        />
                        {errors.email && <p className={`red`}>{errors.email.message}</p>}
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            as={TextField}
                            control={control}
                            variant={`standard`}
                            required
                            fullWidth
                            multiline
                            rows={6}
                            name={`body`}
                            label={`内容`}
                            id={`body`}
                            autoComplete={`body`}
                            defaultValue={``}
                            error={!!errors.body?.message}
                        />
                        {errors.body && <p className={`red`}>{errors.body.message}</p>}
                    </Grid>
                </Grid>
                <Button type="submit" variant={`text`} aria-label={`送信`}>
                    {`送信`}
                </Button>
            </form>
        </>
    );
};

export default Contact;
