# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [19.0.0] - 2025-07-11
### Added
- Angular 19 support

## [18.0.0] - 2024-10-02
### Added
- Angular 18 support
- BREAKING CHANGES:
  1. Glob support has been removed due to it also being removed from the underlying implementation of `readdirp`.
     * You must now use `fileExtensions` (string array, required) and, `filePatternsToExclude` (string array, optional).

## [17.0.0] - 2024-04-30
### Added
- Angular 17 support

## [16.0.0] - 2023-10-19
### Added
- Angular 16 support

## [2.0.0] - 2020-03-28
### Added
- Angular 9 support

### Changed
- Update typescript to ~3.8
- Update javascript-obfuscator to ~0.27.2

## [1.0.1] - 2020-02-05
### Fixed
- Fix package size.

## [1.0.0] - 2020-02-05
### Added
- Obfuscate command.
- Source code transfer (obfuscation -> angular)

[19.0.0]: https://github.com/russcarver/ngx-source-obfuscation/compare/v18.0.0...v19.0.0
[18.0.0]: https://github.com/russcarver/ngx-source-obfuscation/compare/v17.0.0...v18.0.0
[17.0.0]: https://github.com/russcarver/ngx-source-obfuscation/compare/v16.0.0...v17.0.0
[16.0.0]: https://github.com/russcarver/ngx-source-obfuscation/compare/v2.0.0...v16.0.0
[2.0.0]: https://github.com/studer-raimann/ngx-source-obfuscation/compare/v1.0.1...v2.0.0
[1.0.1]: https://github.com/studer-raimann/ngx-source-obfuscation/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/studer-raimann/ngx-source-obfuscation/releases/tag/v1.0.0
