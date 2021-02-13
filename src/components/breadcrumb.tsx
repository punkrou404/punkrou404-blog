import React, { FC } from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
    id: number;
    text: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items, separator = '>' }) => {
    return (
        <>
            {items
                .map((item) =>
                    item.href != null ? (
                        <span key={item.text} className="active:text-blue-600 hover:bg-blue-300">
                            <Link href={item.href}>{item.text}</Link>
                        </span>
                    ) : (
                        <span key={item.text}>{item.text}</span>
                    )
                )
                .reduce(
                    (prev, curr) =>
                        prev.length === 0 ? [curr] : [...prev, ` ${separator} `, curr],
                    []
                )}
        </>
    );
};

export default Breadcrumb;
