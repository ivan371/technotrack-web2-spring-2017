import React from 'react';
import GroupList from './GroupList';
import PostList from './PostList';
import GroupCreate from './GroupCreate';
import MessageList from './MessageList';
import PostForm from './PostForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatuserOpen, chatuseradd } from './../actions/chats';
import Modal from './Modal';

class GroupsComponent extends React.Component {

  render() {
    let groupContent = null;
    let model = null;
    let users = null;
    const action = "GroupUsers";
    if (this.props.modelopen) {
      model = <Modal action={ action }/>;
    }
    let page = null;
    if(this.props.params.id != null && this.props.params.page == 'page') {
      page = this.props.params.id;
    }
    if(this.props.params.id != null && this.props.params.page == null) {
        groupContent = (<div>
          <PostForm link={'/api/postgroup/?group=' + this.props.params.id}/>
            <PostList link={'/api/postgroup/?group=' + this.props.params.id + '&&'}/>
        </div>);
      users = <div className="button_field">
        <button>Пользователи</button>
      </div>;
    }
    else {
     groupContent = null;
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Группы</h1></div>
        <div className="b-post"><GroupList page={page}/></div>
            <GroupCreate/>
          </div>
        <div className="box">
          <div className="b-post">
            <h1>Группа</h1>
            {/*{ users }*/}
          </div>
          { groupContent }
        </div>
        {/*{ model }*/}
      </div>
    );
  }
}


const mapStoreToProps = state => ({
  // chatopen: state.chats.chatopen,
  // modelopen: state.chats.modalopen,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(GroupsComponent);
