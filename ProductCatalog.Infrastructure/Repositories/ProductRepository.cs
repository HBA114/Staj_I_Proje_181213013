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
    public class ProductRepository : GenericRepository<ProductEntity>, IProductRepository
    {
        public ProductRepository(AppDbContext context) : base(context)
        {
        }

        public IEnumerable<ProductEntity> GetByFiltering(ProductModel model)
        {
            IQueryable<ProductEntity> query = GetAll();

            if (model != null)
            {
                if (model.UserId != null)
                {
                    query = query.Where(x => x.UserId == model.UserId);
                }

                if (model.CategoryId != null)
                {
                    query = query.Where(x => x.CategoryId == model.CategoryId);
                }

                if (model.Name != null || model.Description != null)
                {
                    if (model.Description != null && model.Description != model.Name)
                    {
                        query = query.Where(x => x.Description.ToLower().Contains(model.Description.ToLower()));
                    }

                    if (model.Name != null && model.Name != model.Description)
                    {
                        query = query.Where(x => x.Name.ToLower().Contains(model.Name.ToLower()));
                    }

                    if (model.Description == model.Name)
                    {
                        query = query.Where(x => x.Description.ToLower().Contains(model.Description.ToLower()) || x.Name.ToLower().Contains(model.Name.ToLower()));
                    }
                }


                if (model.Price != null)
                {
                    if (model.LowerThanPrice != null)
                    {
                        if ((bool)model.LowerThanPrice)
                        {
                            query = query.Where(x => x.Price <= model.Price);
                        }
                        else
                        {
                            query = query.Where(x => x.Price >= model.Price);
                        }
                    }
                }

                if (model.orderByPrice != null)
                {
                    if ((bool)model.orderByPrice)
                        query = query.OrderByDescending(x => x.Price);
                    else
                        query = query.OrderBy(x => x.Price);
                }

                if (model.IsOfferable != null)
                {
                    query = query.Where(x => x.IsOfferable == model.IsOfferable);
                }

                if (model.IsSold != null)
                {
                    query = query.Where(x => x.IsSold == model.IsSold);
                }

                if (model.CreateDate != null)
                {
                    if (model.AfterCreateDate != null)
                    {
                        if ((bool)model.AfterCreateDate)
                        {
                            query = query.Where(x => x.CreateDate >= model.CreateDate);
                        }
                        else
                        {
                            query = query.Where(x => x.CreateDate <= model.CreateDate);
                        }
                    }
                }

                if (model.UsedStateId != null)
                {
                    query = query.Where(x => x.UsedStateId == model.UsedStateId);
                }

                if (model.ColorId != null)
                {
                    query = query.Where(x => x.ColorId == model.ColorId);
                }

                if (model.BrandId != null)
                {
                    query = query.Where(x => x.BrandId == model.BrandId);
                }
            }

            return query;
        }
    }
}
