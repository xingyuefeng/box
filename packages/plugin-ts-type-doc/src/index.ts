const TypeDoc = require('typedoc');

const pluginName = 'PluginTsTypeDoc';



class PluginTsTypeDoc {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation, callback) => {
        // console.log('这是一个示例插件！');
        // console.log(
        //   '这里表示了资源的单次构建的 `compilation` 对象：',
        //   compilation
        // );

        // 用 webpack 提供的插件 API 处理构建过程
        // compilation.addModule(/* ... */);
        this.main()
        
        callback();
      }
    );


    compiler.hooks.done.tapAsync(pluginName, stats => {
      console.log('编译完成')
    })

  }

  async main() {
    const app = new TypeDoc.Application();

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());
    app.options.addReader(new TypeDoc.TypeDocReader());

    app.bootstrap({
        // typedoc options here
        entryPoints: ["src/index.ts"],
    });

    const project = app.convert();

    if (project) {
        // Project may not have converted correctly
        const outputDir = "docs";

        // Rendered docs
        await app.generateDocs(project, outputDir);
        // Alternatively generate JSON output
        await app.generateJson(project, outputDir + "/documentation.json");
    }
}

}





module.exports = PluginTsTypeDoc;
