import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center transition-all duration-300 ${
        isFocused 
          ? 'bg-slate-200 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/50' 
          : 'bg-slate-100 hover:bg-slate-200'
      } rounded-xl border border-slate-200 overflow-hidden`}
    >
      <div className="pl-3 pr-2 text-slate-400 flex-shrink-0">
        <FiSearch className={`w-4 h-4 transition-colors ${isFocused ? 'text-cyan-400' : ''}`} />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder-gray-500 py-2.5 pr-2"
      />
      
      <AnimatePresence>
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={clearSearch}
            className="pr-3 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
};

export default SearchBar;
