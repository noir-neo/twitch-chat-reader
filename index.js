const tmi = require('tmi.js')
const child_process = require('child_process')

let opts = {
  identity: {
    username: process.env.TWITCH_USER_NAME,
    password: process.env.TWITCH_TOKEN
  },
  channels: [
    process.env.TWITCH_CHANNEL_NAME
  ]
}

let client = new tmi.client(opts)

client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

client.connect()

function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  console.log(`${context.username}: ${msg}`)
  say (`${context.username}: ${msg}`)
}

function say (message) {
  child_process.exec(`say -v Kyoko ${message}`, function(err, stdout, stderr) {
  });
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`)
  process.exit(1)
}
