import React, { FC } from 'react';
import { BookPreview } from '../../book-preview/book-preview';
import { FoundResult } from './found-result';

export interface FoundResultsProps {
  foundResults: FoundResult[];
}

export const FoundResults: FC<FoundResultsProps> = ({ foundResults }) => {
  return (
    <div className="found-results--wrapper">
      {foundResults.map((result: FoundResult) => (
        <BookPreview
          title={result.title}
        />
      ))}
    </div>
  );
};