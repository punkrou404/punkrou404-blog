import SNSLink from '~/components/sns_link';
import Image from 'next/image';
import { HANDLE_NAME, MY_FIRST_NAME, MY_LAST_NAME } from '~/lib/const';

const Profile = (): JSX.Element => {
    return (
        <div>
            <img
                src={`/profile.png`}
                alt={`My profile icon`}
                loading={`lazy`}
                width={64}
                height={64}
            />
            <div className="">
                <div className="font-semibold text-sm py-2">{`${MY_FIRST_NAME} ${MY_LAST_NAME}`}</div>
                <div className="font-semibold text-xs py-2">{`@${HANDLE_NAME}`}</div>
                <div className="">
                    <SNSLink></SNSLink>
                </div>
            </div>
        </div>
    );
};

export default Profile;
