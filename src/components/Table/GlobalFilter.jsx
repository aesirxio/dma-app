/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { useAsyncDebounce } from 'react-table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';

const GlobalFilter = ({
  setGlobalFilter,
  searchText,
  filter,
  setFilter,
}) => {
  const [, setValue] = React.useState("");
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter({ keyword: value });
  }, 200);

  return (
    <span className=" d-flex align-items-center position-relative pe-3 border-end-1 w-400">
      <input
        onChange={(e) => {
          if (setFilter) {
            setFilter(e.target.value, 1);
          }
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        value={filter.searchText}
        placeholder={searchText}
        className="form-control border-end-0 pe-2 border-0 pe-4"
      />
      <i className="text-green position-absolute top-0 bottom-0 end-0 pe-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faSearch} />
      </i>
    </span>
  );
};

export default GlobalFilter;
