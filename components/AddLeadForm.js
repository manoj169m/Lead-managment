'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddLeadForm() {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    link: '',
    instaLink: '',
    category: '',
    status: 'New',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router =useRouter()

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation before submission
  const validateForm = () => {
    const { name, contactInfo, category } = formData;
    if (!name || !contactInfo || !category) {
      setError('Name, Contact Info, and Category are required!');
      return false;
    }
    setError('');
    return true;
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Only submit if validation passes

    setLoading(true);
    try {
      const response = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Lead added successfully!');
        router.push('/addlead')
        setFormData({
          name: '',
          contactInfo: '',
          link: '',
          instaLink: '',
          category: '',
          status: 'New',
        });
      } else {
        setError('Failed to add lead. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add New Lead</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-field">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Info</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            placeholder="Enter Contact Info"
            value={formData.contactInfo}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="url"
            id="link"
            name="link"
            placeholder="Enter Website Link (Optional)"
            value={formData.link}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="form-field">
          <label htmlFor="instaLink" className="block text-sm font-medium text-gray-700">Instagram Link</label>
          <input
            type="url"
            id="instaLink"
            name="instaLink"
            placeholder="Enter Instagram Link (Optional)"
            value={formData.instaLink}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="form-field">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter Category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Add Lead'}
        </button>
      </form>
    </div>
  );
}
