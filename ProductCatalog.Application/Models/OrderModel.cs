using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Models
{
    public class OrderModel : BaseModel
    {
        public DateTime? OrderDate { get; set; }
        public int? ProductId { get; set; }
        public int? BuyerId { get; set; }
    }
}
