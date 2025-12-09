import { Link } from '@tanstack/react-router'
import { Clock, Plus } from 'lucide-react'
import clsx from 'clsx'
import { UserMenu } from './UserMenu'

type Workflow = {
  id: string
  name: string
  isActive: boolean
  lastRun: string
}

const MOCK_WORKFLOWS: Workflow[] = [
  { id: '1', name: 'GitHub to Slack Alert', isActive: true, lastRun: '2 mins ago' },
  { id: '2', name: 'New Lead Processing', isActive: true, lastRun: '1 hour ago' },
  { id: '3', name: 'Weekly Database Backup', isActive: false, lastRun: '5 days ago' },
  { id: '4', name: 'Email Auto-responder', isActive: true, lastRun: 'Just now' },
]

export function Sidebar() {
  return (
    <div className="absolute top-4 left-4 bottom-4 w-64 bg-card/95 backdrop-blur-sm border border-border/50 text-foreground flex flex-col font-sans rounded-2xl shadow-2xl z-30 transition-all duration-300">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Area Flow
        </h1>
      </div>

      <div className="px-4 py-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium border border-primary/20">
            <Plus size={16} />
            <span>New Workflow</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
          Your Workflows
        </div>
        {MOCK_WORKFLOWS.map((wf) => (
          <WorkflowItem key={wf.id} workflow={wf} />
        ))}
      </div>

      <UserMenu />
    </div>
  )
}

function WorkflowItem({ workflow }: { workflow: Workflow }) {
  return (
    <Link 
      to="/dashboard"
      className="group flex flex-col gap-1.5 p-3 rounded-xl border border-transparent hover:bg-accent hover:border-border/50 transition-all cursor-pointer"
      activeProps={{ className: '!bg-accent !border-border' }}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
            {workflow.name}
        </span>
        <div className={clsx(
            "w-2 h-2 rounded-full ring-2 ring-background transition-all",
            workflow.isActive 
                ? "bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/50" 
                : "bg-muted-foreground/30"
        )} />
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock size={12} />
        <span>{workflow.lastRun}</span>
      </div>
    </Link>
  )
}
