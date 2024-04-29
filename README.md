# ngx-source-obfuscation

Angular Builder CLI which integrates the javascript-obfuscation project into angular.

## Getting Started

### Prerequisites
* Package manager like yarn or npm
* Angular 8 or higher.

### Installing

#### Yarn
```
yarn add -D @rcarver/ngx-source-obfuscation
```

#### Npm
```
npm i -D @rcarver/ngx-source-obfuscation
```

#### Version Table
| Version | Angular |
|---------|:-------:|
| ^1.0.0  |    8    |
| ^2.0.0  |    9    |
| ^16.0.0 |   16    |
| ^17.0.0 |   17    |

#### Angular Setup
Create a target in your `angular.json` file. Like the one shown bellow.
Other targets like `lint` or `build` are located in the same place.

*Important* make sure your levels of obfuscation and performance is suitable for your
project! The *default* parameters are most likely *not* what you *want*. 

```json
{
  "obfuscate": {
    "builder": "@rcarver/ngx-source-obfuscation:obfuscate",
    "options": {
      "files": [
        {
          "glob": "main*.js",
          "input": "www",
          "output": "www"
        }
      ],
      "sourceMap": true,
      "sourceMapMode": "separate"
    },
    "configurations": {
      "production": {
        "debugProtection": true,
        "debugProtectionInterval": true,
        "sourceMap": false
      }
    }
  }
}
```

A Live Demo of the obfuscation library <https://obfuscator.io/> is provided by the author of the library.
A list of available configuration options can be found [here](https://github.com/javascript-obfuscator/javascript-obfuscator)

#### Running the task
##### General
The angular cli target can be invoked like every other target `<project>:<target>:<configuration>`.
##### Examples
###### Yarn
"Dev Build"
```
yarn ng run app:obfuscate
```

Prod Build
```
yarn ng run app:obfuscate:production
```

###### Npm
"Dev Build"
```
npx ng run app:obfuscate
```

Prod Build
```
npx ng run app:obfuscate:production
```

## Built With

* [Angular-Devkti](https://www.npmjs.com/package/@angular-devkit/architect) - Used to create the builder.
* [Yarn](https://classic.yarnpkg.com/) - Dependency Management
* [javascript-obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator) - The library which does all the work.
* [multi-stage-sourcemap](https://github.com/azu/multi-stage-sourcemap) - Used to merge the source maps of Angular build output and javascript-obfuscator.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/russcarver/ngx-source-obfuscation/tags). 

## Authors

* **Nicolas Schäfli** - *Initial work* - [d3r1w](https://github.com/d3r1w)
* **Russ Carver** - *Angular 16 & 17 upgrades* - [russcarver](https://github.com/russcarver)

## Acknowledgments

* Huge thanks to Timofey Kachalov, contributers and supporters of the [javascript-obfuscator](https://obfuscator.io) project.

## License

This project is licensed under the GPL-v3 License - see the [LICENSE.md](LICENSE.md) file for details

@russcarver/ngx-source-obfuscation Copyright (C) 2023-2024

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

