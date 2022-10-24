using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces.Services
{
    public interface IMailSender
    {
        Task SendWelcomeMail(MailAddress toMailAddress);
        Task SendWrongPasswordInfoMail(MailAddress toMailAddress);
    }
}
