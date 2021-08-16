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
  setSearchQuery(searchQuery: string) {
    dispatch(ActionCreator.setSearchQuery(searchQuery));
  }
});

const connector = connect(mapState, mapDispatch);

export interface SearchFieldProps extends ConnectedProps<typeof connector> {
  setSearchQuery: (searchQuery: string) => void;
}

const SearchField: FC<SearchFieldProps> = ({ setSearchQuery }) => {
  let searchTimeout: NodeJS.Timeout;
  const searchTimeoutDelay = 1000;

  const inputRef = React.createRef<HTMLInputElement>();

  const handleOnChange = (): void => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(
      () => {
        if (inputRef.current !== null) {
          setSearchQuery(inputRef.current.value)
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
};

export default connector(SearchField);
