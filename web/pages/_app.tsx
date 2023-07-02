import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import AppHeader from '@/components/layout/Header'
// import AppFooter from '@/components/layout/Footer'
import Layout from '@/components/Layout'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { fantom } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const projectId = process.env.NEXT_PUBLIC_PROJECTID as string // get one at https://cloud.walletconnect.com/app

const { chains, publicClient } = configureChains(
  [fantom],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Tmkt',
  projectId: projectId,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: publicClient,
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowKitProvider chains={chains} coolMode={true}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </RainbowKitProvider>
  // <>
  //   <AppHeader>heafe</AppHeader>
  //   <Component {...pageProps} />
  //   <AppFooter>footer</AppFooter>
  // </>
  )
}
