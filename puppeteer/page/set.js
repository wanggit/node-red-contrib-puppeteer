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
        await msg.puppeteer.page.waitForSelector(node.selector)
        await msg.puppeteer.page.$eval(node.selector, (el,value) => el.value = value, node.value)
        node.send(msg) 
      } catch(err) {
        node.error(err)
      }
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-set-value', PuppeteerPageSetValue)
}
