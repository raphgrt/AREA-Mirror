import { Link } from '@tanstack/react-router'
import { LayoutDashboard, Link2, User, LogOut } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="h-screen w-64 bg-card border-r border-border text-foreground flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
          Area Flow
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Workflows" />
        <NavLink to="/connections" icon={<Link2 size={20} />} label="Connections" />
        <NavLink to="/profile" icon={<User size={20} />} label="Profile" />
      </nav>

      <div className="p-4 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-muted-foreground hover:text-accent-foreground hover:bg-accent rounded-lg transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-muted-foreground hover:text-accent-foreground hover:bg-accent"
      activeProps={{
        className: '!bg-primary !text-primary-foreground shadow-lg shadow-primary/20'
      }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
