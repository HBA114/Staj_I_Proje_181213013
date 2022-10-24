﻿using ProductCatalog.Application.Models;
using ProductCatalog.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Application.Interfaces
{
    public interface IUserRepository : IRepository<UserEntity>
    {
        UserEntity GetByEmail(string email);
        IEnumerable<UserEntity> GetByFiltering(UserModel model);
    }
}
