import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { Toaster } from "react-hot-toast";

const client = new ApolloClient({
  uri: "https://api.cyberconnect.dev/testnet/",
  cache: new InMemoryCache(),
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY as string,
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    (window as any)?.ethereum?.on("accountsChanged", function () {
      // Time to reload your interface with accounts[0]!
      localStorage.clear();
    });
  }, []);
  return (
    <ThirdwebProvider activeChain={"binance-testnet"}>
      <LivepeerConfig client={livepeerClient}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
          <Toaster />
        </ApolloProvider>
      </LivepeerConfig>
    </ThirdwebProvider>
  );
}
