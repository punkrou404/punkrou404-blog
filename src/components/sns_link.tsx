import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import { GITHUB_URL, SAUNA_IKITAI_URL, TWITTER_URL } from '~/lib/const';

const SNSLink = (): JSX.Element => {
    return (
        <nav className="flex justify-evenly w-full py-2">
            <a href={`${TWITTER_URL}`} target="_blank" rel="noreferrer">
                <TwitterIcon></TwitterIcon>
            </a>
            <a href={`${GITHUB_URL}`} target="_blank" rel="noreferrer">
                <GitHubIcon></GitHubIcon>
            </a>
            <a href={`${SAUNA_IKITAI_URL}`} target="_blank" rel="noreferrer">
                <object
                    type="image/svg+xml"
                    className="pointer-events-none w-8 h-8"
                    data={`/images/logo/sauna-ikitai.logo.svg`}
                />
            </a>
        </nav>
    );
};

export default SNSLink;
