module.exports = function (RED) {
  function PuppeteerPageKeyboardPress (config) {
    RED.nodes.createNode(this, config)
    this.key = config.key
    var node = this
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        this.status({fill:"green",shape:"dot",text:`Pressing Key ${node.key}`});
        await msg.puppeteer.page.keyboard.press(node.key)
        this.status({fill:"green",shape:"ring",text:`Pressed Key ${node.key}`});
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
      $("#node-input-key").val(this.key)
    }
  }
  RED.nodes.registerType('puppeteer-page-keyboard-press', PuppeteerPageKeyboardPress)
}
