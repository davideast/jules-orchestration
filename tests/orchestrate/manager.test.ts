import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrchestrationManager } from '../../scripts/orchestrate/manager';
import { Octokit } from '@octokit/rest';

vi.mock('@octokit/rest', () => {
  return {
    Octokit: vi.fn()
  };
});

describe('OrchestrationManager', () => {
  let manager: OrchestrationManager;

  const mockOctokitInstance = {
    git: {
      getRef: vi.fn(),
      createRef: vi.fn(),
    },
    repos: {
      createOrUpdateFileContents: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Use a regular function so it can be called with 'new'
    (Octokit as any).mockImplementation(function() {
      return mockOctokitInstance;
    });

    manager = new OrchestrationManager('fake-token');
  });

  it('should initialize a mission by creating a branch and manifest', async () => {
    (mockOctokitInstance.git.getRef as any).mockResolvedValue({ data: { object: { sha: 'main-sha' } } });
    (mockOctokitInstance.git.createRef as any).mockResolvedValue({});
    (mockOctokitInstance.repos.createOrUpdateFileContents as any).mockResolvedValue({});

    const result = await manager.initMission('test-branch');

    expect(mockOctokitInstance.git.getRef).toHaveBeenCalledWith(expect.objectContaining({ ref: 'heads/main' }));
    expect(mockOctokitInstance.git.createRef).toHaveBeenCalledWith(expect.objectContaining({
      ref: 'refs/heads/test-branch',
      sha: 'main-sha'
    }));
    expect(result.branch).toBe('test-branch');
  });

  it('should capture the manifest structure in a snapshot', async () => {
    const { MONOREPO_MISSION } = await import('../../scripts/orchestrate/manifest');
    expect(MONOREPO_MISSION).toMatchSnapshot();
  });
});
