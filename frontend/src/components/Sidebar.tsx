import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { 
  User as UserIcon, 
  LogOut, 
  Link2, 
  Settings, 
  MoreVertical,
  Clock,
  Plus
} from 'lucide-react'
import clsx from 'clsx'

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

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

      <div className="p-4 border-t border-border relative">
        {/* User Menu Popover */}
        {isUserMenuOpen && (
          <>
            {/* Backdrop to close on click outside */}
            <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsUserMenuOpen(false)} 
            />
            <div className="absolute bottom-full left-4 right-4 mb-2 z-20">
                <div className="bg-popover border border-border rounded-xl shadow-xl overflow-hidden p-1 animate-in slide-in-from-bottom-2 fade-in duration-200">
                    <Link 
                        to="/connections" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                    >
                        <Link2 size={16} /> Connections
                    </Link>
                    <Link 
                        to="/profile" 
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                    >
                        <Settings size={16} /> Profile
                    </Link>
                    <div className="h-px bg-border my-1" />
                    <Link
                        to="/login"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                        <LogOut size={16} /> Logout
                    </Link>
                </div>
            </div>
          </>
        )}

        <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={clsx(
                "relative z-10 flex items-center gap-3 w-full p-2 rounded-xl transition-all border border-transparent",
                isUserMenuOpen ? "bg-accent border-border" : "hover:bg-accent/50"
            )}
        >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <UserIcon size={20} />
            </div>
            <div className="flex-1 text-left overflow-hidden">
                <div className="font-medium text-sm truncate text-foreground">John Doe</div>
                <div className="text-xs text-muted-foreground truncate">john@example.com</div>
            </div>
            <MoreVertical size={16} className="text-muted-foreground" />
        </button>
      </div>
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
