import { parseISO, format } from 'date-fns';

const Date = ({ dateString }): JSX.Element => {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy hh:mm')}</time>;
};

export default Date;
