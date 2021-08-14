import React, { FC } from 'react';
import './authors-block.scss';

export interface AuthorsBlockProps {
  authors?: string[];
  details?: boolean;
}

export const AuthorsBlock: FC<AuthorsBlockProps> = ({ authors, details }) => {
  if (authors === undefined || !authors.length) {
    return null;
  }

  let labelBlock = '';
  if (details) {
    labelBlock = (authors.length > 1)
      ? 'Авторы: '
      : 'Автор: ';
  }

  const classNames = ['authors-block--wrapper'];
  if (details) {
    classNames.push('authors-block--wrapper_details');
  }

  return <div className={classNames.join(' ')}>{labelBlock}{authors.join(', ')}</div>;
}