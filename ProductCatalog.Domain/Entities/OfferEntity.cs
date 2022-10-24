using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Domain.Entities
{
    public class OfferEntity : BaseEntity
    {
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int FromUserId { get; set; }
        public int ToUserId { get; set; }
        public int ProductId { get; set; }
        public float OfferPrice { get; set; }
        public bool IsAccepted { get; set; }
        public bool IsActive { get; set; }

    }
}
