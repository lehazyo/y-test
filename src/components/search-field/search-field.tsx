import React, { FC } from 'react';
import { ReactComponent as IcSearch } from '../../icons/magnifying-glass.svg';
import './search-field.scss';

export interface SearchFieldProps {
  performSearch: (query: string) => void;
}

export const SearchField: FC<SearchFieldProps> = ({ performSearch }) => {
  let searchTimeout: NodeJS.Timeout;
  const searchTimeoutDelay = 1000;

  const inputRef = React.createRef<HTMLInputElement>();

  const handleOnChange = (): void => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(
      () => {
        if (inputRef.current !== null) {
          performSearch(inputRef.current.value)
        }
      },
      searchTimeoutDelay,
    );
  };

  return (
    <div className="search-field--wrapper">
      <input
        className="search-field--input"
        type="text"
        aria-label="Поле поискового запроса"
        placeholder="Поиск по названию, автору, ISBN"
        ref={inputRef}
        onChange={handleOnChange}
      />
      <button className="search-field--submit">
        <IcSearch className="search-field--icon" />
      </button>
    </div>
  );
}