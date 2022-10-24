using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities.BaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces.BaseInterfaces
{
    public interface IColorRepository : IRepository<ColorEntity>
    {
        IQueryable<ColorEntity> GetColorsByFiltering(BaseModel model);
    }
}
