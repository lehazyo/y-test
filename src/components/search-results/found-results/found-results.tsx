import React, { FC } from 'react';
import { BookPreview } from '../../book-preview/book-preview';
import { SearchFetchBook } from '../../../types/types';
import { nanoid } from 'nanoid'

export interface FoundResultsProps {
  foundResults: SearchFetchBook[];
}

export const FoundResults: FC<FoundResultsProps> = ({ foundResults }) => (
  <div className="found-results--wrapper">
    {foundResults.map((result: SearchFetchBook) => (
      <BookPreview
        key={nanoid()}
        title={result.title}
        author_name={result.author_name}
        cover_i={result.cover_i}
      />
    ))}
  </div>
);