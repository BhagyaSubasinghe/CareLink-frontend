import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPages = () => {
    return [1, 2, 3, '...', 8];
  };

  const pages = getPages();

  return (
    <div className="flex items-center space-x-2">
      {/* Prev */}
      <button 
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* Pages */}
      {pages.map((p, idx) => {
        if (p === '...') {
          return <span key={idx} className="w-9 text-center text-gray-400 font-medium">...</span>;
        }

        const isActive = p === currentPage;
        return (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`flex items-center justify-center w-9 h-9 rounded-[8px] text-[14px] font-semibold transition-all border ${
              isActive
                ? 'bg-[#1e40af] text-white border-[#1e40af] shadow-md shadow-blue-500/20'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 shadow-[0_1px_2px_rgba(0,0,0,0.05)]'
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button 
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}