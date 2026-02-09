import { Component } from 'react'
import { Card } from 'react-bootstrap'

class SingleBook extends Component {
  state = {
    selected: false,
    bookAsin: null,
  }

  render() {
    return (
      <>
        <Card
          onClick={() => {
            this.setState({ selected: !this.state.selected })
            if (!this.state.selected) {
              this.props.Asin(this.props.book.asin)
              console.log("asin selezionato: " + this.props.book.asin)
            }
          }}
          style={{ border: this.state.selected ? '3px solid red' : 'none' }}
        >
          <Card.Img variant="top" src={this.props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: 'black' }}>
              {this.props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default SingleBook
