using ProductCatalog.Application.Interfaces;
using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using ProductCatalog.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Infrastructure.Repositories
{
    internal class BrandRepository : GenericRepository<BrandEntity>, IBrandRepository
    {
        public BrandRepository(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<BrandEntity> GetBrandsByFiltering(BrandModel model)
        {
            IQueryable<BrandEntity> query = GetAll();

            if (model != null)
            {
                if (model.Name != null)
                {
                    query = query.Where(x => x.Name.ToLower().Contains(model.Name.ToLower()));
                }
                if (model.CategoryId != null)
                {
                    query = query.Where(x => x.CategoryIdList.Contains(" '"+ model.CategoryId.ToString() +"' "));
                }
            }

            return query;
        }
    }
}
