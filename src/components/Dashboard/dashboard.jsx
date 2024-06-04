import { ActiveCard, MemberCard, PembayaranCard, TransactionCard } from "./dashboard-card";
import { PackageCard } from "./package-card";

const Dashboard = () => {
  return (
    <>
      <div class="mx-auto max-w-screen-2xl px-4 lg:px-12 overflow-auto">
        <h1 className="font-bold text-4xl mb-5 ml-4">Dashboard</h1>
        <div className="w-full flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5 mb-4">
          <MemberCard />
          <ActiveCard />
          <TransactionCard />
          <PembayaranCard />
        </div>
        <h1 className="font-bold text-4xl my-5 ml-4">Packages Status</h1>
        <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 gap-3 mb-4 flex-wrap">
          <PackageCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
