import type { ReactNode } from 'react';

interface IntegrationCardProps {
    name: string;
    description: string;
    icon: ReactNode;
    isConnected?: boolean;
    onConnect?: () => void;
}

export function IntegrationCard({ name, description, icon, isConnected = false, onConnect }: IntegrationCardProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-6 hover:border-muted-foreground/20 transition-colors">
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-muted rounded-lg text-foreground">
                    {icon}
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <span className={`text-xs uppercase tracking-wider ${isConnected ? 'text-green-500' : 'text-muted-foreground'}`}>
                        {isConnected ? 'Connected' : 'Not Connected'}
                    </span>
                </div>
            </div>
            <p className="text-muted-foreground text-sm mb-6">{description}</p>
            <button 
                onClick={onConnect}
                className={`w-full py-2 rounded-lg transition-colors border ${
                    isConnected 
                        ? 'bg-secondary/50 text-muted-foreground border-border cursor-default' 
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border'
                }`}
            >
                {isConnected ? 'Connected' : 'Connect'}
            </button>
        </div>
    );
}
