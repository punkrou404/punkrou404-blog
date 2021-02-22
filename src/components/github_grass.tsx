import Image from 'next/image';
import GitHubIcon from '@material-ui/icons/GitHub';

const GithubGrass = (): JSX.Element => {
    return (
        <div className="m-2">
            <h4>{`GitHub Activities`}</h4>
            <span>
                <a href="https://github.com/punkrou404" target="_blank" rel="noreferrer">
                    <GitHubIcon></GitHubIcon>
                    {` punkrou404`}
                </a>
            </span>

            <div className="pt-2">
                <a href="https://github.com/punkrou404" target="_blank" rel="noreferrer">
                    <Image
                        src="https://grass-graph.moshimo.works/images/punkrou404.png?rotate=90"
                        loading="lazy"
                        width={155}
                        height={870}
                    />
                </a>
            </div>
        </div>
    );
};

export default GithubGrass;
