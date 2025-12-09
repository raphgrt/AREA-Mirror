import { MOCK_SERVICES } from '../../mocks/services';
import { IntegrationCard } from './IntegrationCard';

export function IntegrationGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SERVICES.map((service) => (
                <IntegrationCard
                    key={service.id}
                    name={service.name}
                    description={service.description}
                    icon={service.icon}
                    isConnected={false}
                    onConnect={() => console.log(`Connecting to ${service.name}...`)}
                />
            ))}
        </div>
    );
}
