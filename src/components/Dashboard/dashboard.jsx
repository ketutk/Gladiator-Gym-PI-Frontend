import { useState } from "react";
import { ActiveCard, MemberCard, PembayaranCard, TransactionCard } from "./dashboard-card";
import { PackageCard } from "./package-card";
import { useEffect } from "react";
import { fetchDashboardData } from "../../functions/API/fetchDashboard";

const Dashboard = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetchDashboardData(token);
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div class="mx-auto max-w-screen-2xl px-4 lg:px-12 overflow-auto">
        <h1 className="font-bold text-4xl mb-5 ml-4">Dashbor</h1>
        <div className="w-full flex flex-col lg:flex-row justify-center items-center space-y-5 lg:space-y-0 lg:space-x-5 mb-4">
          <MemberCard isLoading={isLoading} totalMember={data?.members} />
          <ActiveCard isLoading={isLoading} totalMember={data?.active_members} />
          <TransactionCard isLoading={isLoading} transactions={data?.payments_count} />
          <PembayaranCard isLoading={isLoading} transactions={data?.payments_sum} />
        </div>
        <h1 className="font-bold text-4xl my-5 ml-4">Status Paket</h1>
        <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 gap-3 mb-4 flex-wrap">
          <PackageCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
