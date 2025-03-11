'use client';
import { useState } from 'react';

const LeadsStatusFilter = () => {
  const [leads, setLeads] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const statuses = ['Mailed', 'FollowUp', 'NotWorked', 'New']; // Lead status options

  // Function to fetch leads based on selected status using fetch
  const fetchLeadsByStatus = async (status) => {
    try {
      const response = await fetch(`/api/${status}`);
      
      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const data = await response.json(); // Parse the JSON data from the response
      setLeads(data);
      setSelectedStatus(status); // Update selected status
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Status filter buttons */}
      <div className="flex gap-4 mb-6 justify-center">
        {statuses.map((status) => (
          <button
            key={status}
            className={`px-6 py-3 rounded-full text-white text-lg transition-all duration-300 ${
              selectedStatus === status ? 'bg-green-600' : 'bg-gray-500'
            } hover:bg-green-500 focus:outline-none shadow-md hover:shadow-lg`}
            onClick={() => fetchLeadsByStatus(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Displaying leads based on selected status */}
      <div>
        <h3 className="text-2xl font-semibold text-center mb-6">
          {selectedStatus
            ? `Leads with ${selectedStatus} Status`
            : 'Select a status to view leads'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No leads available for this status.
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Lead Name */}
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {lead.url ? (
                    <a href={lead.link} className="text-blue-500 hover:underline">
                      {lead.name}
                    </a>
                  ) : (
                    <span className="text-blue-500">{lead.name}</span>
                  )}
                </h4>

                {/* Contact Info */}
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Contact Info:</strong>{' '}
                  <a href={`tel:${lead.contactInfo}`} className="text-blue-500 hover:underline">
                    {lead.contactInfo}
                  </a>
                </p>

                {/* Category */}
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Category:</strong> {lead.category}
                </p>

                {/* Comments Section */}
                <div className="mt-4">
                  <p className="font-semibold text-gray-800 mb-2">Comments:</p>
                  <ul className="list-disc ml-6 text-gray-600 space-y-1">
                    {lead.comments.map((comment) => (
                      <li key={comment.id} className="text-sm">{comment.content}</li>
                    ))}
                  </ul>
                </div>

               
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsStatusFilter;
