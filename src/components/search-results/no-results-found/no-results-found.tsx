import React, { FC } from 'react';
import './no-results-found.scss';

export interface NoResultsFoundProps {
  previousSearch: string;
}

export const NoResultsFound: FC<NoResultsFoundProps> = ({
  previousSearch
}) => (
  <div className="no-results-found--wrapper">
    Результатов по запросу «{previousSearch}» не найдено
  </div>
);
