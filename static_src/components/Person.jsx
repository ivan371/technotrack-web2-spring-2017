import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PersonComponent extends React.Component {

  render() {

    return (
      <div className="b-post">
        <h3>{ this.props.username }</h3>
        <div className="b-post__content">
        <p>{ this.props.email }</p>
        <p>{ this.props.firstname }</p>
        <p>{ this.props.lastname }</p>
        <p>{ this.props.rating }</p>
        <div className="button_field">
          <button >Посмотреть информацию</button>
      </div>
    </div>
       </div>
    );
  }
}

PersonComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  username: state.users.users[props.id].username,
  email: state.users.users[props.id].email,
  firstname: state.users.users[props.id].first_name,
  lastname: state.users.users[props.id].last_name,
  rating: state.users.users[props.id].rating,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PersonComponent);
