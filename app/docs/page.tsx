"use client"
import { useState, useEffect } from "react"
import { ChevronRight, Shield, Cpu, Network, Lock, Code, FileText } from "lucide-react"

export default function DocsPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("introduction")

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { id: "introduction", label: "Introduction", icon: FileText },
    { id: "architecture", label: "Architecture", icon: Network },
    { id: "zpu-nodes", label: "ZPU Nodes", icon: Cpu },
    { id: "zksnarks", label: "zkSNARKs", icon: Shield },
    { id: "zai-agents", label: "ZAI Agents", icon: Code },
    { id: "security", label: "Security", icon: Lock },
  ]

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Pearl Mist Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(132, 194, 37, 0.12), transparent 60%), #000000",
        }}
      />

      {/* Desktop Header */}
      <header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
        } py-2`}
      >
        <a
          className={`z-50 flex items-center justify-center gap-2 transition-all duration-300 ${
            isScrolled ? "ml-4" : ""
          }`}
          href="/"
        >
          <img src="/nzidia-logo.png" alt="NZIDIA" className="text-foreground rounded-full size-8 w-8 object-contain" />
        </a>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            href="/"
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="relative z-20">Home</span>
          </a>
          <a href="/docs" className="relative px-4 py-2 text-foreground transition-colors cursor-pointer">
            <span className="relative z-20">Docs</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/whitepaper"
            className="font-medium transition-colors hover:text-foreground text-muted-foreground text-sm cursor-pointer"
          >
            Whitepaper
          </a>

          <a
            href="/buy"
            className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] px-4 py-2 text-sm"
          >
            Buy $NZIDIA
          </a>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <a className="flex items-center justify-center gap-2" href="/">
          <img src="/nzidia-logo.png" alt="NZIDIA" className="text-foreground rounded-full size-7 w-7 object-contain" />
        </a>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 border border-border/50 transition-colors hover:bg-background/80"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-4 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </div>
        </button>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Documentation</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
              {/* Introduction */}
              {activeSection === "introduction" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                      Welcome to NZIDIA
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      NZIDIA is revolutionizing the intersection of artificial intelligence and blockchain technology by
                      providing privacy-preserving compute infrastructure for the next generation of AI applications.
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">What is NZIDIA?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      NZIDIA combines NVIDIA's powerful GPU technology with zero-knowledge proofs to create a
                      decentralized AI compute network. Our platform enables developers to run AI models with
                      cryptographic guarantees of privacy and correctness.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Privacy-first AI inference powered by zkSNARKs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">Decentralized network of ZPU compute nodes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Autonomous ZAI agents for intelligent task execution
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2">Getting Started</h3>
                    <p className="text-muted-foreground text-sm">
                      Ready to build on NZIDIA? Check out our SDK documentation, deploy your first ZAI agent, or run a
                      ZPU node to start earning rewards.
                    </p>
                  </div>
                </div>
              )}

              {/* Architecture */}
              {activeSection === "architecture" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                      System Architecture
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      NZIDIA's architecture is built on three core pillars: decentralized compute, cryptographic proofs,
                      and autonomous intelligence.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                      <Network className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">Compute Layer</h3>
                      <p className="text-muted-foreground text-sm">
                        Distributed network of ZPU nodes providing GPU compute resources for AI inference and training.
                      </p>
                    </div>
                    <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                      <Shield className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">Proof Layer</h3>
                      <p className="text-muted-foreground text-sm">
                        zkSNARK verification system ensuring compute integrity and data privacy across all operations.
                      </p>
                    </div>
                    <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                      <Code className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">Agent Layer</h3>
                      <p className="text-muted-foreground text-sm">
                        ZAI autonomous agents that orchestrate tasks, manage resources, and execute smart contracts.
                      </p>
                    </div>
                    <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                      <Lock className="w-8 h-8 text-primary mb-4" />
                      <h3 className="text-xl font-bold text-foreground mb-2">Security Layer</h3>
                      <p className="text-muted-foreground text-sm">
                        Multi-layered security protocols protecting data in transit, at rest, and during computation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ZPU Nodes */}
              {activeSection === "zpu-nodes" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                      ZPU Node Infrastructure
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Zero-knowledge Processing Units (ZPUs) are the backbone of NZIDIA's decentralized compute network.
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Running a ZPU Node</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Node operators provide GPU compute resources and earn $NZIDIA tokens for verified computation.
                      Requirements include NVIDIA GPUs, minimum stake, and network connectivity.
                    </p>

                    <div className="bg-background/80 border border-border/50 rounded-xl p-6 space-y-4">
                      <h3 className="text-lg font-bold text-foreground">Hardware Requirements</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">
                            NVIDIA RTX 3080 or higher (24GB+ VRAM recommended)
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">64GB+ system RAM</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">1TB+ NVMe storage</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">1Gbps+ network connection</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* zkSNARKs */}
              {activeSection === "zksnarks" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                      Zero-Knowledge Proofs
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      NZIDIA leverages zkSNARKs to provide cryptographic guarantees of computation correctness without
                      revealing sensitive data.
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">How zkSNARKs Work</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge enable verification of computation
                      without exposing the underlying data or model parameters.
                    </p>

                    <div className="space-y-4">
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Privacy Preservation</h3>
                        <p className="text-muted-foreground text-sm">
                          Your AI models and data remain completely private while still producing verifiable results.
                        </p>
                      </div>
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Compute Verification</h3>
                        <p className="text-muted-foreground text-sm">
                          Every inference is accompanied by a cryptographic proof that the computation was performed
                          correctly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ZAI Agents */}
              {activeSection === "zai-agents" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                      ZAI Autonomous Agents
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      ZAI agents are intelligent programs that execute complex tasks autonomously on the NZIDIA network.
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Agent Capabilities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Task Orchestration</h3>
                        <p className="text-muted-foreground text-sm">
                          Agents can break down complex workflows into subtasks and coordinate execution across multiple
                          ZPU nodes.
                        </p>
                      </div>
                      <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Resource Management</h3>
                        <p className="text-muted-foreground text-sm">
                          Intelligent allocation of compute resources based on task requirements and network
                          availability.
                        </p>
                      </div>
                      <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Smart Contracts</h3>
                        <p className="text-muted-foreground text-sm">
                          Automated execution of on-chain transactions and protocol interactions.
                        </p>
                      </div>
                      <div className="bg-background/80 border border-border/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-foreground mb-2">Adaptive Learning</h3>
                        <p className="text-muted-foreground text-sm">
                          Agents improve their performance over time by learning from past executions and outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security */}
              {activeSection === "security" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                      Security & Privacy
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      NZIDIA implements multiple layers of security to protect your data and ensure network integrity.
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-6 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">End-to-End Encryption</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        All data transmitted across the NZIDIA network is encrypted using industry-standard protocols.
                        Model parameters and inference data never leave your control unencrypted.
                      </p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">Network Security</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Our proof-of-compute consensus ensures that only valid work is rewarded and malicious nodes are
                        identified and penalized.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Stake-based sybil resistance</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Cryptographic proof verification</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Automated slashing for malicious behavior</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <ChevronRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">Regular security audits</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
