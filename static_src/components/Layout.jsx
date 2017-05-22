import React from 'react';
import { Link } from 'react-router';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

class LayoutComponent extends React.Component {
  render() {
    return (
      <div>
             <div className="Layout">
                 <Link to="/vk/self/">
               <button className="button">Моя страница</button></Link>
               <Link to="/vk/news/">
               <button className="button">Новости</button></Link>
              <Link to="/vk/friends/">
               <button className="button">Друзья</button></Link>
              <Link to="/vk/chats/">
               <button className="button">Чаты</button></Link>
              <Link to="/vk/people/">
               <button className="button">Люди</button>
              </Link>
                 <Link to="/vk/groups/">
                    <button className="button">
                        Группы
                    </button>
                 </Link>
                 <div className="msg_list"></div>
             </div>
         <div> { this.props.children }</div>
      </div>
    );
  }
}

LayoutComponent.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
}

export default LayoutComponent;
