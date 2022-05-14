const nodemailer = require('nodemailer')
import { OAuth2Client } from 'google-auth-library'

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const sendEmail = async(to: string, subject: string, html: string) => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    OAUTH_PLAYGROUND
  )
  oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN })

  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_SENDER_ADDRESS,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken
      }
    })

    const options = {
      from: process.env.MAIL_SENDER_ADDRESS,
      to,
      subject: `Job Seek - ${subject}`,
      html
    }

    const result = await transport.sendMail(options)
    return result
  } catch (err) {
    console.log(err)
  }
}

export default sendEmail