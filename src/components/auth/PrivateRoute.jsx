import { RedirectToSignIn, useAuth } from '@clerk/react-router';

const PrivateRoute = ({ children }) => {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return <div className="page">Verificando sesión...</div>;
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return <>{children}</>;
};

export default PrivateRoute;