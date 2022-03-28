module.exports = function (RED) {
  function PuppeteerPageGoto (config) {
    RED.nodes.createNode(this, config)
    
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        console.log(msg[config.url])
        let url = config.url
        url = config.urltype=="msg"?msg[config.url]:url
        url = config.urltype=="flow"?flowContext.get(config.url):url
        url = config.urltype=="global"?globalContext.get(config.url):url
        this.status({fill:"green",shape:"dot",text:`Go to ${url}`});
        await msg.puppeteer.page.goto(url)
        this.status({fill:"green",shape:"ring",text:url});
        this.send(msg)
      } catch (e) {
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
  RED.nodes.registerType('puppeteer-page-goto', PuppeteerPageGoto)
}
