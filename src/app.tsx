import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SearchResults } from './components/search-results/search-results';
import { TopBar } from './components/top-bar/top-bar';
import { ReduxState } from './redux/reducer';
import './app.scss';

const mapState = (state: ReduxState) => ({
  searchQuery: state.searchQuery,
});

const connector = connect(mapState);

export interface AppProps extends ConnectedProps<typeof connector> {
  searchQuery: string | undefined; // optional prop causes error here, union type is used
}

const App: FC<AppProps> = ({ searchQuery }) => (
  <div className="app--wrapper">
    <div className="main-block--wrapper">
      <TopBar />
      <SearchResults searchQuery={searchQuery} />
    </div>
  </div>
);

export default connector(App);
