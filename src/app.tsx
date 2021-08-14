import React from 'react';
import { SearchResults } from './components/search-results/search-results';
import { TopBar } from './components/top-bar/top-bar';
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
          <TopBar performSearch={performSearch} />
          <SearchResults searchQuery={this.state.searchQuery} />
        </div>
      </div>
    );
  }
};
