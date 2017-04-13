const mimeMessage = require('./lib/MimeMessage')

const message = mimeMessage.createMimeMessage({
  type: 'text/html',
  encoding: 'UTF-8',
  from: {
    name: 'Jorge Ferreiro',
    email: 'jorge@ferreiro.me'
  },
  to: {
    name: 'Jorge Ferreiro',
    email: 'jorge@ferreiro.me'
  },
  toMany: 'Susan <susan@example.com>, Paul <paul@example.com>',
  replyTo: {
    name: 'Test',
    email: '<test@test.com>'
  },
  date: 'Date: Fri, 21 Nov 1997 09:55:06 -0600',
  subject: 'Hello World!',
  message: '<h1>Hello from the other side!</h1><p>This is pretty awesome!</p>'
})

message.toBase64SafeString((err, messageBase64Safe) => {
  if (err) {
    console.log(err)
  }
  console.log(messageBase64Safe)
})
