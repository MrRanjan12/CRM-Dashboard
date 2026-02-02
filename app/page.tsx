import DashboardLayout from "../components/DashboardLayout";
import CustomersHeader from "../components/CustomersHeader";
import CustomersToolbar from "../components/CustomersToolbar";
import CustomersTable from "../components/CustomersTable";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <CustomersHeader />
        <CustomersToolbar />
        <CustomersTable />
      </div>
    </DashboardLayout>
  );
}
