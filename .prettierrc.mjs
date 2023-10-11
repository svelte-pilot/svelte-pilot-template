export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  organizeImportsSkipDestructiveCodeActions: true,

  // https://gist.github.com/adbutterfield/6b91625b5b07ca2c29f6322245e3e2bb
  /**
   * Print Width
   * https://prettier.io/docs/en/options.html#print-width
   *
   * Specify the line length that the printer will wrap on.
   *
   * printWidth: <int>
   * default: 80
   */
  printWidth: 80,

  /**
   * Tab Width
   * https://prettier.io/docs/en/options.html#tab-width
   *
   * Specify the number of spaces per indentation-level.
   *
   * tabWidth: <int>
   * default: 2
   */
  tabWidth: 2,

  /**
   * Tabs
   * https://prettier.io/docs/en/options.html#tabs
   *
   * Indent lines with tabs instead of spaces.
   *
   * useTabs: <bool>
   * default: false
   */
  useTabs: false,

  /**
   * Semicolons
   * https://prettier.io/docs/en/options.html#semicolons
   *
   * Print semicolons at the ends of statements
   *
   * semi: <bool>
   * default: true
   */
  semi: false,

  /**
   * Quotes
   * https://prettier.io/docs/en/options.html#quotes
   *
   * Use single quotes instead of double quotes.
   *
   * singleQuote: <bool>
   * default: false
   */
  singleQuote: true,

  /**
   * Quote Props
   * https://prettier.io/docs/en/options.html#quote-props
   *
   * Change when properties in objects are quoted.
   *
   * quoteProps: "<as-needed|consistent|preserve>"
   * default: "as-needed"
   */
  quoteProps: 'as-needed',

  /**
   * JSX Quotes
   * https://prettier.io/docs/en/options.html#jsx-quotes
   *
   * Use single quotes instead of double quotes in JSX.
   *
   * jsxSingleQuote: <bool>
   * default: false
   */
  jsxSingleQuote: false,

  /**
   * Trailing Commas
   * https://prettier.io/docs/en/options.html#trailing-commas
   *
   * Print trailing commas wherever possible when multi-line. (A single-line array, for example, never gets trailing commas.)
   *
   * trailingComma: "<es5|none|all>"
   * default: 'es5'
   */
  trailingComma: 'none',

  /**
   * Bracket Spacing
   * https://prettier.io/docs/en/options.html#bracket-spacing
   *
   * Print spaces between brackets in object literals.
   *
   * bracketSpacing: <bool>
   * default: true
   */
  bracketSpacing: true,

  /**
   * Bracket Line
   * https://prettier.io/docs/en/options.html#bracket-line
   *
   * Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
   *
   * bracketSameLine: <bool>
   * default: false
   */
  bracketSameLine: false,

  /**
   * [Deprecated] JSX Brackets
   * https://prettier.io/docs/en/options.html#jsx-brackets
   *
   * This option has been deprecated in v2.4.0, use --bracket-same-line instead
   * Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
   *
   * jsxBracketSameLine: <bool>
   * default: false
   */
  jsxBracketSameLine: false,

  /**
   * Arrow Function Parentheses
   * https://prettier.io/docs/en/options.html#arrow-function-parentheses
   *
   * Include parentheses around a sole arrow function parameter.
   *
   * arrowParens: "<always|avoid>"
   * default: "always"
   */
  arrowParens: 'avoid',

  /**
   * Range
   * https://prettier.io/docs/en/options.html#range
   *
   * Format only a segment of a file.
   *
   * rangeStart: <int>
   * default: 0
   *
   * rangeEnd: <int>
   * default: Infinity
   */
  rangeStart: 0,
  rangeEnd: Infinity,

  /**
   * Parser
   * https://prettier.io/docs/en/options.html#parser
   *
   * Specify which parser to use.
   *
   * parser: "<string>" | require("./my-parser")
   * no default
   *
   */
  // parser: '',

  /**
   * File Path
   * https://prettier.io/docs/en/options.html#file-path
   *
   * Specify the file name to use to infer which parser to use.
   *
   * filepath: "<string>"
   * no default
   */
  // filepath: '',

  /**
   * Require pragma
   * https://prettier.io/docs/en/options.html#require-pragma
   *
   * Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file. This is very useful when gradually transitioning large, unformatted codebases to prettier.
   *
   * requirePragma: <bool>
   * default: false
   */
  requirePragma: false,

  /**
   * Insert Pragma
   * https://prettier.io/docs/en/options.html#insert-pragma
   *
   * Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier. This works well when used in tandem with the --require-pragma option. If there is already a docblock at the top of the file then this option will add a newline to it with the @format marker.
   *
   * insertPragma: <bool>
   * default: false
   */
  insertPragma: false,

  /**
   * Prose Wrap
   * https://prettier.io/docs/en/options.html#prose-wrap
   *
   * By default, Prettier will wrap markdown text as-is since some services use a linebreak-sensitive renderer, e.g. GitHub comment and BitBucket. In some cases you may want to rely on editor/viewer soft wrapping instead, so this option allows you to opt out with "never".
   *
   * proseWrap: "<always|never|preserve>"
   * default: "preserve"
   */
  proseWrap: 'preserve',

  /**
   * HTML Whitespace Sensitivity
   * https://prettier.io/docs/en/options.html#html-whitespace-sensitivity
   *
   * Specify the global whitespace sensitivity for HTML files, see whitespace-sensitive formatting for more info.
   *
   * htmlWhitespaceSensitivity: "<css|strict|ignore>"
   * default: "css"
   */
  htmlWhitespaceSensitivity: 'css',

  /**
   * Vue files script and style tags indentation
   * https://prettier.io/docs/en/options.html#vue-files-script-and-style-tags-indentation
   *
   * Whether or not to indent the code inside <script> and <style> tags in Vue files. Some people (like the creator of Vue) don’t indent to save an indentation level, but this might break code folding in your editor.
   *
   * vueIndentScriptAndStyle: <bool>
   * default: false
   */
  vueIndentScriptAndStyle: false,

  /**
   * End of Line
   * https://prettier.io/docs/en/options.html#end-of-line
   *
   * For historical reasons, there exist two common flavors of line endings in text files. That is \n (or LF for Line Feed) and \r\n (or CRLF for Carriage Return + Line Feed). The former is common on Linux and macOS, while the latter is prevalent on Windows. Some details explaining why it is so can be found on Wikipedia.
   *
   * endOfLine: "<lf|crlf|cr|auto>"
   * default: "lf"
   */
  endOfLine: 'lf',

  /**
   * Embedded Language Formatting
   * https://prettier.io/docs/en/options.html#embedded-language-formatting
   *
   * Control whether Prettier formats quoted code embedded in the file.
   *
   * embeddedLanguageFormatting: "<off|auto>"
   * default: "auto"
   */
  embeddedLanguageFormatting: 'auto',

  /**
   * Single Attribute Per Line
   * https://prettier.io/docs/en/options.html#single-attribute-per-line
   *
   * Enforce single attribute per line in HTML, Vue and JSX.
   *
   * singleAttributePerLine: "<bool>"
   * default: "false"
   */
  singleAttributePerLine: false
}
