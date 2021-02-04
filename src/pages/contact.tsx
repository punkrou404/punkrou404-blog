import { NextPage } from 'next';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import React, { useState } from 'react';
import PageHead from '~/components/page-head';

// Ref: https://code-log.hatenablog.com/entry/2020/01/15/205930

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

    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: 'Contact.',
        honeypot: '',
        message: '',
        replyTo: 'punkrou404@gmail.com',
        accessKey: process.env.staticform_access_key,
    });

    const [response, setResponse] = useState({
        isError: true,
        message: '',
    });

    const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: { 'Content-Type': 'application/json' },
            });

            const json = await res.json();

            if (json.success) {
                setResponse({
                    isError: false,
                    message: json.message,
                });
            } else {
                setResponse({
                    isError: true,
                    message: json.message,
                });
            }
        } catch (e) {
            console.log('An error occurred', e);
            setResponse({
                isError: true,
                message: 'An error occured while submitting the form',
            });
        }
    };
    return (
        <div>
            <PageHead
                subtitle={`Contact page`}
                description={`Contact page`}
                image={``}
                url={``}
            ></PageHead>
            {response.isError ? (
                <div className="bg-red-400">
                    <p>{response.message}</p>
                </div>
            ) : (
                <div className="bg-blue-400">
                    <p>{response.message}</p>
                </div>
            )}

            <div>
                <h2>Contact.</h2>
                <form
                    action="https://api.staticforms.xyz/submit"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <div className="field p-4">
                        <label>Name</label>
                        <div className="text-gray-500">
                            <input
                                type="text"
                                placeholder="Please enter fullname."
                                name="name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="p-4">
                        <label>Mail</label>
                        <div className="text-gray-500">
                            <input
                                type="email"
                                placeholder="Please enter adress."
                                name="email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="hidden">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                type="text"
                                name="honeypot"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            <input type="hidden" name="subject" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="p-4">
                        <label>Content</label>
                        <div className="text-gray-500">
                            <textarea
                                placeholder="Your Message."
                                name="message"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
