const getArticles = async () => {
    const allPostData = [];

    const list = await fetch(
        'https://api.github.com/repos/punkrou404/zenn.dev.punkrou404/contents/articles/',
        {
            headers: { Authorization: `token ${process.env.github_access_key}` },
        }
    )
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            console.log(err);
        });

    if (list) {
        await Promise.all(
            list.map(async (li: any) => {
                const data = await fetch(
                    `https://api.github.com/repos/punkrou404/zenn.dev.punkrou404/contents/articles/${li.name}`,
                    {
                        headers: { Authorization: `token ${process.env.github_access_key}` },
                    }
                )
                    .then((res) => {
                        return res.json();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                console.log(data);
                allPostData.push(data);
            })
        );
    }

    allPostData.map((data, index) => {
        // const contents = decodeURIComponent(escape(atob(data.content)));
        const buffer = new Buffer(data.content, 'base64');
        const markdown = buffer.toString("utf-8");
        datas[index].content = markdown;
    });
};

export { getArticles };
