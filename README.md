# Website

Going to put everything I know about INSAT & its software engineering degree here

- CheatSheets
- Tips
- Guides
- PFE things

Contributions through PRs are always welcome

## Setup

Make sure Volta is installed and configured on your system. This project relies on **specific** node & yarn versions.

### Unix/Linux

```bash
curl https://get.volta.sh | bash
```

### Windows

Follow this [guide](https://docs.volta.sh/guide/getting-started)

### Installation

Install your dependencies. **Yarn V2** [Plug'n'Play](https://yarnpkg.com/features/pnp) is active and you won't find any node_module folder.

```bash
yarn
```

For Vscode userS make sure to apply .vscode/settings.json when promoted

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
