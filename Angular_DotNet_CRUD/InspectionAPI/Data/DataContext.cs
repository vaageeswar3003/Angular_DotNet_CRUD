using Microsoft.EntityFrameworkCore;

namespace InspectionAPI.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options): base(options) { }

        public DbSet<Inspection> Inspectionss { get; set; }

        public DbSet<InspectionType> InspectionTypes { get; set; }

        public DbSet<Status> Statuses { get; set; }

        public DbSet<TestVarBinary> testVarBinaries { get; set; }

    }
}
