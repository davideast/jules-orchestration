export interface OrchestrationTask {
  id: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  sessionId: string | null;
  prNumber?: number | null;
}

export interface OrchestrationPhase {
  id: number;
  name: string;
  strategy: 'sequential' | 'parallel';
  tasks: OrchestrationTask[];
}

export interface OrchestrationManifest {
  mission: string;
  version: string;
  currentPhase: number;
  phases: OrchestrationPhase[];
}

/**
 * Default template for the Monorepo Restructure Mission
 */
export const MONOREPO_MISSION: OrchestrationManifest = {
  mission: 'Monorepo Restructure',
  version: '1.0.0',
  currentPhase: 1,
  phases: [
    {
      id: 1,
      name: 'foundation',
      strategy: 'sequential',
      tasks: [
        {
          id: 'setup-core',
          description: 'Initialize workspaces and extract @modjules/core.',
          status: 'pending',
          sessionId: null
        }
      ]
    },
    {
      id: 2,
      name: 'adapters',
      strategy: 'parallel',
      tasks: [
        { id: 'node-adapter', description: 'Extract @modjules/node.', status: 'pending', sessionId: null },
        { id: 'browser-adapter', description: 'Extract @modjules/browser.', status: 'pending', sessionId: null },
        { id: 'gateway-adapter', description: 'Extract @modjules/gateway.', status: 'pending', sessionId: null }
      ]
    }
  ]
};
