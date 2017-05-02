import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class FriendComponent extends React.Component {

  render() {
    const link = "/vk/people/" + this.props.id + '/';
    let info = null;
    if (this.props.islist) {
      info = <div className="button_field">
        <Link to={ link }><button >Посмотреть информацию</button></Link>
    </div>
    }
    return (
      <div className="b-post">
        <Link to={ link }><h3>{ this.props.username }</h3></Link>
        <div className="b-post__content">
        <img className="avatar" src={ this.props.avatar }/>
        <p>{ this.props.email }</p>
        <p>{ this.props.firstname }</p>
        <p>{ this.props.lastname }</p>
        <p>{ this.props.rating }</p>
        <div className="button_field">
          <button>Убрать из друзей</button>
        </div>
    </div>
       </div>
    );
  }
}

FriendComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
  islist: React.PropTypes.bool.isRequired,
};

const mapStoreToProps = (state, props) => ({
  username: state.friend.friends[props.id].username,
  email: state.friend.friends[props.id].email,
  firstname: state.friend.friends[props.id].first_name,
  lastname: state.friend.friends[props.id].last_name,
  rating: state.friend.friends[props.id].rating,
  avatar: state.friend.friends[props.id].avatar,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(FriendComponent);
