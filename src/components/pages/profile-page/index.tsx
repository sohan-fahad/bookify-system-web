import MetricsCard from './metrics-card';
import RecentReferral from './recent-referral';
import ProfileInfo from './profile-info';

const ProfilePage = () => {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="space-y-4 col-span-12 lg:col-span-8 gap-6 order-2 lg:order-1">
                <MetricsCard />
                <RecentReferral />
            </div>

            <div className="col-span-12 lg:col-span-4 gap-4 order-1 lg:order-2">
                <ProfileInfo />
            </div>
        </div>
    );
};

export default ProfilePage;