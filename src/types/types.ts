export type SearchFetchBook = {
  title: string,
  cover_i?: number,
  author_name: string[],
}

export type SearchFetchResults = {
  numFound: number,
  start: number,
  numFoundExact: boolean,
  docs: SearchFetchBook[],
};

export type DetailsFetchBookDoc = {
  publish_date?: string[],
  publisher?: string[],
  isbn?: string[],
}

export type DetailsFetchBook = {
  title: string,
  author_name: string[],
  cover_i?: number,
  docs: DetailsFetchBookDoc[],
}