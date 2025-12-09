import { WorkflowSummary } from '../types/workflow';

export const MOCK_WORKFLOWS: WorkflowSummary[] = [
  { id: '1', name: 'GitHub to Slack Alert', isActive: true, lastRun: '2 mins ago' },
  { id: '2', name: 'New Lead Processing', isActive: true, lastRun: '1 hour ago' },
  { id: '3', name: 'Weekly Database Backup', isActive: false, lastRun: '5 days ago' },
  { id: '4', name: 'Email Auto-responder', isActive: true, lastRun: 'Just now' },
]
