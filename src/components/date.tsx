import { parseISO, format } from 'date-fns';

const Date = ({ dateString }): JSX.Element => {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
};

export default Date;
