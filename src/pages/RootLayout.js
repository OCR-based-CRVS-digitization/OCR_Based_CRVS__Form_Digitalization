import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader/MainHeader';
import { AuthProvider } from '../store/auth-context';

function RootLayout() {
  return (
    <AuthProvider>
      <MainHeader/>
      <main>
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export default RootLayout;
