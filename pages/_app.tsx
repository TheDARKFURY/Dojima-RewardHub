import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import Router from 'next/router'
import '@rainbow-me/rainbowkit/styles.css';
import {
	getDefaultWallets,
	RainbowKitProvider, darkTheme 
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, dojima } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

function MyApp({ Component, pageProps }: AppProps) {

	const { chains, provider } = configureChains(
		[mainnet, polygon, optimism, arbitrum, dojima],
		[
			alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
			publicProvider()
		]
	);

	const { connectors } = getDefaultWallets({
		appName: 'My RainbowKit App',
		chains
	});

	const wagmiClient = createClient({
		autoConnect: true,
		connectors,
		provider
	})

	return (
		<Provider store={store}>
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider modalSize="compact" chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
		</Provider>
	)
}

export default MyApp
