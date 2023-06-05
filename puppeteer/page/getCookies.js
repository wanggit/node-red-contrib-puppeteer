module.exports = function (RED) {
  function PuppeteerPageGetCookies (config) {
    RED.nodes.createNode(this, config)

    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        const cookies = await msg.puppeteer.page.cookies();
        msg.payload = cookies;
        this.send(msg)
      } catch (e) {
        this.status({fill:"red",shape:"ring",text:e});
        this.error(e)
      }
    })
    this.on('close', function() {
      this.status({});
    });
  }
  RED.nodes.registerType('puppeteer-page-getCookies', PuppeteerPageGetCookies)
}
