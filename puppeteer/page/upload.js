module.exports = function (RED) {
  function PuppeteerPageUpload (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        let selector = config.selector
        selector = config.selectortype=="msg"?msg[config.selector]:selector
        selector = config.selectortype=="flow"?flowContext.get(config.selector):selector
        selector = config.selectortype=="global"?globalContext.get(config.selector):selector

        let file = config.file
        file = config.filetype=="msg"?msg[config.file]:file
        file = config.filetype=="flow"?flowContext.get(config.file):file
        file = config.filetype=="global"?globalContext.get(config.file):file

        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await msg.puppeteer.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Upload ${file}`});
        await (await msg.puppeteer.page.$(selector)).uploadFile(file)
        this.status({fill:"green",shape:"ring",text:`Uploaded ${file}`});
        this.send(msg) 
      } catch(e) {
          this.status({fill:"red",shape:"ring",text:e});
          this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-upload', PuppeteerPageUpload)
}
