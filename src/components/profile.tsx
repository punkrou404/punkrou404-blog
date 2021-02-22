import SNSLink from '~/components/sns_link';
import Image from 'next/image';

const Profile = (): JSX.Element => {
    return (
        <div>
            <Image src={`/profile.png`} loading="lazy" width={64} height={64} />
            <div className="">
                <div className="font-semibold text-sm py-2">{`Sato Kotaro`}</div>
                <div className="font-semibold text-xs py-2">{`@punkrou404`}</div>
                <div className="">
                    <SNSLink></SNSLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
