import { NextPage } from 'next';
import Router from 'next/router';
import { useBreadcrumb } from '~/lib/use-breadcrumb';
import { useState } from 'react';

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
        replyTo: '@',
        accessKey: process.env.access_key,
    });

    const [response, setResponse] = useState({
        type: '',
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
                //成功したらsuccessページに飛ぶ
                Router.push('/success');
            } else {
                setResponse({
                    type: 'error',
                    message: json.message,
                });
            }
        } catch (e) {
            console.log('An error occurred', e);
            setResponse({
                type: 'error',
                message: 'An error occured while submitting the form',
            });
        }
    };
    return (
        <div>
            <p>{response.message}</p>
            <div>
                <h2>Contact.</h2>
                <form
                    action="https://api.staticforms.xyz/submit"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <div className="field p-4">
                        <label>Name</label>
                        <div>
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
                        <div>
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
                        <div>
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
