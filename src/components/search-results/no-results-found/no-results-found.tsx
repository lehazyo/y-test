import React, { FC } from 'react';
import './no-results-found.scss';

export interface NoResultsFoundProps {
  searchQuery: string;
}

export const NoResultsFound: FC<NoResultsFoundProps> = ({
  searchQuery
}) => (
  <div className="no-results-found--wrapper">
    Результатов по запросу «{searchQuery}» не найдено
  </div>
);
