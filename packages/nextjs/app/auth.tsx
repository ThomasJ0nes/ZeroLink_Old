"use client";

import { useEffect, useState } from "react";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";
import { NextPage } from "next";

const clientId = "BES8NKuLsgCGtmYytKcQcWlv8g2BlRl8ABWBcbljuB1nX5qE_gSie03KIZNpfHf9_YmVv4zpoJznpc6LGq_6lgY";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7", // Ethereum Sepolia Testnet
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const AuthPage: NextPage = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,
          web3AuthNetwork: "sapphire_mainnet",
          privateKeyProvider,
        });

        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);

        if (web3authInstance.provider) {
          setProvider(web3authInstance.provider);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to initialize Web3Auth", error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (web3auth) {
      try {
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
        if (web3auth.connected) {
          setLoggedIn(true);
          await getUserInfo();
        }
      } catch (error) {
        console.error("Failed to login with Web3Auth", error);
      }
    }
  };

  const getUserInfo = async () => {
    if (web3auth) {
      try {
        const user = await web3auth.getUserInfo();
        console.log("User info:", user);

        const ethersProvider = new ethers.BrowserProvider(provider as any);
        const signer = await ethersProvider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    }
  };

  const logout = async () => {
    if (web3auth) {
      try {
        await web3auth.logout();
        setProvider(null);
        setUserAddress(null);
        setLoggedIn(false);
        console.log("Logged out");
      } catch (error) {
        console.error("Failed to logout with Web3Auth", error);
      }
    }
  };

  const getBalance = async () => {
    if (provider) {
      try {
        const ethersProvider = new ethers.BrowserProvider(provider as any);
        const signer = await ethersProvider.getSigner();
        const balance = await ethersProvider.getBalance(signer.getAddress());
        console.log("Balance:", ethers.formatEther(balance));
      } catch (error) {
        console.error("Error getting balance:", error);
      }
    } else {
      console.log("Provider not initialized yet");
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <h1 className="text-center text-2xl mb-4">Connect Your Wallet</h1>
      {!loggedIn ? (
        <button onClick={login} className="px-4 py-2 bg-blue-500 text-white rounded">
          Connect Wallet with Web3Auth
        </button>
      ) : (
        <>
          <p className="mt-4">Connected Address: {userAddress}</p>
          <button onClick={getBalance} className="px-4 py-2 bg-green-500 text-white rounded mt-2">
            Get Balance
          </button>
          <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded mt-2">
            Log Out
          </button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
