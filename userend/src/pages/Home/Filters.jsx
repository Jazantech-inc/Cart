import React from 'react'
import {Input} from "antd"

const category = [
  {
    name: 'Electronics',
    value: 'electronics'
  },
  {
    name: 'Garments',
    value: 'garments'
  },
  {
    name: 'Sports',
    value: 'sports'
  },
  {
    name: 'Fashion',
    value: 'fashion'
  },
  {
    name: 'Home',
    value: 'home'
  },
];
const year = [
  {
    name: '0-3 years old',
    value: '0-3'
  },
  {
    name: '4-6 years old',
    value: '4-6'
  },
  {
    name: '7-10 years old',
    value: '7-10'
  },
  {
    name: '11-15 years old',
    value: '11-15'
  },
  {
    name: 'More than 15+ years old',
    value: '15-25'
  },
];
function Filters({
  showFilters,
  setShowFilters,
  filters,
  setFilters
}) {
  return (
    <div className='w-96 flex flex-col'>
      <div className='flex justify-between'>
        <h1 className='text-orange-900 text-xl'>Filters</h1>
        <i className="ri-close-line text-orange-900 text-xl
            cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}>
        </i>
      </div>

      <div className="flex flex-col gap-1 mt-5">

        <h1 className='text-orange-700'> Category </h1>

        <div className='flex flex-col'>
          {category.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="filters"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label hmlfor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <h1 className='text-orange-700'> Year </h1>

        <div className='flex flex-col'>
          {year.map((year) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="year"
                  className="filters"
                  checked={filters.year.includes(year.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        year: [...filters.year, year.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        year: filters.year.filter(
                          (item) => item !== year.value
                        ),
                      });
                    }
                  }}
                />
                <label hmlfor="year">{year.name}</label>
              </div>
            );
          })}
        </div>

        
      </div>
    </div>
  );
}

export default Filters
