import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

const SNSLink = (): JSX.Element => {
    return (
        <nav className="flex justify-evenly w-full py-2">
            <a href={`https://twitter.com/punkrou404`} target="_blank" rel="noreferrer">
                <TwitterIcon></TwitterIcon>
            </a>
            <a href={`https://github.com/punkrou404`} target="_blank" rel="noreferrer">
                <GitHubIcon></GitHubIcon>
            </a>
            <a href={`https://sauna-ikitai.com/saunners/26885`} target="_blank" rel="noreferrer">
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
