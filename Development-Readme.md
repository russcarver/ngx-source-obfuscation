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

# Linting
Run `npm run lint`or `yarn lint`

# Building
1. Run `npm run build` or `yarn build`
1. This will generate the files `builders/obfuscate/index.js` and `index.js.map`

# Testing
1. Open an existing project that uses ngx-source-obfuscation (or create a new one with it as a dependency).
1. Open the file `node_modules/@russcarver/ngx-source-obfuscation/builders/obfuscate/index.js` and replace its contents with those from a local build of ngx-source-obfuscation (same file).
1. Open the file `node_modules/@russcarver/ngx-source-obfuscation/builders/obfuscate/index.js.map` and replace its contents with those from a local build of ngx-source-obfuscation (same file).
2. Be sure to test with older versions of Angular (>= 16) to ensure backward compatibility.

# Publishing
Once you are satisfied with all your changes, perform the following steps to publish:
1. Create a PR into the `master` branch from your branch.
1. Merge the PR into the `master` branch after review.
1. Create a new Tag (https://github.com/russcarver/ngx-source-obfuscation/tags) from the `master` branch.
1. Create a new Release (https://github.com/russcarver/ngx-source-obfuscation/releases) from the `master` branch.
