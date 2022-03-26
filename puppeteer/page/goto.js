module.exports = function (RED) {
  function PuppeteerPageGoto (config) {
    RED.nodes.createNode(this, config)
    this.url = config.url
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        node.url = config.urltype=="msg"?msg[node.url]:node.url
        node.url = config.urltype=="flow"?flowContext.get(node.url):node.url
        node.url = config.urltype=="global"?globalContext.get(node.url):node.url
        this.status({fill:"green",shape:"dot",text:`Go to ${node.url}`});
        await msg.puppeteer.page.goto(node.url)
        this.status({fill:"green",shape:"ring",text:node.url});
        node.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        node.error(e)
      }
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-goto', PuppeteerPageGoto)
}
