import React, { ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxDispatch } from '../../redux/reducer';
import { ActionCreator } from '../../redux/actions';
import { NoSearchPerformedYet } from './no-search-performed-yet/no-search-performed-yet';
import { NoResultsFound } from './no-results-found/no-results-found';
import FoundResults from './found-results/found-results';
import { SearchFetchBook, SearchFetchResults } from '../../types/types';
import 'react-responsive-modal/styles.css';
import './search-results.scss';

const mapDispatch = (dispatch: ReduxDispatch) => ({
  setLoading(isLoading?: boolean) {
    dispatch(ActionCreator.setLoading(isLoading));
  }
});

const connector = connect(null, mapDispatch);

export interface SearchResultsProps extends ConnectedProps<typeof connector> {
  searchQuery?: string;
  setLoading: (isLoading?: boolean) => void;
}

export interface SearchResultsState {
  previousSearch?: string;
  foundResults: SearchFetchBook[];
  totalResults: number;
}

class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  searchQuery?: string;

  constructor(props: SearchResultsProps) {
    super(props);

    this.state = {
      previousSearch: undefined,
      foundResults: [],
      totalResults: 0,
    };
  }

  componentDidUpdate() {
    this.checkSearchChanged();
  }

  performSearch(rawQuery: string): void {
    this.setState({
      previousSearch: rawQuery,
    });

    this.props.setLoading();

    this.fetchBooks(rawQuery);
  }

  fetchBooks(rawQuery: string) {
    const neededFields = [
      'title',
      'cover_i',
      'author_name',
    ];

    const encodedQuery = encodeURIComponent(rawQuery);
    const requestUrl = `http://openlibrary.org/search.json?fields=${neededFields.join(',')}&q=${encodedQuery}`;
    fetch(requestUrl)
      .then(response => {
        if (!response.ok) {
          this.props.setLoading(false);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => this.parseSearchResults(data))
      .catch(error => {
        this.props.setLoading(false);
        throw new Error(error);
      });
  }

  checkSearchChanged() {
    if (this.state.previousSearch !== this.props.searchQuery
      && this.props.searchQuery !== undefined
      && this.props.searchQuery !== '')
    {
      console.log('query is', this.props.searchQuery);
      this.performSearch(this.props.searchQuery);
    }
  }

  parseSearchResults(data: SearchFetchResults) {
    this.setState({
      foundResults: data.docs,
      totalResults: data.numFound,
    });
    this.props.setLoading(false);
  }

  selectBlockToRender(): ReactNode {
    if (this.props.searchQuery === undefined) {
      return <NoSearchPerformedYet />;
    }
    if (this.state.previousSearch === undefined) {
      return null;
    }
    return (!this.state.foundResults.length)
      ? <NoResultsFound previousSearch={this.state.previousSearch} />
      : (
        <FoundResults
          previousSearch={this.state.previousSearch}
          foundResults={this.state.foundResults}
          totalResults={this.state.totalResults}
        />
      );
  }

  render () {
    return <section className="search-results--wrapper">{this.selectBlockToRender()}</section>;
  }
};

export default connector(SearchResults);
