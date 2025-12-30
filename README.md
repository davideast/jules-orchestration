# jules-orchestration

## Jules Orchestration CLI

The Jules Orchestration CLI acts as a "Control Plane" for autonomous multi-step tasks. It manages the lifecycle of missions, such as monorepo restructuring, by handling state transitions and GitHub interactions.

### Prerequisites

- **Bun**: Ensure Bun is installed.
- **GitHub Token**: You need a GitHub Personal Access Token with repo permissions.

### Setup

Set your GitHub token as an environment variable:

```bash
export GITHUB_TOKEN=your_token_here
```

### Usage

Run the CLI using `bun` or `npx tsx`:

```bash
# Start the Monorepo Restructure Mission
bun run scripts/orchestrate/jules-orchestrate.ts start-monorepo
```

### Available Commands

- `start-monorepo`: Initiates the monorepo restructure mission, creating a new branch and persisting the orchestration manifest.

### Testing

To run the orchestration tests:

```bash
bun run test:orchestrate
```
