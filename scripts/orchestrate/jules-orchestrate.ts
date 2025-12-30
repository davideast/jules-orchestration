import { OrchestrationManager } from './manager.js';

async function run() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('❌ Missing GITHUB_TOKEN');
    process.exit(1);
  }

  const manager = new OrchestrationManager(token);
  const command = process.argv[2];

  switch (command) {
    case 'start-monorepo':
      try {
        const result = await manager.initMission('jules/monorepo-migration');

        console.log('\n🌟 MISSION STARTED SUCCESSFULLY');
        console.log(`----------------------------------`);
        console.log(`Mission: ${result.mission}`);
        console.log(`Branch:  ${result.branch}`);
        console.log(`URL:     https://github.com/davideast/modjules/tree/${result.branch}`);
        console.log(`----------------------------------`);
        console.log('Next steps:');
        console.log('1. Commit the Orchestrator GitHub Action to this branch.');
        console.log('2. Jules will begin Phase 1 automatically.');
      } catch (e: any) {
        console.error(`\n❌ Failed to start mission: ${e.message}`);
        process.exit(1);
      }
      break;

    default:
      console.log('Jules Orchestration CLI');
      console.log('Usage: npx tsx scripts/orchestrate/jules-orchestrate.ts [command]');
      console.log('\nAvailable Commands:');
      console.log('  start-monorepo  - Initiates the monorepo restructure mission');
  }
}

run();
