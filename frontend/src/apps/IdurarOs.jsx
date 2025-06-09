import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import { AppContextProvider } from '@/context/appContext';
import PageLoader from '@/components/PageLoader';
import AuthRouter from '@/router/AuthRouter';
import Localization from '@/locale/Localization';

const ErpApp = lazy(() => import('./ErpApp'));

const DefaultApp = () => (
  <Localization>
    <AppContextProvider>
      <Suspense fallback={<PageLoader />}>
        <ErpApp />
      </Suspense>
    </AppContextProvider>
  </Localization>
);

export default function IdurarOs() {
  const { isLoggedIn } = useSelector(selectAuth);

  // Set document.title as a side-effect:
  useEffect(() => {
    if (!isLoggedIn) {
      document.title = 'N&M CRM ERP';
    } else {
      document.title = 'N&M CRM ERP';
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <Localization>
        <AuthRouter />
      </Localization>
    );
  }

  return <DefaultApp />;
}
