import React, { FC } from 'react';
import { BookPreview } from '../../book-preview/book-preview';
import { SearchFetchBook } from '../../../types/types';
import { nanoid } from 'nanoid';
import './found-results.scss';
import { declinationByNumber } from '../../../utils/declination-by-number';

export interface FoundResultsProps {
  searchQuery: string;
  foundResults: SearchFetchBook[];
  totalResults: number;
}

export const FoundResults: FC<FoundResultsProps> = ({ searchQuery, foundResults, totalResults }) => {
  const headerText =
    declinationByNumber(totalResults, ['Найден', 'Найдено', 'Найдено'])
    + ' ' + totalResults + ' '
    + declinationByNumber(totalResults, ['результат', 'результата', 'результатов'])
    + ' по запросу «' + searchQuery + '»';

  return (
    <section className="found-results--wrapper">
      <header className="found-results--header">{headerText}</header>
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
}