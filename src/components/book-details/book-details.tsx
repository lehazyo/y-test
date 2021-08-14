import React, { FC } from 'react';
import './book-details.scss';

export interface BookDetailsProps {
  title: string;
  author_name: string[];
  cover_i?: number;
  publish_date?: string[];
  publisher?: string[];
  isbn?: string[];
}

export const BookDetails: FC<BookDetailsProps> = ({ title, author_name, cover_i }) => {
  return (
    <section className="book-details--wrapper">
      this is modal
    </section>
  );
};
