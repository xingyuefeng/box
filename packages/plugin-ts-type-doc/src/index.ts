const TypeDoc = require('typedoc');
import type { TypeDocOptions } from "typedoc";


const pluginName = 'PluginTsTypeDoc';


type Options  = Partial<TypeDocOptions>


class PluginTsTypeDoc {

  private options: Options;
  private startTime =  Date.now();
  private prevTimestamps = {};

  constructor(options: Options) {

    const defaultLoaderConfig: Options  = {
      entryPoints: ["src/index.ts"]
    }

    if (!options?.out && !options?.json) {
			defaultLoaderConfig.out = "./docs"
		}

    this.options =  Object.assign(options || {}, defaultLoaderConfig);
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      pluginName,
      (compilation, callback) => {
        this.main(compilation.fileSystemInfo._fileTshs)
        // console.log(Object.entries(compilation.fileSystemInfo._fileTshs))
       
        
        callback();
      }
    );

    compiler.hooks.done.tapAsync(pluginName, stats => {
      console.log('Typedoc finished generating 🎉🎉🎉');
    })

  }

  async main(fileTshs) {
    const changedFiles = []
    fileTshs.forEach((fileInfo, watchfile) => {
      console.log(this.startTime, fileInfo.timestamp)
      if (this.prevTimestamps[watchfile] || this.startTime < (fileInfo.timestamp || Infinity)) {
        changedFiles.push(watchfile)
      }
    })

    // 监听是否需要重新生成文档
    if (changedFiles.length === 0) {
      const app = new TypeDoc.Application();

      app.options.addReader(new TypeDoc.TSConfigReader());
      app.options.addReader(new TypeDoc.TypeDocReader());
  
      app.bootstrap(this.options);
  
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

}


export default  PluginTsTypeDoc;
