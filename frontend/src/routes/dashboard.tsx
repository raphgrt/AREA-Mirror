import { useState, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  BackgroundVariant,
  type Connection,
  type Node
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Plus, X, Zap, Box, Split } from 'lucide-react'
import { DashboardLayout } from '../components/DashboardLayout'
import { DashboardHeader } from '../components/DashboardHeader'
import clsx from 'clsx'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

const INITIAL_NODES: Node[] = [
  { 
    id: '1', 
    position: { x: 350, y: 200 }, 
    data: { label: 'Webhook Trigger' },
    type: 'input',
    style: { background: 'var(--node-webhook)', color: 'white', border: '1px solid var(--border)', width: 180 }
  },
]

const NODE_TYPES = [
  { type: 'input', label: 'Webhook', icon: <Zap size={16} />, color: 'bg-node-webhook', desc: 'Start flow on HTTP request' },
  { type: 'default', label: 'Action', icon: <Box size={16} />, color: 'bg-node-action', desc: 'Perform an operation' },
  { type: 'output', label: 'Response', icon: <Split size={16} />, color: 'bg-node-response', desc: 'Return data to webhook' },
]

function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isWorkflowActive, setIsWorkflowActive] = useState(true)

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds))
  }, [setEdges])

  const addNode = (type: string, label: string) => {
    const newNode: Node = {
      id: Math.random().toString(36).substr(2, 9),
      position: { 
        x: Math.random() * 400 + 350, 
        y: Math.random() * 400 + 200 
      },
      data: { label },
      type,
      style: { 
        background: 'var(--card)', 
        color: 'var(--foreground)', 
        border: '1px solid var(--border)',
        width: 180,
        padding: '10px',
        borderRadius: '8px',
      }
    }
    setNodes((nds) => [...nds, newNode])
    setIsDrawerOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="h-full w-full relative bg-background overflow-hidden">
        <DashboardHeader 
          workflowName="GitHub to Slack Alert"
          isActive={isWorkflowActive}
          onToggleActive={() => setIsWorkflowActive(!isWorkflowActive)}
          onDelete={() => alert('Delete workflow?')}
          onSave={() => alert('Save workflow?')}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode="dark"
        >
          <Background color="var(--border)" gap={16} variant={BackgroundVariant.Dots} />
          <Controls className="bg-card border-border fill-foreground" position="bottom-left" style={{ marginBottom: 80, marginLeft: 270 }} />
          <MiniMap className="bg-card border-border" nodeColor="var(--muted)" position="bottom-right" style={{ marginBottom: 100 }} />
        </ReactFlow>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="absolute bottom-8 right-8 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-105 z-20"
        >
          <Plus size={28} />
        </button>

        {/* Drawer */}
        <div
          className={clsx(
            "absolute top-4 bottom-4 right-4 w-80 bg-card/95 backdrop-blur border border-border/50 shadow-2xl rounded-2xl transition-transform duration-300 ease-in-out z-30",
            isDrawerOpen ? "translate-x-0" : "translate-x-[110%]"
          )}
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-lg">Add Node</h2>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 hover:bg-accent rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            {NODE_TYPES.map((node) => (
              <button
                key={node.label}
                onClick={() => addNode(node.type, node.label)}
                className="w-full flex items-start gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-accent hover:border-accent-foreground/20 transition-all text-left group"
              >
                <div className={clsx("p-2 rounded-md text-white", node.color)}>
                  {node.icon}
                </div>
                <div>
                  <div className="font-medium text-foreground group-hover:text-foreground">{node.label}</div>
                  <div className="text-xs text-muted-foreground">{node.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
