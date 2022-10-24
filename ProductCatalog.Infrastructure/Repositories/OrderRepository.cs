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
    public class OrderRepository : GenericRepository<OrderEntity>, IOrderRepository
    {
        public OrderRepository(AppDbContext context) : base(context)
        {
        }

        public IQueryable<OrderEntity> GetByFiltering(OrderModel model)
        {
            IQueryable<OrderEntity> query = GetAll();

            if (model != null)
            {
                if (model.ProductId != null)
                {
                    query = query.Where(x => x.ProductId == model.ProductId);
                }
                if (model.BuyerId != null)
                {
                    query = query.Where(x => x.BuyerId == model.BuyerId);
                }
            }

            return query;
        }

        public IQueryable<OrderEntity> GetOrdersFromMe(List<int> productIdList)
        {
            IQueryable<OrderEntity> query = GetAll();

            if (productIdList.Count > 0)
            {
                query = query.Where(x => productIdList.Contains(x.ProductId));
            }

            return query;
        }
    }
}
