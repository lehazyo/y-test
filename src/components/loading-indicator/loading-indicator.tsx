import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxState } from '../../redux/reducer';
import './loading-indicator.scss';

const mapState = (state: ReduxState) => ({
  isLoading: state.isLoading,
});

const connector = connect(mapState);

export interface LoadingIndicatorProps extends ConnectedProps<typeof connector> {
  isLoading: boolean;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({ isLoading }) => (
  <div className={`loading-indicator--wrapper${isLoading ? ' loading' : ''}`}>
    <div className="loading-indiator--icon-wrapper">
      <div className="loading-indiator--book-wrapper">
        <div className="loading-indiator--book-page left"></div>
        <div className="loading-indiator--book-page right"></div>
        <div className="loading-indiator--book-page middle"></div>
        <div className="loading-indiator--book-cover left"></div>
        <div className="loading-indiator--book-cover right"></div>
      </div>
    </div>
  </div>
);

export default connector(LoadingIndicator);
