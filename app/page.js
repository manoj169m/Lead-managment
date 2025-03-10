'use client';
import { useEffect, useState } from 'react';
import LeadTable from '../components/LeadTable';

export default function Home() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => setLeads(data));
  }, []);

  return (
    <div>
      <h1>Leads</h1>
      
      <LeadTable leads={leads} />
    </div>
  );
}