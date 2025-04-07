import DashboardLayout from "./DashboardLayout";
import AnalyticsCards from "./AnalyticsCard";
import RevenueBarChart from "./RevenueChart";
import ContractorCard from "./ContractorCard";

const contractors = [
  {
    name: "Alice Johnson",
    progress: 85,
    clients: [
      {
        name: "Client A",
        contract: "#001",
        status: "Active",
        amount: "$15,000",
      },
      {
        name: "Client B",
        contract: "#002",
        status: "Completed",
        amount: "$10,000",
      },
    ],
  },
  {
    name: "Robert Gray",
    progress: 60,
    clients: [
      {
        name: "Client C",
        contract: "#003",
        status: "Pending",
        amount: "$5,000",
      },
      {
        name: "Client D",
        contract: "#004",
        status: "Active",
        amount: "$8,000",
      },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <AnalyticsCards />
      <RevenueBarChart />
      {contractors.map((c, i) => (
        <ContractorCard key={i} contractor={c} />
      ))}
    </DashboardLayout>
  );
}
