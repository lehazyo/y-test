import React, { ReactNode } from 'react';
import { NoSearchPerformedYet } from './no-search-performed-yet/no-search-performed-yet';
import { NoResultsFound } from './no-results-found/no-results-found';
import { FoundResults } from './found-results/found-results';
import { SearchFetchBook, SearchFetchResults } from '../../types/types';
import { SearchResultsLoader } from './search-results-loader/search-results-loader';
import './search-results.scss';

export interface SearchResultsProps {
  searchQuery?: string;
}

export interface SearchResultsState {
  previousSearch?: string;
  isSearching: boolean;
  foundResults: SearchFetchBook[];
}

export class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  searchQuery?: string;

  constructor(props: SearchResultsProps) {
    super(props);

    this.state = {
      previousSearch: undefined,
      isSearching: false,
      foundResults: [],
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

    const sanitizedQuery = encodeURIComponent(rawQuery);
    fetch(`http://openlibrary.org/search.json?fields=${neededFields.join(',')}&q=${sanitizedQuery}`)
        .then(response => {
          if (!response.ok) {
            console.log('Response is not OK:', response.statusText);
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => this.parseSearchResults(data))
        .catch(error => {
          // throw new Error(error);
          console.log('Caught error:', error);
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
      : <FoundResults foundResults={this.state.foundResults} />;
  }

  render () {
    return (
      <section className="search-results--wrapper">
        {this.selectBlockToRender()}
      </section>
    );
  }
};
