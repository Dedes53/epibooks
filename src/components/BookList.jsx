// BookList deve gestire i libri selezionati. Riuscire a capire quale sia selezionato e passare l'asin del libro selezionato a CommentArea, in modo che quest'ultimo possa fare la fetch dei commenti relativi a quel libro ed in caso di un libro selezionato alla seleziona di un altro libro, aggiornare i commenti mostrati da CommentArea e deselezionare il libro precedente (quindi togliere il bordo rosso)

import { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import SingleBook from './SingleBook'
import CommentArea from './CommentArea'

let newAsin = null

class BookList extends Component {
  state = {
    searchQuery: '',
    bookAsin: null,
  }

  setAsin = (asin) => {
    this.setState({ bookAsin: asin })
    console.log("asin da booklist: " + this.state.bookAsin)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.bookAsin !== this.state.bookAsin) {
      console.log("asin aggiornato: " + this.state.bookAsin)
      newAsin = this.state.bookAsin
    }
  }

  render() {
    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-2 mt-3">
          <Col xs={12} md={6} className="row">
            {this.props.books
              .filter((b) =>
                b.title.toLowerCase().includes(this.state.searchQuery)
              )
              .map((b) => (
                <Col xs={12} md={6} key={b.asin}>
                  <SingleBook
                    setAsin={this.setAsin}

                    book={b} />
                </Col>
              ))}
          </Col>
          <Col xs={12} md={6}>
            <CommentArea selAsin={newAsin} />
          </Col>
        </Row >
      </>
    )
  }
}

export default BookList
