using Microsoft.Extensions.Configuration;
using ProductCatalog.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Infrastructure.Services
{
    public class MailSender : IMailSender
    {
        private SmtpClient smtpClient;
        private MailAddress fromAddress;

        public MailSender(IConfiguration configuration)
        {
            smtpClient = new SmtpClient()
            {
                Host = configuration.GetSection("MailSenderStrings").GetSection("Host").Value,
                Port = int.Parse(configuration.GetSection("MailSenderStrings").GetSection("Port").Value),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential()
                {
                    UserName = configuration.GetSection("MailSenderStrings").GetSection("UserName").Value,
                    Password = configuration.GetSection("MailSenderStrings").GetSection("Password").Value
                }
            };
            fromAddress = new MailAddress(configuration.GetSection("MailSenderStrings").GetSection("UserName").Value, configuration.GetSection("MailSenderStrings").GetSection("SenderName").Value);
        }

        private MailMessage message;
        public async Task SendWelcomeMail(MailAddress toMailAddress)
        {
            message = new MailMessage()
            {
                From = fromAddress,
                Subject = "Uygulamamıza Hoşgeldiniz",
                Body = @"Product Catalog uygulamasına hoşgeldiniz. Giriş yaparak uygulamaya devam edebilirsiniz.
- Hasan Basri Ayhaner from Primefor
                ",
            };

            message.To.Add(toMailAddress);

            await smtpClient.SendMailAsync(message);
        }

        public async Task SendWrongPasswordInfoMail(MailAddress toMailAddress)
        {
            message = new MailMessage()
            {
                From = fromAddress,
                Subject = "Yanlış Şifre Girişimi",
                Body = @"Product Catalog uygulamasına 3 kez yanlış şifre girdiniz. Lütfen hesabınızı tekrar kullanmaya başlamak için bizimle iletişime geçiniz.
- Hasan Basri Ayhaner from Primefor
                ",
            };

            message.To.Add(toMailAddress);

            await smtpClient.SendMailAsync(message);
        }
    }
}
