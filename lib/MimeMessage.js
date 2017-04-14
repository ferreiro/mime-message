const Base64 = require('js-base64').Base64

class MimeMessage {
  constructor (data) {
    this.type = data.type || 'text/plain'
    this.encoding = data.encoding || 'charset=UTF-8'

    this.from = data.from || []
    this.to = data.to || []
    this.replyTo = data.replyTo || []
    this.cc = data.cc || []
    this.bcc = data.bcc || []

    this.date = data.date || ''
    this.subject = data.subject || ''
    this.body = data.body || ''
  }

  static createMimeMessage (data) {
    return new MimeMessage(data)
  }

  static validMimeMessage (data) {
    var errors = []

    if (!data) {
      errors.push('You did not pass the data object')
    }

    // This values are mandatory
    if (!data.to || !this.__isArray(data.to)) {
      errors.push('Message to: is not an array or is undefined')
    }
    if (!data.replyTo || !this.__isArray(data.replyTo)) {
      errors.push('Message replyTo: is not an array or is undefined')
    }

    // This values are optional. So if they exist, check the type.
    if (data.cc && !this.__isArray(data.cc)) {
      errors.push('Message cc: is not an array or is undefined')
    }
    if (data.bcc && !this.__isArray(data.bcc)) {
      errors.push('Message bcc: is not an array or is undefined')
    }

    return errors.length === 0 // No errors? It's valid!
  }

  static __isArray (elemn) {
    return elemn.constructor === Array
  }

  toBase64SafeString () {
    var messageString = this.__toString()
    var base64SafeString = this.__encodeMessageSafeBase64(messageString)
    return base64SafeString
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

  __toString () {
    let message = ``

    if (this.type && this.encoding) {
      message += `Content-type: ${this.type}; charset=${this.encoding}` + `\n`
    }
    if (this.from) {
      message += `From: ${this.from}` + `\n`
    }
    if (this.to) {
      message += `To: ` + this.__composeUserString(this.to) + '\n'
    }
    if (this.cc) {
      message += `CC: ` + this.__composeUserString(this.cc) + '\n'
    }
    if (this.bcc) {
      message += `BCC: ` + this.__composeUserString(this.bcc) + '\n'
    }
    if (this.replyTo) {
      message += `Reply-To: ` + this.__composeUserString(this.replyTo) + '\n'
    }
    if (this.date) {
      message += `Date: ${this.date}` + `\n`
    }
    if (this.subject) {
      message += `Subject: ${this.subject}` + `\n`
    }

    if (this.body) {
      message += `\n`
      message += `${this.body}`
    }

    return message
  }

  __composeUserString (users) {
    if (users.constructor !== Array ||
        users.length === 0) {
      return ''
    }

    var userString = ''

    for (var i = 0; i < users.length; i++) {
      const user = users[i]
      console.log(user)
      if (user === '') {
        // Skip empty users
      } else if (user && user !== undefined) {
        userString += String(users[i])
        userString += (i + 1 < users.length) ? ', ' : '' // Sepator if not final
      }
    }

    return userString // String of the users elements
  }
}

module.exports = MimeMessage
