import React, { FC } from 'react';
import { DetailsFetchBookDoc } from '../../types/types';
import { convertEnDateToRu } from '../../utils/convert-en-date-to-ru';
import { AuthorsBlock } from '../authors-block/authors-block';
import { BookCover } from '../book-cover/book-cover';
import './book-details.scss';

export interface BookDetailsProps {
  title: string;
  authors: string[];
  cover?: number;
  docs: DetailsFetchBookDoc[],
}

export const BookDetails: FC<BookDetailsProps> = ({
  title,
  authors,
  cover,
  docs,
}) => {
  let publishDateBlock = null;
  let publisherBlock = null;
  let isbnBlock = null;

  if (docs.length) {
    const {
      publish_date: publishDate,
      publisher,
      isbn,
    } = docs[0];

    if (publishDate !== undefined && publishDate.length) {
      publishDateBlock = <div className="book-details--publish-date">Дата издания: {convertEnDateToRu(publishDate[0])}</div>;
    }
    if (publisher !== undefined && publisher.length) {
      publisherBlock = <div className="book-details--publisher">Издатель: {publisher[0]}</div>;
    }
    if (isbn !== undefined && isbn.length) {
      isbnBlock = <div className="book-details--isbn">ISBN: {isbn[0]}</div>;
    }
  }

  return (
    <section className="book-details--wrapper">
      <BookCover title={title} cover={cover} details />
      <div className="book-details--info">
        <header className="book-details--title">{title}</header>
        <AuthorsBlock authors={authors} details />
        {publishDateBlock}
        {publisherBlock}
        {isbnBlock}
      </div>
    </section>
  );
};
