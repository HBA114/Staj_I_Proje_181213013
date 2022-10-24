using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces
{
    public interface IOrderRepository : IRepository<OrderEntity>
    {
        IQueryable<OrderEntity> GetByFiltering(OrderModel model);
        IQueryable<OrderEntity> GetOrdersFromMe(List<int> productIdList);
    }
}
