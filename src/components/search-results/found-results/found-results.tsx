import React, { FC } from 'react';
import { BookPreview } from '../../book-preview/book-preview';
import { SearchFetchBook } from '../../../types/types';
import { nanoid } from 'nanoid';
import './found-results.scss';

export interface FoundResultsProps {
  searchQuery: string;
  foundResults: SearchFetchBook[];
}

export const FoundResults: FC<FoundResultsProps> = ({ searchQuery, foundResults }) => (
  <section className="found-results--wrapper">
    <header className="found-results--header">
      Результат{(foundResults.length > 1) ? 'ы' : ''} по запросу «${searchQuery}»
    </header>
    <ul className="found-results--list">
      {foundResults.map((result: SearchFetchBook) => (
        <BookPreview
          key={nanoid()}
          title={result.title}
          author_name={result.author_name}
          cover_i={result.cover_i}
        />
      ))}
    </ul>
  </section>
);