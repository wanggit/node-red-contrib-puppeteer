module.exports = function (RED) {
  function PuppeteerPageClick (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        let selector = config.selector
        selector = config.selectortype=="msg"?msg[config.selector]:selector
        selector = config.selectortype=="flow"?flowContext.get(config.selector):selector
        selector = config.selectortype=="global"?globalContext.get(config.selector):selector
        this.status({fill:"green",shape:"dot",text:`Wait for ${selector}`});
        await msg.puppeteer.page.waitForSelector(selector)
        this.status({fill:"green",shape:"dot",text:`Click ${selector}`});
        await msg.puppeteer.page.click(selector)
        this.status({fill:"green",shape:"ring",text:`Click ${selector}`});
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
  RED.nodes.registerType('puppeteer-page-click', PuppeteerPageClick)
}
