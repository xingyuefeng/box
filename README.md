# webpack5开发工具箱


## plugin-ts-type-doc

利用[typedoc](https://typedoc.org/) 将ts文件转成文档

### Installation

> npm install --save-dev @maliao/plugin-ts-type-doc

### Usage

```
const PluginTsTypeDoc = require('@maliao/plugin-ts-type-doc')


{
 plugins: [
    new PluginTsTypeDoc(options)
  ]

}

```

### options

默认参数

```
{
   entryPoints: ["src/index.ts"],
   out: 'docs'
}

```

继承自[TypeDocOptions](https://typedoc.org/api/modules.html#TypeDocOptions)