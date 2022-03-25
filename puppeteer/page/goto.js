module.exports = function (RED) {
  function PuppeteerPageGoto (config) {
    RED.nodes.createNode(this, config)
    this.url = config.url
    var node = this
    
    // Retrieve the config node
    this.on('input', function (msg) {
      node.url = config.urltype=="msg"?msg[node.url]:node.url
      node.url = config.urltype=="flow"?flowContext.get(node.url):node.url
      node.url = config.urltype=="global"?globalContext.get(node.url):node.url
      msg.puppeteer.page.goto(node.url)
        .then((page) => {
          node.send(msg) 
        })  
        .catch((err) => {
          node.error(err)
        })
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-name").val(this.name)
    }
  }
  RED.nodes.registerType('puppeteer-page-goto', PuppeteerPageGoto)
}
