const puppeteer = require('puppeteer')


module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
    RED.nodes.createNode(this, config)
    config.defaultViewport = null;
    config.ignoreHTTPSErrors = true;
    // Retrieve the config node
    this.on('input', async function (msg) {
      try {
        this.status({fill:"green",shape:"dot",text:"Launching..."});
        if (config.debugport!=0) {
          try {
            msg.puppeteer = {browser:await puppeteer.connect({...config,browserURL:`http://127.0.0.1:${config.debugport}`})}
            this.status({fill:"grey",shape:"ring",text:"Attached to existing browser"});
          } catch (e) {
            this.status({fill:"green",shape:"dot",text:"No existing browser detected..."});
            msg.puppeteer = {browser:await puppeteer.launch( {...config, args: [`--remote-debugging-port=${config.debugport}`] } )}
            this.status({fill:"grey",shape:"ring",text:"Launched"});
          }
        }
        if (msg.puppeteer==undefined) {
          msg.puppeteer = {browser:await puppeteer.launch( {...config, args: [`--remote-debugging-port=${config.debugport}`] } )}
          this.status({fill:"grey",shape:"ring",text:"Launched"});
        }
        msg.puppeteer.page = (await msg.puppeteer.browser.pages())[0]
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
      $("#node-input-timeout").val(config.timeout)
      $("#node-input-slowMo").val(config.slowMo)
      $("#node-input-headless").val(config.headless)
      $("#node-input-debugport").val(config.debugport)
      $("#node-input-devtools").val(config.devtools)
      $("#node-input-name").val(config.name)
    }
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}
