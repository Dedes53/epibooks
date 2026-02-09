import { Component } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import SingleBook from './SingleBook'
import CommentArea from './CommentArea'

class BookList extends Component {
  state = {
    searchQuery: '',
    bookAsin: null,
  }


  setAsin = (asin) => {
    this.setState({ bookAsin: asin })
    console.log("asin da booklist: " + this.statebookAsin)
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
                  <SingleBook Asin={this.setAsin} book={b} />
                </Col>
              ))}
          </Col>
          <Col xs={12} md={6}>
            <CommentArea selAsin={this.state.bookAsin} />
          </Col>
        </Row >
      </>
    )
  }
}

export default BookList
