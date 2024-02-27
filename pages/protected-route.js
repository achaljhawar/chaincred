import ProtectedView from '@/components/protected/ProtectedView';
import withAuth from '@/components/withAuth';

function ProtectedRoute() {
    return <ProtectedView />;
}

export default withAuth(ProtectedRoute);