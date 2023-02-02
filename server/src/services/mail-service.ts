const nodemailer = require('nodemailer')


class MailService {
    transporter:any;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:           process.env.SMTP_HOST,
            port:           process.env.SMTP_PORT,
            domain:         process.env.SMTP_DOMAIN,
            authentication: process.env.SMTP_AUTHENTICATION,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

    }

    sendActivationMail(to:string, link:string){
             this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject:'Активация аккаунта на '+process.env.API_URL,
                text:'',
                html:
                    ` 
                    <div>
                        <h1>Для активации пройдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            }, () =>{
                console.log('mail was send')
            })
    };


}
module.exports = new MailService()

