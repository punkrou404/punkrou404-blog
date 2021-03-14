import GitHubIcon from '@material-ui/icons/GitHub';
import { GITHUB_GRASS_URL, GITHUB_URL, HANDLE_NAME } from '~/lib/const';

const GithubGrass = (): JSX.Element => {
    return (
        <div>
            <div className="font-semibold text-xs pb-1">{`GitHub Activities`}</div>
            <div className="font-semibold text-xs">
                <a href="https://github.com/kounetsuman" target="_blank" rel="noreferrer">
                    <GitHubIcon fontSize="small"></GitHubIcon>
                    {` @${HANDLE_NAME}`}
                </a>
            </div>

            <div className="pt-2">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                    <img
                        src={GITHUB_GRASS_URL}
                        alt={`Github grass`}
                        loading={`lazy`}
                        width={155}
                        height={870}
                    />
                </a>
            </div>
        </div>
    );
};

export default GithubGrass;
