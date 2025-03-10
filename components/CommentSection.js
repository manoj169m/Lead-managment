'use client'

import { useState, useEffect } from 'react';

// Comment Section Component
export function CommentSection({ leadId, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const fetchComments = async () => {
    const response = await fetch(`/api/comments?leadId=${leadId}`);
    const data = await response.json();
    setComments(data);
  };

  const handleAddComment = async () => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newComment, leadId }),
    });
    if (response.ok) {
      setNewComment('');
      fetchComments();
    }
  };

  // Close the dialog by calling the onClose function passed as prop
  const handleCloseDialog = () => {
    if (onClose) {
      onClose(); // Trigger the parent component's onClose function
    }
  };

  useEffect(() => {
    fetchComments();
  }, [leadId]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <ul className="mt-2 space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="p-2 bg-gray-100 rounded-md">
              {comment.content}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Add a comment..."
          />
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Comment
          </button>
        </div>
        <button
          onClick={handleCloseDialog}
          className="mt-4 w-full bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
