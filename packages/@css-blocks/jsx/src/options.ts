import { ResolvedConfiguration, resolveConfiguration } from "@css-blocks/core";
import { ObjectDictionary } from "@opticss/util";

import { BabylonOptions, PluginName } from "babylon";

// We are only using the output Babylon AST to collect analysis data here,
// so, we can safely enable EVERY feature possible without worrying about
// which the consumer actually uses, or if the features needs a runtime.
// TODO: Remove this tslint disable when types for Babylon 7 are published.
// tslint:disable-next-line:prefer-whatever-to-any
const BABEL_PLUGINS: any = [
  "jsx",
  "doExpressions",
  "objectRestSpread",
  "decorators",
  "classProperties",
  "classPrivateProperties",
  "classPrivateMethods",
  "exportDefaultFrom",
  "exportNamespaceFrom",
  "asyncGenerators",
  "functionBind",
  "functionSent",
  "dynamicImport",
  "numericSeparator",
  "optionalChaining",
  "importMeta",
  "bigInt",
  "optionalCatchBinding",
  "throwExpressions",
  "pipelineOperator",
  "nullishCoalescingOperator",
];

export class CssBlocksJSXOptions {
  public baseDir: string;
  public types: "typescript" | "flow" | "none";
  public aliases: ObjectDictionary<string>;
  public compilationOptions: ResolvedConfiguration;
  public parserOptions: BabylonOptions;

  constructor(opts: Partial<CssBlocksJSXOptions>) {
    this.baseDir = opts.baseDir || ".";
    this.types = opts.types || "none";
    this.aliases = opts.aliases || {};
    this.compilationOptions = resolveConfiguration(opts.compilationOptions);
    this.parserOptions = {
      sourceType: "module",
      allowImportExportEverywhere: true,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      plugins: BABEL_PLUGINS.slice(0),
    };

    if (this.types === "typescript") {
      this.parserOptions.plugins!.push("typescript" as PluginName);
    }

    else if (this.types === "flow") {
      this.parserOptions.plugins!.push("flow" as PluginName);
      this.parserOptions.plugins!.push("flowComments" as PluginName);
    }
  }
}
