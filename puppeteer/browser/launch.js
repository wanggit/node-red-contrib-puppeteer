const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
    RED.nodes.createNode(this, config)
    this.headless = (config.headless == "1" ? true : false)
    this.slowMo = config.slowMo
    this.name = config.name
    var node = this

    // Retrieve the config node
    this.on('input', async function (msg) {
      msg.puppeteer = {
        browser:await puppeteer.launch( { headless: node.headless, slowMo: node.slowMo, defaultViewport: null, ignoreHTTPSErrors: true } )
      }
      msg.puppeteer.page = (await msg.puppeteer.browser.pages())[0]
      node.send(msg)
        
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-headless").val(this.headless === true ? "1" : "0")
      $("#node-input-slowMo").val(this.slowMo)
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}
