const Base64 = require('js-base64').Base64

class MimeMessage {
  constructor (options) {

    const errors = this.validateOptions(options)

    if (errors.length >= 1) {
      throw new Error(errors)
    }

    //  String
    this.type = options.type || 'text/plain'
    this.encoding = options.encoding || 'charset=UTF-8'
    this.from = options.from || ''

    // List of users
    this.to = options.to || []
    this.replyTo = options.replyTo || []
    this.cc = options.cc || []
    this.bcc = options.bcc || []

    // String
    this.date = options.date || ''
    this.subject = options.subject || ''
    this.body = options.body || ''
  }

  static createMimeMessage (options, callback) {
    try {
      return callback(null, new MimeMessage(options))
    } catch (error) {
      return callback(error, null)
    }
  }

  validateOptions (options) {
    var errors = []

    if (!options) {
      errors.push('You did not pass the options object')
    }
    if (!options.to || !this.__isArray(options.to)) {
      errors.push('Message to: is not an array or is undefined')
    }
    if (!options.replyTo || !this.__isArray(options.replyTo)) {
      errors.push('Message replyTo: is not an array or is undefined')
    }
    if (!options.cc || !this.__isArray(options.cc)) {
      errors.push('Message cc: is not an array or is undefined')
    }
    if (!options.bcc || !this.__isArray(options.bcc)) {
      errors.push('Message bcc: is not an array or is undefined')
    }

    return errors
  }

  toBase64SafeString (callback) {
    this.__toString((err, messageString) => {
      if (err) {
        return callback(err, null)
      }
      var base64SafeString = this.__encodeMessageSafeBase64(messageString)
      return callback(null, base64SafeString)
    })
  }

  __isArray (elemn) {
    return elemn.constructor === Array
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
      message += `From: ${this.from}` + `\n`

      message += `To: ` + this.__composeUserList(this.to) + '\n'
      message += `CC: ` + this.__composeUserList(this.cc) + '\n'
      message += `BCC: ` + this.__composeUserList(this.bcc) + '\n'
      message += `Reply-To: ` + this.__composeUserList(this.replyTo) + '\n'

      message += `Date: ${this.date}` + `\n`
      message += `Subject: ${this.subject}` + `\n`
      // message += `Message-ID: <1234@local.machine.example>` + `\n`

      message += `\n`
      message += `${this.body}`
    } catch (error) {
      return callback(new Error(error), null)
    }

    callback(null, message)
  }

  __composeUserList (users) {
    if (users.constructor !== Array ||
        users.length === 0) {
      return ''
    }
    return users.join() // String of the users elements
  }
}

module.exports = MimeMessage
