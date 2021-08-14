import React, { FC } from 'react';
import { SearchField, SearchFieldProps } from '../search-field/search-field';
import './search-block.scss';

export const SearchBlock: FC<SearchFieldProps> = (props) => {
  return (
    <section className="search-block--wrapper">
      <SearchField performSearch={props.performSearch} />
    </section>
  );
}