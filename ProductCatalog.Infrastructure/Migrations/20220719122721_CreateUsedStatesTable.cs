using Microsoft.EntityFrameworkCore.Migrations;

namespace ProductCatalog.Infrastructure.Migrations
{
    public partial class CreateUsedStatesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UsedStates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsedStates", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsedStates_Name",
                table: "UsedStates",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsedStates");
        }
    }
}
