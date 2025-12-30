import { Octokit } from '@octokit/rest';
import { MONOREPO_MISSION } from './manifest.js';

export class OrchestrationManager {
  private octokit: Octokit;
  private owner = 'davideast';
  private repo = 'modjules';

  constructor(token: string) {
    this.octokit = new Octokit({ auth: token });
  }

  /**
   * Initializes a new autonomous mission on a specific branch
   */
  async initMission(branch: string, manifest: any = MONOREPO_MISSION) {
    console.log(`\n🤖 Initializing Jules Mission: "${manifest.mission}"`);

    // 1. Setup Branch
    const { data: main } = await this.octokit.git.getRef({ owner: this.owner, repo: this.repo, ref: 'heads/main' });
    await this.octokit.git.createRef({
      owner: this.owner,
      repo: this.repo,
      ref: `refs/heads/${branch}`,
      sha: main.object.sha
    });
    console.log(`✅ Created mission branch: ${branch}`);

    // 2. Commit Manifest
    await this.octokit.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      branch,
      path: 'orchestration-manifest.json',
      message: `chore: initialize mission manifest`,
      content: Buffer.from(JSON.stringify(manifest, null, 2)).toString('base64')
    });
    console.log(`✅ Persisted orchestration manifest`);

    return { branch, mission: manifest.mission };
  }
}
