import { useFlags } from 'launchdarkly-react-client-sdk';
import { SearchAutocomplete } from './SearchAutocomplete';

export function Header({ user }) {
  const { searchBar, searchAutocomplete } = useFlags();
  return (
    <header>
      <Logo />
      {searchBar && (searchAutocomplete ? <SearchAutocomplete /> : <Search />)}
      <Account name={user.name} />
    </header>
  );
}
