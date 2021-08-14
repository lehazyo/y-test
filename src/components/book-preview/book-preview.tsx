import React, { FC } from 'react';

export interface BookPreviewProps {
  title: string;
}

export const BookPreview: FC<BookPreviewProps> = ({
  title,
}) => {
  return (
    <div className="book-preview--wrapper" />
  );
}