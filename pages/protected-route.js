import withAuth from '@/utils/withAuth';

function ProtectedRoute() {
    return <h1>hemlo</h1>
}

export default withAuth(ProtectedRoute);