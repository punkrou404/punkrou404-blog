module.exports = {
    purge: ['./src/**/*.tsx'],
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    plugins: [require('tailwind-scrollbar')],
};
