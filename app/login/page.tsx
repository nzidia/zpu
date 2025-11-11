"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { SolanaWalletProvider } from "@/components/wallet-provider"
import { Wallet, Shield, Zap, CheckCircle2 } from "lucide-react"

function ConnectWalletContent() {
  const { connected, publicKey, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 text-zinc-400 hover:text-[#84c225] transition-colors duration-200 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>

      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-[#0a0a0a] to-zinc-900" />

      <div className="absolute top-20 left-20 w-72 h-72 bg-[#84c225]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#84c225]/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/nzidia-logo.png" alt="NZIDIA" className="h-16 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            {connected ? "Wallet Connected" : "Connect Your Wallet"}
          </h1>
          <p className="text-zinc-400">
            {connected ? "Access your NZIDIA ecosystem" : "Join the privacy-first AI revolution on Solana"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8"
        >
          {!connected ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-[#84c225] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Privacy Protected</h3>
                    <p className="text-sm text-zinc-400">Your data stays encrypted with zkSNARKs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-[#84c225] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Instant Access</h3>
                    <p className="text-sm text-zinc-400">Start using ZAI agents immediately</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Wallet className="w-5 h-5 text-[#84c225] mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium">Earn Rewards</h3>
                    <p className="text-sm text-zinc-400">Stake $NZIDIA and run VPU nodes</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-zinc-900/50 text-zinc-500">Select your wallet</span>
                </div>
              </div>

              <div className="wallet-adapter-button-container flex justify-center">
                {mounted && (
                  <WalletMultiButton className="!bg-[#84c225] hover:!bg-[#84c225]/90 !text-white !font-medium !py-3 !px-6 !rounded-xl !transition-colors" />
                )}
              </div>

              <p className="text-xs text-zinc-500 text-center">
                By connecting, you agree to NZIDIA's Terms of Service and Privacy Policy
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#84c225]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#84c225]" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Successfully Connected</h3>
                  <p className="text-sm text-zinc-400 font-mono">
                    {publicKey ? shortenAddress(publicKey.toString()) : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-[#84c225] hover:bg-[#84c225]/90 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button
                  onClick={disconnect}
                  variant="outline"
                  className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white py-3 rounded-xl transition-colors"
                >
                  Disconnect Wallet
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-zinc-500">
            Need help?{" "}
            <Link href="/docs" className="text-[#84c225] hover:text-[#84c225]/80 font-medium">
              View Documentation
            </Link>
          </p>
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .wallet-adapter-button {
          background-color: #84c225 !important;
        }
        .wallet-adapter-button:not([disabled]):hover {
          background-color: rgba(132, 194, 37, 0.9) !important;
        }
        .wallet-adapter-modal-wrapper {
          background: rgba(0, 0, 0, 0.8) !important;
        }
        .wallet-adapter-modal {
          background: #18181b !important;
          border: 1px solid #27272a !important;
          border-radius: 1rem !important;
        }
        .wallet-adapter-modal-title {
          color: white !important;
        }
        .wallet-adapter-modal-list {
          background: transparent !important;
        }
        .wallet-adapter-modal-list li button {
          background: #27272a !important;
          border: 1px solid #3f3f46 !important;
          border-radius: 0.75rem !important;
        }
        .wallet-adapter-modal-list li button:hover {
          background: #3f3f46 !important;
          border-color: #84c225 !important;
        }
      `}</style>
    </div>
  )
}

export default function ConnectWalletPage() {
  return (
    <SolanaWalletProvider>
      <ConnectWalletContent />
    </SolanaWalletProvider>
  )
}
