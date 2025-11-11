"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Cpu,
  Shield,
  Zap,
  Lock,
  TrendingUp,
  Server,
  Brain,
  CheckCircle2,
  Clock,
  Wallet,
  BarChart3,
  AlertTriangle,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { geist } from "@/lib/fonts"

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [nodeStatus, setNodeStatus] = useState<"active" | "inactive" | "syncing">("active")
  const [computeProgress, setComputeProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")
  const [hasNodes, setHasNodes] = useState(false)
  const [hasProofs, setHasProofs] = useState(false)
  const [showTokenModal, setShowTokenModal] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Simulate checking if user has nodes or proofs
    setTimeout(() => {
      setHasNodes(false)
      setHasProofs(false)
    }, 1000)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {showTokenModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowTokenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="border-2 border-primary/50 shadow-2xl">
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">$NZIDIA Required</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Access to compute resources requires $NZIDIA tokens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p className="text-foreground font-medium">Why do I need $NZIDIA?</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>$NZIDIA tokens are used as compute credits on the ZPU network</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Every computation, zkProof generation, and AI query consumes credits</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Hold tokens to deploy nodes and earn rewards from the network</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-medium mb-2">Minimum Requirements:</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Basic Access</span>
                      <span className="font-bold text-primary">100 $NZIDIA</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Node Deployment</span>
                      <span className="font-bold text-primary">1,000 $NZIDIA</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowTokenModal(false)}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      Continue Browsing
                    </Button>
                    <Button className="flex-1 gap-2">
                      <Wallet className="h-4 w-4" />
                      Buy $NZIDIA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/nzidia-logo.png" alt="NZIDIA" className="h-10 w-10" />
              <h1 className={cn("text-2xl font-bold", geist.className)}>ZPU Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-2">
                <Activity className="h-3 w-3" />
                Network Active
              </Badge>
              <Button size="sm" className="gap-2">
                <Wallet className="h-4 w-4" />
                Connected
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Compute</CardTitle>
                <Cpu className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0 Hours</div>
                <p className="text-xs text-muted-foreground mt-1">Start computing to earn rewards</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">zkProofs Generated</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">Generate your first proof</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">$NZIDIA Earned</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">Deploy nodes to earn</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="border-2 border-border hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
                <Server className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">Deploy your first node</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nodes">ZPU Nodes</TabsTrigger>
            <TabsTrigger value="agents">ZAI Agents</TabsTrigger>
            <TabsTrigger value="proofs">zkProofs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Active Compute Jobs */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Active Compute Jobs
                  </CardTitle>
                  <CardDescription>Currently processing tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">AI Model Training</span>
                      <Badge variant="secondary">No Jobs</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground">Deploy a node to start computing</p>
                  </div>

                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No active compute jobs. Deploy your first ZPU node to start earning rewards.
                  </div>
                </CardContent>
              </Card>

              {/* Network Stats */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Network Statistics
                  </CardTitle>
                  <CardDescription>Real-time ZPU network data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Global Nodes</span>
                    <span className="text-lg font-bold">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Network Hashrate</span>
                    <span className="text-lg font-bold">1.2 PH/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg. Proof Time</span>
                    <span className="text-lg font-bold">0.8s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Privacy Score</span>
                    <span className="text-lg font-bold text-primary">99.9%</span>
                  </div>
                  <div className="pt-4 border-t">
                    <Button className="w-full gap-2">
                      <Activity className="h-4 w-4" />
                      View Full Network Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest compute operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Compute", desc: "AI inference completed", time: "2 min ago", icon: Brain },
                    { type: "Proof", desc: "zkSNARK generated for transaction", time: "15 min ago", icon: Shield },
                    { type: "Reward", desc: "Earned 120 $NZIDIA", time: "1 hour ago", icon: TrendingUp },
                    { type: "Node", desc: "Node #3 came online", time: "3 hours ago", icon: Server },
                  ].map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.desc}</p>
                        <p className="text-xs text-muted-foreground">{activity.type}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ZPU Nodes Tab */}
          <TabsContent value="nodes" className="space-y-6">
            {!hasNodes && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Your ZPU Nodes</CardTitle>
                  <CardDescription>No nodes deployed yet</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-6">Deploy your first ZPU node to start earning rewards</p>
                  <Button className="gap-2">
                    <Server className="h-4 w-4" />
                    Deploy Your First Node
                  </Button>
                </CardContent>
              </Card>
            )}
            {hasNodes && (
              <div className="grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((nodeNum) => (
                  <Card key={nodeNum} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">ZPU Node #{nodeNum}</CardTitle>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                          <Activity className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <CardDescription>Private compute provider</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Uptime</span>
                          <span className="font-medium">99.8%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tasks Completed</span>
                          <span className="font-medium">{2847 + nodeNum * 100}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Earnings</span>
                          <span className="font-medium text-primary">{15000 + nodeNum * 77} $NZIDIA</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">CPU Usage</span>
                          <span className="font-medium">{45 + nodeNum * 10}%</span>
                        </div>
                        <Progress value={45 + nodeNum * 10} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Server className="h-3 w-3 mr-1" />
                          Manage
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Stats
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Deploy New Node</CardTitle>
                <CardDescription>Earn rewards by providing compute power to the ZPU network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Requirements</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Minimum 1000 $NZIDIA staked</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>8GB RAM or higher</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Stable internet connection</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Estimated Rewards</h4>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <p className="text-2xl font-bold text-primary">~500 $NZIDIA</p>
                      <p className="text-xs text-muted-foreground mt-1">Per day based on current rates</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4 gap-2">
                  <Server className="h-4 w-4" />
                  Deploy New Node
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ZAI Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Private AI Agent
                </CardTitle>
                <CardDescription>Chat with AI while keeping your data private using ZPU compute</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-border bg-muted/20 p-4 min-h-[300px] max-h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 bg-card rounded-lg p-3 shadow-sm">
                          <p className="text-sm">
                            Hello! I'm your private ZAI agent. All conversations are processed on ZPU nodes using
                            zkSNARKs for maximum privacy. How can I assist you today?
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <div className="flex-1 max-w-[80%] bg-primary/10 rounded-lg p-3">
                          <p className="text-sm">What's the weather like?</p>
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Lock className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 bg-card rounded-lg p-3 shadow-sm">
                          <p className="text-sm">
                            I don't have access to real-time weather data, but I can help you with AI model training,
                            data analysis, code generation, and more—all privately computed on the ZPU network.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your private query..."
                      className="flex-1 px-4 py-2 rounded-lg border-2 border-border bg-background focus:border-primary focus:outline-none"
                    />
                    <Button className="gap-2">
                      <Zap className="h-4 w-4" />
                      Send
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-primary" />
                      <span>End-to-end encrypted · Zero-knowledge proofs enabled</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Privacy: 99.9%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { name: "Code Assistant", desc: "Generate code privately", tasks: 847 },
                { name: "Data Analyzer", desc: "Analyze datasets securely", tasks: 1234 },
                { name: "Research Agent", desc: "Private research queries", tasks: 562 },
              ].map((agent, idx) => (
                <Card key={idx} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-base">{agent.name}</CardTitle>
                    <CardDescription className="text-xs">{agent.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tasks Completed</span>
                      <span className="font-medium">{agent.tasks}</span>
                    </div>
                    <Button size="sm" className="w-full gap-2">
                      <Brain className="h-3 w-3" />
                      Launch Agent
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* zkProofs Tab */}
          <TabsContent value="proofs" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Proof of Compute
                </CardTitle>
                <CardDescription>Verifiable zero-knowledge proofs for all computations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "so1111...92fe", type: "AI Training", status: "Verified", time: "5 min ago" },
                    { id: "so1111...18af", type: "Data Processing", status: "Verified", time: "12 min ago" },
                    { id: "so1111...45cd", type: "Model Inference", status: "Pending", time: "18 min ago" },
                    { id: "so1111...67de", type: "Encryption", status: "Verified", time: "1 hour ago" },
                    { id: "so1111...91bc", type: "Smart Contract", status: "Verified", time: "2 hours ago" },
                  ].map((proof, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-lg border-2 hover:border-primary/50 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm font-medium">{proof.id}</p>
                          <Badge variant={proof.status === "Verified" ? "default" : "secondary"} className="text-xs">
                            {proof.status === "Verified" ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {proof.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-xs text-muted-foreground">{proof.type}</p>
                          <p className="text-xs text-muted-foreground">{proof.time}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Proof
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Generate New Proof</CardTitle>
                  <CardDescription>Create zkSNARK proof for your computation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Computation Type</label>
                    <select className="w-full px-3 py-2 rounded-lg border-2 border-border bg-background">
                      <option>AI Model Training</option>
                      <option>Data Processing</option>
                      <option>Smart Contract Execution</option>
                      <option>Transaction Verification</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Input Data</label>
                    <textarea
                      className="w-full px-3 py-2 rounded-lg border-2 border-border bg-background min-h-[100px]"
                      placeholder="Enter computation data..."
                    />
                  </div>
                  <Button className="w-full gap-2">
                    <Shield className="h-4 w-4" />
                    Generate zkProof
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Verification Stats</CardTitle>
                  <CardDescription>Your proof generation statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Proofs</span>
                      <span className="text-xl font-bold">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Verification Rate</span>
                      <span className="text-xl font-bold text-primary">--</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Avg. Generation Time</span>
                      <span className="text-xl font-bold">--</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Gas Saved</span>
                      <span className="text-xl font-bold">0 SOL</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <BarChart3 className="h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
