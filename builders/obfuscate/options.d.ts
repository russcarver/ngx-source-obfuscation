import { IOptions } from 'javascript-obfuscator/typings/src/interfaces/options/IOptions';

interface ObfuscateCommandOptions extends IOptions {
  /**
   * The files which should get obfuscated.
   */
  files: Array<JsFiles>;
}

interface JsFiles {
  glob: string;
  input: string;
  output: string;
}
