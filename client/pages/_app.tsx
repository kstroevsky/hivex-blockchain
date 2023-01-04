import { createClient, WagmiConfig } from 'wagmi';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '../firebase';

import { getDefaultProvider } from 'ethers';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default App;
