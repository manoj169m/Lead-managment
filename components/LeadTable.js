import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CommentSection } from './CommentSection'; // Import the CommentSection component

// Main LeadTable Component
export default function LeadTable({ leads }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    category: '',
    status: '',
  });

  // Handle Edit
  const handleEdit = (id) => {
    const lead = leads.find((lead) => lead.id === id);
    setSelectedLead(lead);
    setFormData({
      name: lead.name,
      contactInfo: lead.contactInfo,
      category: lead.category,
      status: lead.status,
    });
    setIsEditing(true);
  };

  // Handle Form Data Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Form Submit (update lead)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically call an API to update the lead in the database
    console.log('Updated Lead:', formData);
    setIsEditing(false);
    setSelectedLead(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Leads List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-center mb-2">
              {/* Check if lead.url exists before using it in the Link */}
              {lead.url ? (
                <Link href={lead.link} className="text-blue-500">
                  {lead.name}
                </Link>
              ) : (
                <a href={lead.link}>
                  <span className="text-blue-500">{lead.name}</span>
                </a>
              )}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Contact Info:
              <a href={`tel:${lead.contactInfo}`} className="text-blue-500 hover:underline">
                {lead.contactInfo}
              </a>
            </p>
            <p className="text-sm text-gray-500 mb-2">Category: {lead.category}</p>
            <p className="text-sm text-gray-500 mb-4">Status: {lead.status}</p>
            <div className="flex justify-center space-x-4">
              {/* Separate Edit and Add Comment buttons */}
              <button
                onClick={() => handleEdit(lead.id)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => setSelectedLead(lead)}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Add Comments
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form (visible only when editing) */}
      {isEditing && selectedLead && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 max-w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Info</label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="New">New</option>
                  <option value="Mailed">Mailed</option>
                  <option value="FollowUp">Follow-up</option>
                  <option value="NotWorked">Not Worked</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Update Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comment Section (visible only when viewing comments for a lead) */}
      {selectedLead && !isEditing && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Comments for {selectedLead.name}</h3>
          <CommentSection leadId={selectedLead.id} />
        </div>
      )}
    </div>
  );
}
