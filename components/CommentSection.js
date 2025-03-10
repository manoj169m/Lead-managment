import { useState, useEffect } from 'react';

// Comment Section Component
export function CommentSection({ leadId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
  
    const fetchComments = async () => {
      const response = await fetch(`/api/comments?leadId=${leadId}`);
      const data = await response.json();
      setComments(data);
    };
  
    const handleAddComment = async () => {
      const response = await fetch('/api/comments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment, leadId }),
      });
      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    };
  
    useEffect(() => {
      fetchComments();
    }, [leadId]);
  
    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
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
      </div>
    );
  }
  