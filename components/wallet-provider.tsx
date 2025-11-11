"use client"

import { useMemo, type ReactNode, useCallback } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import type { WalletError } from "@solana/wallet-adapter-base"

import "@solana/wallet-adapter-react-ui/styles.css"

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => clusterApiUrl("mainnet-beta"), [])

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [])

  const onError = useCallback((error: WalletError) => {
    console.log("[v0] Wallet error caught:", error.message)

    // Don't show error toast for user-rejected connections
    if (error.message?.includes("User rejected")) {
      console.log("[v0] User cancelled wallet connection")
      return
    }

    // Log other errors but don't throw
    console.error("[v0] Wallet error:", error)
  }, [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
