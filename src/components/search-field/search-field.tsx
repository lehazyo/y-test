import React, { FC } from 'react';
import { ReactComponent as IcSearch } from '../../icons/magnifying-glass.svg';
import { connect, ConnectedProps } from 'react-redux';
import { ActionCreator } from '../../redux/actions';
import './search-field.scss';
import { ReduxDispatch, ReduxState } from '../../redux/reducer';

const mapState = (state: ReduxState) => ({
  searchQuery: state.searchQuery,
});

const mapDispatch = (dispatch: ReduxDispatch) => ({
  setSearchQuery(searchQuery?: string) {
    dispatch(ActionCreator.setSearchQuery(searchQuery));
  }
});

const connector = connect(mapState, mapDispatch);

export interface SearchFieldProps extends ConnectedProps<typeof connector> {
  setSearchQuery: (searchQuery?: string) => void;
}

const SearchField: FC<SearchFieldProps> = ({ setSearchQuery }) => {
  let searchTimeout: NodeJS.Timeout;
  const searchTimeoutDelay = 1000;

  const inputRef = React.createRef<HTMLInputElement>();

  const submitSearch = (value: string): void => setSearchQuery(value);

  const handleOnClick = () => {
    clearTimeout(searchTimeout);
    if (inputRef.current !== null) {
      submitSearch(inputRef.current.value);
    }
  }

  const checkRefAndSubmit = () => {
    if (inputRef.current !== null) {
      submitSearch(inputRef.current.value);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Return') {
      clearTimeout(searchTimeout);
      checkRefAndSubmit();
    }
  }

  const handleOnChange = (): void => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(checkRefAndSubmit, searchTimeoutDelay);
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
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-field--submit"
        onClick={handleOnClick}
      >
        <IcSearch className="search-field--icon" />
      </button>
    </div>
  );
};

export default connector(SearchField);
