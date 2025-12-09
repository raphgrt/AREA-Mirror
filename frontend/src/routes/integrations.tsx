import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '../components/dashboard/DashboardLayout'
import { IntegrationGrid } from '../components/integrations/IntegrationGrid'

export const Route = createFileRoute('/integrations')({
  component: Integrations,
})

function Integrations() {
  return (
    <DashboardLayout>
      <div className="p-8 pl-72">
        <h1 className="text-3xl font-bold mb-8">Integrations</h1>
        <IntegrationGrid />
      </div>
    </DashboardLayout>
  )
}
