import React from 'react';
import ReactDOM from 'react-dom';

const element = React.createElement(
  'div',
  { className: 'greeting' },
  'Hello! world!',
);

const element1 = <div className="greeting"> Hello, world! </div>;

ReactDOM.render(
  element1,
  document.getElementById('root'),
);
