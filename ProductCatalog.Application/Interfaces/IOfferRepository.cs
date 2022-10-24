using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces
{
    public interface IOfferRepository : IRepository<OfferEntity>
    {
        IQueryable<OfferEntity> GetOffersByFiltering(OfferModel model);
        Task<IQueryable<OfferEntity>> DeclineMultipleOffers(OfferModel model);
    }
}
