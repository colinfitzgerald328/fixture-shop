import { useFlags } from 'launchdarkly-react-client-sdk';

export function Header({ user }) {
  const { searchBar, promoBanner } = useFlags();
  return (
    <header>
      {promoBanner && <PromoBanner />}
      <Logo />
      {searchBar && <Search />}
      <Account name={user.name} />
    </header>
  );
}
