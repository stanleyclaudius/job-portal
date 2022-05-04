const nodemailer = require('nodemailer')
import { OAuth2Client } from 'google-auth-library'

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const sendEmail = async(to: string, subject: string, url: string) => {
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
      html: `
        <div style="border: 5px solid #ccc; padding: 15px;">
          <h1 style="text-align: center;">Job Seek ${subject}</h1>
          <p>Please click below button to proceed the chosen action</p>
          <a style="display: block; text-decoration: none; background: orange; color: #fff; width: 130px; height: 35px; text-align: center; line-height: 35px; margin-top: 15px" href=${url}>Click Me</a>
          <div style="margin-top: 20px;">
            <p>Thank you for using <strong>Job Seek</strong> as your job portal app.
            <p>Warm Regards,</p>
            <p>- Job Seek Team -</p>
          </div>
        </div>
      `
    }

    const result = await transport.sendMail(options)
    return result
  } catch (err) {
    console.log(err)
  }
}

export default sendEmail