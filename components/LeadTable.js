'use client'

import Link from 'next/link';
import { useState } from 'react';
import { CommentSection } from './CommentSection'; // Import the CommentSection component
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the DatePicker styles

// Helper function to format the date
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString(); // Format the date as 'MM/DD/YYYY'
};

export default function LeadTable({ leads, setLeads }) {
  const [selectedDate, setSelectedDate] = useState(null); // Initially no date selected
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    category: '',
    status: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'edit' or 'comment'

  // Filter leads by selected date
  const filteredLeads = selectedDate
    ? leads.filter((lead) => formatDate(lead.date) === formatDate(selectedDate))
    : leads; // If no date selected, show all leads

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
    setDialogType('edit');
    setIsDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedLead = {
      name: formData.name,
      contactInfo: formData.contactInfo,
      link: selectedLead.link,
      instaLink: selectedLead.instaLink,
      category: formData.category,
      status: formData.status,
    };
  
    try {
      const response = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        console.log('Updated Lead:', updatedData);

        const updatedLeadsResponse = await fetch('/api/leads');
        if (updatedLeadsResponse.ok) {
          const updatedLeads = await updatedLeadsResponse.json();
          setLeads(updatedLeads);
        }

        setIsDialogOpen(false);
        setSelectedLead(null);
        setFormData({
          name: '',
          contactInfo: '',
          category: '',
          status: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to update lead:', errorData.error);
      }
    } catch (error) {
      console.error('Error while updating lead:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedLead(null);
    setFormData({
      name: '',
      contactInfo: '',
      category: '',
      status: '',
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Calendar/Date Picker */}
      <div className="flex justify-center mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholderText="Select a date to filter"
        />
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <p>No leads found for the selected date.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-center mb-2">
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
              <p className="text-sm text-gray-500 mb-4">
                <Link href={lead.instaLink} target="blank">
                  socialMedia Links
                </Link>
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleEdit(lead.id)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setDialogType('comment');
                    setIsDialogOpen(true);
                  }}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
                >
                  Add Comments
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Form */}
      {isDialogOpen && dialogType === 'edit' && selectedLead && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 max-w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center">Edit Lead</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                  Contact Info
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="form-field">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="New">New</option>
            <option value="Mailed">Mailed</option>
            <option value="FollowUp">Follow-up</option>
            <option value="NotWorked">Not Worked</option>
          </select>
        </div>

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseDialog}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comment Section */}
      {isDialogOpen && dialogType === 'comment' && selectedLead && (
        <div className="mt-8">
          <CommentSection leadId={selectedLead.id} onClose={handleCloseDialog} />
        </div>
      )}
    </div>
  );
}
