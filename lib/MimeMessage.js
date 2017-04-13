const Base64 = require('js-base64').Base64

class MimeMessage {
  constructor (options) {
    this.type = options.type || 'text/plain'
    this.encoding = options.encoding || 'charset=UTF-8'
    this.from = options.from || { name: '', email: '' }
    this.to = options.to || { name: '', email: '' }
    this.date = options.date || ''
    this.subject = options.subject || ''
    this.message = options.message || ''
  }

  static createMimeMessage (options) {
    return new MimeMessage(options)
  }

  toBase64SafeString (callback) {
    var base64SafeString = ''
    this.__toString((err, messageString) => {
      if (err) return callback(err, null)

      base64SafeString = this.__encodeMessageSafeBase64(messageString)
      return (null, base64SafeString)
    })
  }

  // Read: https://goo.gl/o9ATbM

  __encodeMessageSafeBase64 (message) {
    let base64EncodedMsg = Base64.encode(message)
    let base64SafeString = base64EncodedMsg.split('').map((char) => {
      if (char === '+') return '-'
      if (char === '/') return '_'
      return char
    }).join('')
    return base64SafeString
  }

  __toString (callback) {
    let message = ``

    try {
      message += `Content-type: ${this.type}; charset=${this.encoding}` + `\n`
      message += `From: ${this.from.name} <${this.from.email}>` + `\n`
      message += `To: ${this.to.name} <${this.to.email}>` + `\n`
      message += `Date: ${this.date}` + `\n`
      message += `Subject: ${this.subject}` + `\n`
      message += `Message-ID: <1234@local.machine.example>` + `\n`
      message += `\n`
      message += `${this.message}`
    } catch (error) {
      return callback(new Error(error), null)
    }

    return callback(null, message)
  }
}

module.exports = MimeMessage
