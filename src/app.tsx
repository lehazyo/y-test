import React from 'react';
import { SearchBlock } from './components/search-block/search-block';
import { SearchResults } from './components/search-results/search-results';
import './app.scss';

interface IProps {}

interface IState {
  searchQuery?: string;
}

export class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { searchQuery: undefined };
  }

  render() {
    const performSearch = (query: string) => {
      this.setState({
        searchQuery: query,
      });
      console.log(`performing search on query: ${query}`);
    };

    return (
      <div className="app--wrapper">
        <div className="main-block--wrapper">
          <h1 className="main-block--header">Литературбо</h1>
          <SearchBlock performSearch={performSearch} />
          <SearchResults searchQuery={this.state.searchQuery} />
        </div>
      </div>
    );
  }
};
