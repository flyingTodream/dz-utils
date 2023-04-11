/**
 * @author: 23956
 * @date:2022/3/25
 * @version:1.01
 * @description:https://www.jianshu.com/p/6a99ae530d43 简书配置参考
 */
module.exports = {
  // https://prettier.io/docs/en/options.html
  endOfLine: 'lf', // 行段结束采用lf格式
  arrowParens: 'always', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号    ,always：始终需要
  bracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  embeddedLanguageFormatting: 'auto', //是否需要格式化在文件中引用的代码,"auto" – 如果 Prettier 可以识别嵌入的代码，则会格式化；"off" - 不会对嵌入的代码进行格式化
  htmlWhitespaceSensitivity: 'css', //指定对 HTML, Vue, Angular, and Handlebars 文件中的空格保持敏感；设定为 css 时会根据标签的 display 属性 ( inline、block ) 采取不同的格式化方式
  insertPragma: false, //插入编译指示：当文件已经被 Prettier 格式化之后，会在文件顶部插入一个特殊的 @format 标记。
  jsxSingleQuote: false, //在 JSX 中使用单引号替代双引号，默认false
  printWidth: 120, // 超过最大值换行
  proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
  quoteProps: 'as-needed', //对象的属性是否需要添加引号，默认 as-needed;"consistent" - 只要有一个对象属性需要加引号，则都会加上引号;"preserve" - 原样保存
  requirePragma: false, //指定编译指示：只格式化在文件顶部包含特定注释的文件。;/*** @prettier*//*** @format*/
  semi: true, //指定语句的结尾是否要使用分号。
  singleQuote: true, //使用单引号代替双引号。JSX 引号会忽略这条规则
  tabWidth: 2, //指定缩进长度，默认为 2。
  trailingComma: 'es5', //元素末尾的逗号。默认为 es5,ES5中的 objects, arrays 等会添加逗号，TypeScript 中的 type 后不加逗号
  useTabs: false, //指定缩进的方式：空格 或 Tab，默认为 false，即使用空格缩进。
  vueIndentScriptAndStyle: false, //vue 文件中，是否给 script 和 style 内的代码添加缩进。
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html',
      },
    },
  ],
};
