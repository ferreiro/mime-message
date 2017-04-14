const mimeMessage = require('./lib/MimeMessage')

const messageData = {
  type: 'text/html',
  encoding: 'UTF-8',
  from: 'Jorge <mySuperEmail@example.com>',
  to: [
    'User 1 <mail@example.com>',
    'User 2 <mail@example.com>'
  ],
  cc: [
    'User 3 <mail@example.com>'
  ],
  bcc: [],
  replyTo: [
    'Jorge <mySuperEmail@example.com>',
  ],
  date: new Date(),
  subject: 'Hello World!',
  body: '<h1>Hello from the other side!</h1><p>This is pretty awesome!</p>'
}

mimeMessage.createMimeMessage(messageData, (err, message) => {
  if (err) {
    console.log(err)
  }
  console.log(message)
})

mimeMessage.createMimeMessage(messageData, (err, message) => {
  if (err) {
    console.log(err)
    return ;
  }
  // Get the base 64 safe string
  message.toBase64SafeString((err, messageBase64Safe) => {
    if (err) {
      console.log(err)
    }
    console.log(messageBase64Safe)
  })
})
