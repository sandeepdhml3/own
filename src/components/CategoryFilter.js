import React from 'react';

const CategoryFilter = ({ categories, onFilter }) => {
  const handleFilter = (event) => {
    onFilter(event.target.value);
  };

  return (
    <select onChange={handleFilter} className="category-filter">
      <option value="">All Categories</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>{category}</option>
      ))}
    </select>
  );
};

export default CategoryFilter;
