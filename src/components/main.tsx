const Main = ({ children }) => {
    return (
        <main className="p-5 sm:grid sm:grid-cols-6">
            <aside className="sm:col-start-1 sm:col-span-2" />
            <div className="sm:col-start-2 sm:col-span-4">{children}</div>
            <aside className="sm:col-start-4 sm:col-span-6" />
        </main>
    );
};

export default Main;
