const TypeDoc = require('typedoc');

const pluginName = 'PluginTsTypeDoc';



class PluginTsTypeDoc {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation, callback) => {
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
