import { Header } from './components/SiteHeader';

export function App({ user, children }) {
  return (
    <>
      <Header user={user} />
      <main>{children}</main>
    </>
  );
}
