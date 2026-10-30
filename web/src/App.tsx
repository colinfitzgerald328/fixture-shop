import { Header } from './components/Header';

export function App({ user, children }) {
  return (
    <>
      <Header user={user} />
      <main>{children}</main>
    </>
  );
}
