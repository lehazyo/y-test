import React from 'react';
import { ReactComponent as IcOpenBook } from '../../../../icons/open-book.svg';
import './book-cover-empty.scss';

export const BookCoverEmpty = () => (
  <figure className="book-cover book-cover-empty--wrapper">
    <IcOpenBook className="book-cover-empty--icon" />
  </figure>
)