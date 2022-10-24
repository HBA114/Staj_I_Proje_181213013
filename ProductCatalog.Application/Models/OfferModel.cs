using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Models
{
    public class OfferModel : BaseModel
    {
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }
        public int? FromUserId { get; set; }
        public int? ToUserId { get; set; }
        public int? ProductId { get; set; }
        public float? OfferPrice { get; set; }
        public bool? IsAccepted { get; set; }
        public bool? IsActive { get; set; }
        public int? UserId { get; set; }

        // Search Query properties
        public bool? LowerThanPrice { get; set; }
        public bool? AfterCreateDate { get; set; }
        public bool? orderByPrice { get; set; }
    }
}
