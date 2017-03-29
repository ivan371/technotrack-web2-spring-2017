import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

class LayoutComponent extends React.Component {
  render() {
    return (
      <div>
             <div className="Layout">
               <Button
                 onClick={ () => this.props.onSelect("self_room") }
                 bsStyle="primary" bsSize="large" block>Моя страница</Button>
               <Button
                 onClick={ () => this.props.onSelect("news") }
                 bsStyle="primary" bsSize="large" block>Новости</Button>
               <Button
                 onClick={ () => this.props.onSelect("friends") }
                 bsStyle="primary" bsSize="large" block>Друзья</Button>
               <Button
                 onClick={ () => this.props.onSelect("chats") }
                 bsStyle="primary" bsSize="large" block>Чаты</Button>
               <Button
                 onClick={ () => this.props.onSelect("peoples") }
                 bsStyle="primary" bsSize="large" block>Люди</Button>
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
