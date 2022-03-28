module.exports = function (RED) {
  function PuppeteerPageKeyboardType (config) {
    RED.nodes.createNode(this, config)
    this.text = config.text
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        node.text = config.text=="msg"?msg[node.text]:node.text
        node.text = config.text=="flow"?flowContext.get(node.text):node.text
        node.text = config.text=="global"?globalContext.get(node.text):node.text
        this.status({fill:"green",shape:"dot",text:`Typing ${node.text}`});
        await msg.puppeteer.page.keyboard.type(node.text)
        this.status({fill:"green",shape:"ring",text:`Typed ${node.text}`});
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
  RED.nodes.registerType('puppeteer-page-keyboard-type', PuppeteerPageKeyboardType)
}
