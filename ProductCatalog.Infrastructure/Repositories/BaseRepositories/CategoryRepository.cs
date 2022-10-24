using ProductCatalog.Application.Interfaces.BaseInterfaces;
using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities.BaseEntities;
using ProductCatalog.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Infrastructure.Repositories.BaseRepositories
{
    public class CategoryRepository : GenericRepository<CategoryEntity>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }

        public IQueryable<CategoryEntity> GetCategoriesByFiltering(BaseModel model)
        {
            IQueryable<CategoryEntity> query = GetAll();

            if (model != null)
            {
                if (model.Name != null)
                {
                    query = query.Where(x => x.Name.ToLower().Contains(model.Name.ToLower()));
                }
            }

            return query;
        }
    }
}
