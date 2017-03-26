import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

class AppComponent extends React.Component {
  state = {
    postList: [],
    isLoading: false,
  }

  onCreate = (post) => {
    this.setState({
      postList: [post, ...this.state.postList]
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/api/posts', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
       this.setState({ postList: data.results, isLoading: false });
      }
    )
  }
  render() {
    return (
      <Grid>
        <Row className="show-grid">
           <Col xs={4} xsOffset={4}  className="list">
          <h1>Лента постов</h1>
      <PostForm onCreate={ this.onCreate }/>
      <PostList isLoading={ this.state.isLoading } postList={ this.state.postList }/>
      </Col>
      </Row>
    </Grid>
    );
  }
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root'),
);
