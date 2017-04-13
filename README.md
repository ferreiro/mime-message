# Mime-message

Simple node module to create mime types messages easily and safety!

Hi guys! I decided to create this module because I'm working with emails and I did not found any node module to easily create mime messages in the javascript ecosystem. I decided to release it because I'm sure more people has this problem! :).

# How to use it?

```javascript
const mimeMessage = require('mime-message')

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
  date: 'Date: Fri, 21 Nov 1997 09:55:06 -0600',
  subject: 'Hello World!',
  message: '<h1>Hello from the other side!</h1><p>This is pretty awesome!</p>'
})

const messageBase64Safe = message.toBase64SafeString()
console.log(messageBase64Safe)
```

No more documentation by now. Sorry guys, I'm quite busy right now ><.