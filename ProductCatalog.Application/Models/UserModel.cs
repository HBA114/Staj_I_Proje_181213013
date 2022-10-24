using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Models
{
    public class UserModel : BaseModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
