import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const fetchURL = 'https://striveschool-api.herokuapp.com/api/comments/';
const apiKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTg5ZjQwNjI4NzNjYjAwMTUwZjAyOGUiLCJpYXQiOjE3NzA2NDg1ODIsImV4cCI6MTc3MTg1ODE4Mn0.D5dky5M1nKuPXMU_tVqd1_J9iM8i-8xcNDi_1hq-9XA'

// CommentArea si occupa di mostrare i commenti relativi al libro selezionato, e di aggiungere nuovi commenti
// Riceve in props l'asin del libro selezionato, e lo usa per fare la fetch dei commenti relativi a quel libro
class CommentArea extends Component {
  state = {
    comments: [],
    isLoading: true,
    isError: false,
  }

  componentDidMount = async () => {
    try {
      let response = await fetch(
        fetchURL +
        this.props.selAsin,
        {
          headers: {
            Authorization: 'Bearer ' + apiKEY,
          },
        }
      )
      console.log(response)
      if (response.ok) {
        let comments = await response.json()
        this.setState({ comments: comments, isLoading: false, isError: false })
      } else {
        this.setState({ isLoading: false, isError: true })
      }
    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false, isError: true })
    }
  }

  componentDidUpdate = async (prevprops) => {
    if (prevprops.selAsin !== this.props.selAsin) {
      try {
        let response = await fetch(
          fetchURL + this.props.selAsin,
          {
            headers: {
              Authorization: 'Bearer ' + apiKEY,
            },
          }
        )
        if (response.ok) {
          let comments = await response.json()
          this.setState({ comments: comments, isLoading: false, isError: false })
        } else {
          this.setState({ isLoading: false, isError: true })
        }
      } catch (error) {
        console.log(error)
        this.setState({ isLoading: false, isError: true })
      }
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }
}

export default CommentArea
