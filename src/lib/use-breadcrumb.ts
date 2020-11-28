import { useContext } from 'react';
import { BreadcrumbContext } from '~/context/breadcrumb-context';
import { BreadcrumbItem } from '~/components/breadcrumb';

export const useBreadcrumb = (items: BreadcrumbItem[]) => {
    const context = useContext(BreadcrumbContext);
    context.setBreadcrumbItems(items);
};
