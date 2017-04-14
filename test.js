const Mime = require('./lib/MimeMessage')

const messageData = {
  type: 'text/html',
  encoding: 'UTF-8',
  from: [
    'Jorge <mySuperEmail@example.com>'
  ],
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

if (Mime.validMimeMessage(messageData)) {
  const message = Mime.createMimeMessage(messageData)
  const base64SafeString = message.toBase64SafeString()

  console.log(base64SafeString)
}
