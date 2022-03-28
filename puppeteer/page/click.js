module.exports = function (RED) {
  function PuppeteerPageClick (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        node.selector = config.selectortype=="msg"?msg[node.selector]:node.selector
        node.selector = config.selectortype=="flow"?flowContext.get(node.selector):node.selector
        node.selector = config.selectortype=="global"?globalContext.get(node.selector):node.selector
        this.status({fill:"green",shape:"dot",text:`Wait for ${node.selector}`});
        await msg.puppeteer.page.waitForSelector(node.selector)
        this.status({fill:"green",shape:"dot",text:`Click ${node.selector}`});
        await msg.puppeteer.page.click(node.selector)
        this.status({fill:"green",shape:"ring",text:`Click ${node.selector}`});
        node.send(msg) 
      } catch(e) {
          this.status({fill:"red",shape:"ring",text:e});
          node.error(e)
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
