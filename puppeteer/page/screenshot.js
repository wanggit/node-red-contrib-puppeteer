module.exports = function (RED) {
  function PuppeteerPageScreenshot (config) {
    RED.nodes.createNode(this, config)
    this.selector = config.selector
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        this.status({fill:"green",shape:"dot",text:`Capturing screen ...`});
        msg.payload = await msg.puppeteer.page.screenshot()
        this.status({fill:"green",shape:"ring",text:`Screen captured`});
        RED.comms.publish("puppeteer-screenshot", { id:node.id, image:msg.payload.toString("base64") });
        node.send(msg)
      } catch (e) {
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
  RED.nodes.registerType('puppeteer-page-screenshot', PuppeteerPageScreenshot)
}
