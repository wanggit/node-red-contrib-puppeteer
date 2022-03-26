module.exports = function (RED) {
  function PuppeteerPageSetValue (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    this.value = config.value
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        node.selector = config.selectortype=="msg"?msg[node.selector]:node.selector
        node.selector = config.selectortype=="flow"?flowContext.get(node.selector):node.selector
        node.selector = config.selectortype=="global"?globalContext.get(node.selector):node.selector
        node.value = config.valuetype=="msg"?msg[node.value]:node.value
        node.value = config.valuetype=="flow"?flowContext.get(node.value):node.value
        node.value = config.valuetype=="global"?globalContext.get(node.value):node.value
        this.status({fill:"green",shape:"dot",text:`Wait for ${node.selector}`});
        await msg.puppeteer.page.waitForSelector(node.selector)
        this.status({fill:"green",shape:"dot",text:`Set ${node.value}`});
        await msg.puppeteer.page.$eval(node.selector, (el,value) => el.value = value, node.value)
        this.status({fill:"green",shape:"ring",text:node.value});
        node.send(msg) 
      } catch(e) {
        this.status({fill:"red",shape:"ring",text:e});
        node.error(e)
      }
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-set-value', PuppeteerPageSetValue)
}
