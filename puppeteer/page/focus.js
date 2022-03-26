module.exports = function (RED) {
  function PuppeteerPageFocus (config) {
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
        this.status({fill:"green",shape:"dot",text:`Focus to ${node.selector}`});
        await msg.puppeteer.page.focus(node.selector)
        this.status({fill:"green",shape:"ring",text:`Focused ${node.selector}`});
        node.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        node.error(e)
      }
    }
    )
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-focus', PuppeteerPageFocus)
}
