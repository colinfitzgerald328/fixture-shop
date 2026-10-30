import { useFlags } from 'launchdarkly-react-client-sdk';

export function Footer() {
  const { searchBar } = useFlags();
  return <footer>{searchBar && <FooterSearch />}<Links /></footer>;
}
