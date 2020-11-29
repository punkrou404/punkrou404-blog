const Main = ({ children }) => {
    return (
        <main className="grid grid-cols-6 p-5">
            <aside className="col-start-1 col-span-2" />
            <div className="col-start-2 col-span-4">{children}</div>
            <aside className="col-start-4 col-span-6" />
        </main>
    );
};

export default Main;
