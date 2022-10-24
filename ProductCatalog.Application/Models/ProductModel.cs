using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Models
{
    public class ProductModel : BaseModel
    {
        public int? UserId { get; set; }
        public int? CategoryId { get; set; }
        public string Description { get; set; }
        public float? Price { get; set; }
        public bool? IsOfferable { get; set; }
        public bool? IsSold { get; set; }
        public string ImageBase64 { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UsedStateId { get; set; }
        public int? ColorId { get; set; }
        public int? BrandId { get; set; }

        // Search Query properties
        public bool? LowerThanPrice { get; set; }
        public bool? AfterCreateDate { get; set; }
        public bool? orderByPrice { get; set; }
    }
}
