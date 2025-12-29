# Upgrades
1. Create and push a new branch for your updates/upgrades from the `master` branch.
1. Upgrading software versions will require changes to these files at a minimum (see history):
   * package.json
   * .nvmrc
   * tsconfig.json
   * README.md
   * CHANGELOG.md
<br/><br/>
1. Once done, run `npm run clean` or `yarn clean` to clean the project.
1. Then run `npm install` or `yarn install` to install all the new dependencies.

# Code standards

The repository uses the following to enforce code standards:
- [Biome](https://biomejs.dev/) for formatting & linting

All code **MUST** pass linting and formatting checks before being merged.
- All errors **MUST** be fixed or disabled with a comment. If you disable a rule, please add a comment explaining why.
- All warnings **SHOULD** be fixed where possible.

## Biome Usage
- Please setup your IDE to use the Biome extension for real-time feedback.
  - VSCode:
    * [VSCode Biome Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
  - IntelliJ/Webstorm:
    * [IntelliJ/Webstorm Biome Plugin](https://plugins.jetbrains.com/plugin/22761-biome)

- To lint any directory at the command line, run the following script in any directory of the repository.
  ```bash
  biome lint .
  ```
  * Lint options (such as `--write`) can be found [here](https://biomejs.dev/reference/cli/#biome-lint).

- To format any file at the command line, run the following script in any directory of the repository.
  ```bash
  biome format <filename>
  ```
  * Format options (such as `--write` and `--staged`) can be found [here](https://biomejs.dev/reference/cli/#biome-format).

- To lint, format and sort the imports of any file at the command line, run the following script in any directory of the repository.
  ```bash
  biome check <filename>
  ```
  * Check options can be found [here](https://biomejs.dev/reference/cli/#biome-check).

# Building
1. Run `npm run build` or `yarn build`
1. This will generate the files `builders/obfuscate/index.js` and `index.js.map`

# Testing
1. Open an existing project that uses ngx-source-obfuscation (or create a new one with it as a dependency).
1. Open the file `node_modules/@russcarver/ngx-source-obfuscation/builders/obfuscate/index.js` and replace its contents with those from a local build of ngx-source-obfuscation (same file).
1. Open the file `node_modules/@russcarver/ngx-source-obfuscation/builders/obfuscate/index.js.map` and replace its contents with those from a local build of ngx-source-obfuscation (same file).
1. If changed, open the file `node_modules/@russcarver/ngx-source-obfuscation/builders/obfuscate/options.d.ts` and replace its contents with those from a local build of ngx-source-obfuscation (same file).
1. If changed, open the file `node_modules/@russcarver/ngx-source-obfuscation/builders/obfuscate/schema.json` and replace its contents with those from a local build of ngx-source-obfuscation (same file).
1. Run the obfuscation in your app and test that the resulting output works when run.

# Publishing
Once you are satisfied with all your changes, perform the following steps to publish:
1. Create a PR into the `master` branch from your branch.
1. Merge the PR into the `master` branch after review.
1. Create a new Tag (https://github.com/russcarver/ngx-source-obfuscation/tags) from the `master` branch.
1. Create a new Release (https://github.com/russcarver/ngx-source-obfuscation/releases) from the `master` branch.
1. Publish to NPM by running `npm publish --tag=latest`
