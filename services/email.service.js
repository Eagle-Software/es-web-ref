import axios from "axios"
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'
import nodemailer from 'nodemailer'
import MarkdownIt from 'markdown-it'

/* Markdown compiler */
var mdi = new MarkdownIt({
   linkify: true /* Autoconvert URL-like text to links */
})

console.log("MailService")
const DOMPurify = createDOMPurify(new JSDOM('').window)

/* Can't run this in client browser... duhhhh */
/*
let mailTransport = nodemailer.createTransport( smtpSettings )

   console.log("MailService verify")
mailTransport.verify( (error, success) => {
   console.log("MailService verify")
   if (error) {
      console.log(error)
   } else {
      console.log("Ready to send emails")
   }
})
*/

class EmailService {

   sendApplication( application ) {

      var text = ''

      var md = ''

      var cleanHTML = DOMPurify.sanitize( mdi.render(md) )

      mailTransport.sendMail({
         from: smtpSettings.auth.user,
         to: "ccoulter@eaglemed.com",
         subject: "New Application from " + application.name + " for " + application.position + " position.",
         text: text,
         html: cleanHTML
      },
         (err, info) => {
            if (err) {
               console.log(err)
               return
            } else {
               console.log("Successfully sent email")
               console.dir(info)
            }
         }
      )
   }

   sendContactUs( message ) {
      var text = ""
      text += "Name: " + message.name + '\n'
      text += "Email: " + message.email + '\n'
      text += "Company: " + message.company + '\n'
      text += "Message: " + message.message + '\n'

      var md = `# **` +  message.company + `**` + '\n'
      md += `Name: ` + message.name + '\n\n'
      md += `Email: ` + message.email + '\n\n'
      md += message.message + '\n'

      var cleanHTML = DOMPurify.sanitize( mdi.render(md) )

      mailTransport.sendMail({
         from: smtpSettings.auth.user,
         to: "ccoulter@eaglemed.com",
         subject: "New message from 'Contact Us' page from " + message.name + " (" + message.company + ")",
         text: text,
         html: cleanHTML
      },
         (err, info) => {
            if (err) {
               console.log(err)
               return
            } else {
               console.log("Successfully sent email")
               console.dir(info)
            }
         }
      )

   }

}

export default new EmailService()
