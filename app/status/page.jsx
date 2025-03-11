// pages/index.js

import LeadsStatusFilter from "@/components/StatusFilter";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lead Management</h1>
      <LeadsStatusFilter />
    </div>
  );
};

export default Home;
