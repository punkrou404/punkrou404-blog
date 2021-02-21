import { NextApiRequest, NextApiResponse } from 'next';
import { getProfile } from '~/pages/api/profile/get_profile';

const Profile = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const message = await getProfile();
    res.status(200).json({ message });
};

export default Profile;
