import { IOptions } from 'javascript-obfuscator/typings/src/interfaces/options/IOptions';

export interface ObfuscateCommandOptions extends IOptions {
  /**
   * The files which should get obfuscated.
   */
  files: Array<JsFiles>;
}

export interface JsFiles {
  fileExtensions: string[];
  filePatternsToExclude: string[];
  input: string;
  output: string;
}
