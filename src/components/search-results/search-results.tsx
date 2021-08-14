import React, { ReactNode } from 'react';
import { NoSearchPerformedYet } from './no-search-performed-yet/no-search-performed-yet';
import { NoResultsFound } from './no-results-found/no-results-found';
import { FoundResults } from './found-results/found-results';
import { FoundResult } from './found-results/found-result';
import './search-results.scss';

export interface SearchResultsProps {
  searchQuery?: string;
}

export interface SearchResultsState {
  isSearching: boolean;
  foundResults: FoundResult[];
}

export class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  searchQuery?: string;

  constructor(props: SearchResultsProps) {
    super(props);

    this.searchQuery = props.searchQuery;

    this.state = {
      isSearching: false,
      foundResults: [],
    };
  }

  render () {
    let blockToRender: ReactNode;
    if (this.searchQuery === undefined) {
      blockToRender = <NoSearchPerformedYet />;
    } else {
      blockToRender = (!this.state.foundResults.length)
        ? <NoResultsFound searchQuery={this.searchQuery} />
        : <FoundResults foundResults={this.state.foundResults} />;
    }

    return (
      <section className="search-results--wrapper">
        {blockToRender}
      </section>
    );
  }
};
