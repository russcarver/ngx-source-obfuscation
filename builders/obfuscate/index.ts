import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject, JsonValue, workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace/definitions';
import { mkdir, readFile, writeFile } from 'fs';
import { obfuscate, ObfuscationResult } from 'javascript-obfuscator';
import { transfer } from 'multi-stage-sourcemap';
import { dirname, join, normalize } from 'path';
import readdirip, { EntryInfo } from 'readdirp';
import { promisify } from 'util';
import { JsFiles, ObfuscateCommandOptions } from './options';

const pReadFile: (readFile) => Promise<unknown> = promisify(readFile);
const pWriteFile: (
  arg1: (string | Buffer | URL | number),
  arg2: (string | Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array |
         BigUint64Array | BigInt64Array | Float32Array | Float64Array | DataView)
) => Promise<void> = promisify(writeFile);
const pMkdir: (arg1, arg2) => Promise<unknown> = promisify(mkdir);

const processedFiles: Set<string> = new Set<string>();

async function commandBuilder(options: ObfuscateCommandOptions & JsonObject,
                               context: BuilderContext): Promise<BuilderOutput> {
  try {
    context.reportStatus('Obfuscate angular application.');
    await Promise.all(options.files.map((jsFiles: JsFiles) => obfuscateJsFiles(context, options, jsFiles)));
    context.logger.info('\nObfuscation finished.');
    return { success: true };
  } catch (err) {
    if (typeof err === 'string') {
      context.reportStatus(`File obfuscation failed with error '${err}'.`);
      return { error: err, success: false };
    }

    if (err.message !== undefined && typeof err.message === 'string') {
      context.reportStatus(`File obfuscation failed with error '${err.message}'.`);
      return { error: err.message, success: false };
    }
  } finally {
    processedFiles.clear();
  }
}

async function obfuscateJsFiles(context: BuilderContext, options: ObfuscateCommandOptions & JsonObject,
                                files: JsFiles): Promise<void> {
  context.logger.info(`Input Files Extensions: ${files.fileExtensions}`);
  context.logger.info(`Input File Pattern Exclusions: ${files.filePatternsToExclude}`);
  const inputPath: string = join(context.currentDirectory, files.input);
  context.logger.info(`Input Path: ${inputPath}`);
  const outputPath: string = join(context.currentDirectory, (await getBuildPath(context)), files.output);
  context.logger.info(`Output Path: ${outputPath}\n`);

  let extensionMatches: boolean = false;
  let excluded: boolean = false;
  for await (const item of readdirip(
    inputPath,
    {
      depth: 30,
      fileFilter: (fileEntry: EntryInfo) => {
        extensionMatches = files?.fileExtensions?.filter((ext: string): boolean =>
          fileEntry.basename.toLowerCase().endsWith(`.${ext.toLowerCase()}`))?.length > 0;
        excluded = files?.filePatternsToExclude?.filter((pattern: string): boolean =>
          fileEntry.basename.toLowerCase().includes(pattern.toLowerCase()))?.length > 0;
        return extensionMatches && !excluded;
      },
      type: 'files'
    }
  )) {
    if (processedFiles.has(item.fullPath)) {
      continue;
    }
    context.logger.info(`Obfuscating: ${item.fullPath}`);
    const result: ObfuscationResult = obfuscate((await pReadFile(item.fullPath)).toString(), options);
    const jobs: Array<Promise<void>> = new Array<Promise<void>>(2);
    const sourceMapFile: string = `${item.fullPath}.map`;
    if (options.sourceMap && options.sourceMapMode === 'separate') {
      // example https://gist.github.com/markuszm/a76ec4ed2d8cf912b504b731dd60f996
      try {
        context.logger.debug(`Transfer source map: ${sourceMapFile}`);
        const bMap: string = (await pReadFile(sourceMapFile)).toString();
        const cToAMap: string = transfer({fromSourceMap: result.getSourceMap(), toSourceMap: bMap});
        jobs.push(pWriteFile(sourceMapFile, cToAMap));
      } catch (err) {
        context.logger.warn(`Encountered error with message: ${err.message}`);
        context.logger.warn(
          // eslint-disable-next-line max-len
          'Unable to find or process typescript -> js source map failed to transfer source map, fallback to obfuscation source map.'
        );
        jobs.push(pWriteFile(sourceMapFile, result.getSourceMap()));
      }
    }
    const fullOutputPath: string = normalize(item.fullPath.replace(inputPath, outputPath));
    const parentDir: string = dirname(fullOutputPath);
    await pMkdir(parentDir, { recursive: true });
    jobs.push(pWriteFile(fullOutputPath, result.getObfuscatedCode()));
    await Promise.all(jobs);
    processedFiles.add(item.fullPath);
  }
}

async function getBuildPath(context: BuilderContext): Promise<string> {
  const host: workspaces.WorkspaceHost = workspaces.createWorkspaceHost(new NodeJsSyncHost());
  const workspace: { workspace: WorkspaceDefinition } =
    await workspaces.readWorkspace(context.currentDirectory, host);
  const project: workspaces.ProjectDefinition = workspace.workspace.projects.get(context.target.project);

  if (!project) {
    throw new Error(`${context.target.project} not found.`);
  }

  const buildTarget: workspaces.TargetDefinition = project.targets.get('build');
  if (!buildTarget) {
    throw new Error('Build target does not exist!');
  }

  let outputBasePath: JsonValue | JsonObject =
    buildTarget.configurations?.production?.outputPath ?? buildTarget.options?.outputPath;

  if (!outputBasePath) {
    throw new Error('Build target output base path directory not found!');
  }

  if (typeof outputBasePath !== 'string') {
    outputBasePath = (outputBasePath as JsonObject).base;
    if (outputBasePath === undefined || typeof outputBasePath !== 'string') {
      throw new Error('Build target output base path directory not correctly configured!');
    }
  }

  return outputBasePath;
}

export default createBuilder(commandBuilder);
