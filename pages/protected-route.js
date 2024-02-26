import ProtectedView from '@/components/protected/ProtectedView';
import withAuth from '@/utils/withAuth';

function ProtectedRoute() {
    return <ProtectedView />;
}

export default withAuth(ProtectedRoute);