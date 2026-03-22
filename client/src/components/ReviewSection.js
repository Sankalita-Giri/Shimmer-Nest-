import React, { useState } from 'react';

export default function ReviewSection({ product }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([
    { name: 'Priya S.', rating: 5, comment: 'Absolutely gorgeous! The quality is amazing and it arrived beautifully packaged. 💜', date: 'March 2026' },
    { name: 'Rhea M.', rating: 4, comment: 'Loved the custom note option! The product was exactly as described and so soft.', date: 'February 2026' },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || rating === 0 || !comment.trim()) return;
    setReviews([{ name, rating, comment, date: 'Just now' }, ...reviews]);
    setName('');
    setRating(0);
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="mt-12 space-y-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-black text-gray-800 italic tracking-tighter">
          Customer Reviews
        </h3>
        {avgRating && (
          <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
            <span className="text-yellow-400 text-sm">{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}</span>
            <span className="text-[11px] font-black text-purple-500 uppercase tracking-widest">
              {avgRating} · {reviews.length} reviews
            </span>
          </div>
        )}
      </div>

      {/* Existing Reviews */}
      <div className="space-y-4">
        {reviews.length === 0 && (
          <p className="text-gray-300 font-medium italic text-sm text-center py-8">
            No reviews yet — be the first! 🌸
          </p>
        )}
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-white rounded-[2.5rem] p-6 shadow-md border-2 border-purple-50 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 font-black text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-black text-gray-700 text-sm">{r.name}</p>
                  <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{r.date}</p>
                </div>
              </div>
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className={`text-sm ${s <= r.rating ? 'text-yellow-400' : 'text-gray-100'}`}>★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium leading-relaxed pl-12">
              {r.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Write a Review */}
      <div className="bg-white rounded-[3rem] p-8 shadow-xl border-4 border-purple-50 space-y-6">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
          Write a Review ✍️
        </p>

        {/* Star Rating Picker */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Your Rating</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                onMouseEnter={() => setHovered(s)}
                onMouseLeave={() => setHovered(0)}
                className={`text-3xl transition-transform hover:scale-125 ${
                  s <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-100'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name 🌸"
          className="w-full p-4 rounded-[1.5rem] bg-purple-50/50 border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium transition-all"
        />

        {/* Comment */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product... 💜"
          rows={3}
          className="w-full p-5 rounded-[2rem] bg-purple-50/50 border-2 border-transparent focus:border-purple-200 outline-none text-sm font-medium italic resize-none transition-all"
        />

        <button
          onClick={handleSubmit}
          disabled={!name.trim() || rating === 0 || !comment.trim()}
          className="w-full py-5 bg-purple-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {submitted ? '✅ Thank you!' : 'Submit Review ✨'}
        </button>
      </div>
    </div>
  );
}