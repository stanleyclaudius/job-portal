export const authMsg = (subject: string, url: string) => {
  return `
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

export const orgStatusMsg = (status: string) => {
  return `
    <div style="border: 5px solid #ccc; padding: 15px;">
      <h1 style="text-align: center;">Job Seek Organization Approval Status</h1>
      <p>${status === 'reject' ? 'We\'re sorry to inform you that your organization registration has been rejected by our admin. If you\'re sure that the information you provided is correct, please register your organization to Job Seek again, then our admin will kindly review it and accept it.' : 'Yay! Your organization registration status has been accepted by our admin. Post a job then select the best candidate to build a strong team at your organization :)'}</p>
      <div style="margin-top: 20px;">
        <p>Thank you for using <strong>Job Seek</strong> as your job portal app.
        <p>Warm Regards,</p>
        <p>- Job Seek Team -</p>
      </div>
    </div>
  `
}