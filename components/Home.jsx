'use client';

import { useEffect, useState } from 'react';
import LeadTable from './LeadTable';

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
        setIsLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching leads:', error);
        setIsLoading(false); // Stop loading even if there's an error
      });
  }, []);

  return (
    <div>
      <h1>Leads</h1>

      {/* Display loading animation when data is being fetched */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <LeadTable leads={leads} setLeads={setLeads} />
      )}
    </div>
  );
}
