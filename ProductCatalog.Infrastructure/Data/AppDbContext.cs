using Microsoft.EntityFrameworkCore;
using ProductCatalog.Domain.Entities;
using ProductCatalog.Domain.Entities.BaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductCatalog.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<UserEntity> Users { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<BrandEntity> Brands { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ColorEntity> Colors { get; set; }
        public DbSet<UsedStateEntity> UsedStates { get; set; }
        public DbSet<OfferEntity> Offers { get; set; }
        public DbSet<OrderEntity> Orders { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UserEntity>(entity =>
            {
                entity.HasIndex(user => user.Email).IsUnique();
            });

            builder.Entity<BrandEntity>(entitiy =>
            {
                entitiy.HasIndex(brand => brand.Name).IsUnique();
            });

            builder.Entity<CategoryEntity>(entity =>
            {
                entity.HasIndex(category => category.Name).IsUnique();
            });

            builder.Entity<ColorEntity>(entity =>
            {
                entity.HasIndex(color => color.Name).IsUnique();
            });

            builder.Entity<UsedStateEntity>(entity =>
            {
                entity.HasIndex(used_state => used_state.Name).IsUnique();
            });
        }
    }
}
