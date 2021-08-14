import React, { ReactNode } from 'react';
import { NoSearchPerformedYet } from './no-search-performed-yet/no-search-performed-yet';
import { NoResultsFound } from './no-results-found/no-results-found';
import { FoundResults } from './found-results/found-results';
import { SearchFetchBook, SearchFetchResults } from '../../types/types';
import { SearchResultsLoader } from './search-results-loader/search-results-loader';
import 'react-responsive-modal/styles.css';
import './search-results.scss';

export interface SearchResultsProps {
  searchQuery?: string;
}

export interface SearchResultsState {
  previousSearch?: string;
  isSearching: boolean;
  foundResults: SearchFetchBook[];
  totalResults: number;
}

export class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  searchQuery?: string;

  constructor(props: SearchResultsProps) {
    super(props);

    this.state = {
      previousSearch: undefined,
      isSearching: false,
      foundResults: [],
      totalResults: 0,
    };
  }

  componentDidUpdate() {
    this.checkSearchChanged();
  }

  performSearch(rawQuery: string): void {
    this.setState({
      isSearching: true,
      previousSearch: rawQuery,
    });

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
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => this.parseSearchResults(data))
      .catch(error => {
        throw new Error(error);
      });
  }

  checkSearchChanged() {
    if (this.state.previousSearch !== this.props.searchQuery
      && this.props.searchQuery !== undefined
      && this.props.searchQuery !== '')
    {
      this.performSearch(this.props.searchQuery);
    }
  }

  parseSearchResults(data: SearchFetchResults) {
    this.setState({
      isSearching: false,
      foundResults: data.docs,
      totalResults: data.numFound,
    });
  }

  selectBlockToRender(): ReactNode {
    if (this.state.isSearching) {
      return <SearchResultsLoader />;
    }
    if (this.props.searchQuery === undefined) {
      return <NoSearchPerformedYet />;
    }
    return (!this.state.foundResults.length)
      ? <NoResultsFound searchQuery={this.props.searchQuery} />
      : (
        <FoundResults
          searchQuery={this.props.searchQuery}
          foundResults={this.state.foundResults}
          totalResults={this.state.totalResults}
        />
      );
  }

  render () {
    return <section className="search-results--wrapper">{this.selectBlockToRender()}</section>;
  }
};
