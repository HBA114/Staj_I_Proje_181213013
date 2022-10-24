using ProductCatalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        Task<TEntity> CreateAsync(TEntity entity);
        IQueryable<TEntity> GetAll();
        TEntity GetById(int id);
        Task UpdateEntity(TEntity entity);
        TEntity DeleteEntity(int id);
        Task UpdateMultipleEntity(List<TEntity> entities);
    }
}
