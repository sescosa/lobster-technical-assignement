export default class OrderMailerService {
    constructor(private emailAddress: string) {
      if (!emailAddress) throw new Error(`An emailAddress is required`)
    }
  
    public async sendEmail() {
      console.log(`Sending email to <${this.emailAddress}>...`)
    }
  }