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
    public class OfferRepository : GenericRepository<OfferEntity>, IOfferRepository
    {
        public OfferRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IQueryable<OfferEntity>> DeclineMultipleOffers(OfferModel model)
        {
            IQueryable<OfferEntity> query = GetAll();

            if (model != null)
            {
                if (model.UserId != null)
                {
                    query = query.Where(x => x.FromUserId == model.UserId || x.ToUserId == model.UserId);
                }

                if (model.FromUserId != null)
                {
                    query = query.Where(x => x.FromUserId == model.FromUserId);
                }

                if (model.ToUserId != null)
                {
                    query = query.Where(x => x.ToUserId == model.ToUserId);
                }


                if (model.IsActive != null)
                {
                    query = query.Where(x => x.IsActive == model.IsActive);
                }

                if (model.IsAccepted != null)
                {
                    query = query.Where(x => x.IsAccepted == model.IsAccepted);
                }

                if (model.ProductId != null)
                {
                    query = query.Where(x => x.ProductId == model.ProductId);
                }

                if (model.orderByPrice != null)
                {
                    if ((bool)model.orderByPrice)
                        query = query.OrderByDescending(x => x.OfferPrice);
                    else
                        query = query.OrderBy(x => x.OfferPrice);
                }

                if (model.OfferPrice != null)
                {
                    if (model.LowerThanPrice != null)
                    {
                        if ((bool)model.LowerThanPrice)
                        {
                            query = query.Where(x => x.OfferPrice <= model.OfferPrice);
                        }
                        else
                        {
                            query = query.Where(x => x.OfferPrice >= model.OfferPrice);
                        }
                    }
                }
            }

            List<OfferEntity> offers = query.ToList();

            offers.ForEach(x =>
            {
                x.IsActive = false;
                x.UpdateDate = DateTime.Now;
            });

            await UpdateMultipleEntity(offers);

            return query;
        }

        public IQueryable<OfferEntity> GetOffersByFiltering(OfferModel model)
        {
            IQueryable<OfferEntity> query = GetAll();

            if (model != null)
            {
                if (model.UserId != null)
                {
                    query = query.Where(x => x.FromUserId == model.UserId || x.ToUserId == model.UserId);
                }

                if (model.FromUserId != null)
                {
                    query = query.Where(x => x.FromUserId == model.FromUserId);
                }

                if (model.ToUserId != null)
                {
                    query = query.Where(x => x.ToUserId == model.ToUserId);
                }


                if (model.IsActive != null)
                {
                    query = query.Where(x => x.IsActive == model.IsActive);
                }

                if (model.IsAccepted != null)
                {
                    query = query.Where(x => x.IsAccepted == model.IsAccepted);
                }

                if (model.ProductId != null)
                {
                    query = query.Where(x => x.ProductId == model.ProductId);
                }

                if (model.orderByPrice != null)
                {
                    if ((bool)model.orderByPrice)
                        query = query.OrderByDescending(x => x.OfferPrice);
                    else
                        query = query.OrderBy(x => x.OfferPrice);
                }

                if (model.OfferPrice != null)
                {
                    if (model.LowerThanPrice != null)
                    {
                        if ((bool)model.LowerThanPrice)
                        {
                            query = query.Where(x => x.OfferPrice <= model.OfferPrice);
                        }
                        else
                        {
                            query = query.Where(x => x.OfferPrice >= model.OfferPrice);
                        }
                    }
                }

            }

            return query;
        }
    }
}
