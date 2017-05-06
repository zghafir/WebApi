using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace LogIn.API.Services
{
    public class EmailService 
    {
        

        // Use NuGet to install SendGrid (Basic C# client lib) 
        public  async Task sendmail (string subject,string body,string to)
        {
            MailMessage message = new MailMessage();
            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;
            message.From = new MailAddress("ghzeggaf@gmail.com", "zeggaf");
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential("ghzeggaf@gmail.com", "ghzeggaf11472");
            smtp.Send(message);
        }
    }
}