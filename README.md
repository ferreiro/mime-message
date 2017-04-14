# Mime-message

Simple node module to create mime types messages easily and safety!

Hi guys! I decided to create this module because I'm working with emails and I did not found any node module to easily create mime messages in the javascript ecosystem. I decided to release it because I'm sure more people has this problem! :).

# Api methods

1. validMimeMessage(data)
2. createMimeMessage(data)
3. toBase64SafeString()

# How to use it?

```javascript
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

if (Mime.validMimeMessage(messageData)) {
  const message = Mime.createMimeMessage(messageData)
  const base64SafeString = message.toBase64SafeString()

  console.log(base64SafeString)
}
```

No more documentation by now. Sorry guys, I'm quite busy right now ><.

# Useful papers

* [RFC2822](https://tools.ietf.org/html/rfc2822#page-18)
