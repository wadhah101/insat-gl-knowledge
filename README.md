# INSAT GL knowledge

A Guide on how to survive software engineering in INSAT. You will find tips, references,  projects & cheat sheets.

## Contributions

This project is principally community driven and needs **your support**, every line **helps**.

Adding courses, cheat sheets, links to projects, exams and any content related to Software engineering that would prove useful is welcome.

Even if you don't have content to add to the project you can check the [issues](https://github.com/wadhah101/insat-gl-knowledge/issues) for any potential bugs and tasks.

New to open-source ? Please read [this guide](https://www.dataschool.io/how-to-contribute-on-github/) on how to contribute to open-source projects

## Setup

This project makes use of [Volta](https://volta.sh/) to manage the node and yarn versions.

Make sure [Volta](https://volta.sh/) is installed and configured on your system. This project relies on **specific** node & yarn versions.

### Unix/Linux

```bash
curl https://get.volta.sh | bash
```

### Windows

Follow this [guide](https://docs.volta.sh/guide/getting-started)

### Dependencies Installation

Install your dependencies. **Yarn V2** [Plug'n'Play](https://yarnpkg.com/features/pnp) is active and you won't find any node_module folder.

```bash
yarn
```

For Vscode users make sure to apply .vscode/settings.json when promoted

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
