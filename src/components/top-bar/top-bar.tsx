import React, { FC } from 'react';
import { SearchBlock } from '../search-block/search-block';
import './top-bar.scss';

export interface TopBarProps {
  performSearch: (query: string) => void;
}

export const TopBar: FC<TopBarProps> = ({ performSearch }) => {
  return (
    <header className="top-bar--wrapper">
      <div className="top-bar--title-wrapper">
        <h1 className="top-bar--title">Литературбо</h1>
      </div>
      <SearchBlock performSearch={performSearch} />
    </header>
  );
};