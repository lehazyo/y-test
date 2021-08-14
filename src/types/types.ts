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