import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';

const POST_TEXT = 'There are a lot of asldjfsaldkjfasldkjflsadflasdjflsakdflks';
const OWNER = {
  avaUrl: 'wer',
  name: 'Иван Ивановчи'
};

class PostListComponent extends React.Component {
  render() {
    return (
        <div className="b-post-list">
           <Post owner={ OWNER } content={ POST_TEXT } />
        </div>
    );
  }
};

export default PostListComponent;

ReactDOM.render(
  <PostListComponent />,
  document.getElementById('root'),
);
