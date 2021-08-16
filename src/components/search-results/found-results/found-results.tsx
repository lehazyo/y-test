import React, { ReactNode } from 'react';
import { BookPreview } from '../../book-preview/book-preview';
import { SearchFetchBook, DetailsFetchBook } from '../../../types/types';
import { BookDetails } from '../../book-details/book-details';
import { nanoid } from 'nanoid';
import './found-results.scss';
import { declinationByNumber } from '../../../utils/declination-by-number';
import Modal from 'react-responsive-modal';

export interface FoundResultsProps {
  previousSearch?: string;
  foundResults: SearchFetchBook[];
  totalResults: number;
}

export interface FoundResultsState {
  modalOpen: boolean;
  modalContent: ReactNode;
  isFetching: boolean;
}

export class FoundResults extends React.Component<FoundResultsProps, FoundResultsState> {
  constructor(props: FoundResultsProps) {
    super(props);

    this.state = {
      modalOpen: false,
      modalContent: null,
      isFetching: false,
    };
  }

  openModalForBook(title: string, author_name: string[], cover?: number) {
    const encodedTitle = encodeURIComponent(title);
    const encodedAuthorBlock = (author_name !== undefined)
      ? `&author=${encodeURIComponent(author_name.join(','))}`
      : '';
    const neededFields = [
      'publish_date',
      'publisher',
      'isbn',
    ];
    const requestUrl = `http://openlibrary.org/search.json?title=${encodedTitle}&fields=${neededFields.join(',')}${encodedAuthorBlock}`;

    fetch(requestUrl)
      .then(response => {
        if (!response.ok) {
          this.setState({
            isFetching: false,
          })
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => this.parseDetails(data, title, author_name, cover))
      .catch(error => {
        this.setState({
          isFetching: false,
        })
        throw new Error(error);
      });
  }

  parseDetails(
    data: DetailsFetchBook,
    title: string,
    authors: string[],
    cover?: number,
  ) {
    this.setState({
      modalOpen: true,
      modalContent: (
        <BookDetails
          title={title}
          authors={authors}
          cover={cover}
          docs={data.docs}
        />
      ),
      isFetching: false,
    });
  }

  render() {
    const headerText = `${declinationByNumber(
        this.props.totalResults,
        ['Найден', 'Найдено', 'Найдено']
      )} ${this.props.totalResults} ${declinationByNumber(
        this.props.totalResults,
        ['результат', 'результата', 'результатов']
      )} по запросу «${this.props.previousSearch}»`;

    return (
      <section className="found-results--wrapper">
        <header className="found-results--header">{headerText}</header>
        <ul className="found-results--list">
          {this.props.foundResults.map((result: SearchFetchBook) => (
            <BookPreview
              key={nanoid()}
              title={result.title}
              authors={result.author_name}
              cover={result.cover_i}
              onClick={() => {
                if (this.state.isFetching) {
                  return;
                }
                this.openModalForBook(result.title, result.author_name, result.cover_i);
              }}
            />
          ))}
        </ul>
        <Modal open={this.state.modalOpen} onClose={() => { this.setState({ modalOpen: false }) }} center>
          {this.state.modalContent}
        </Modal>
      </section>
    );
  }
}