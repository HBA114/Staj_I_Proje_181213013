using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces
{
    public interface IBrandRepository : IRepository<BrandEntity>
    {
        IEnumerable<BrandEntity> GetBrandsByFiltering(BrandModel model);    // e.g filter by category
    }
}
