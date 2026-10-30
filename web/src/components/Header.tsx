import { useFlags } from 'launchdarkly-react-client-sdk';

export function Header({ user }) {
  const { searchBar } = useFlags();
  return (
    <header>
      <Logo />
      {searchBar && <Search />}
      <Account name={user.name} />
    </header>
  );
}
