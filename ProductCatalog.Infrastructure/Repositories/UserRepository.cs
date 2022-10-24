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
    public class UserRepository : GenericRepository<UserEntity>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public UserEntity GetByEmail(string email) // add try catch and exception
        {
            var user = GetAll().Where(x => x.Email == email).FirstOrDefault();
            return user;
        }

        public IEnumerable<UserEntity> GetByFiltering(UserModel model)
        {
            IQueryable<UserEntity> query = GetAll();

            if (model != null)
            {
                if (model.Name != null)
                {
                    query = query.Where(x => x.Name.ToLower().Contains(model.Name.ToLower()));
                }
                if (model.Email != null)
                {
                    query = query.Where(x => x.Email.ToLower().Contains(model.Email.ToLower()));
                }
            }

            return query;
        }
    }
}
