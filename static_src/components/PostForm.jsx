import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postCreate } from './../actions/posts';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class PostFormComponent extends React.Component {
  state = {
    title: '',
    content: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onCreate = (e) => {
    e.preventDefault();
    this.props.postCreate(this.state.title, this.state.content);
    // this.props.onCreate({ ...this.state });
  }

  render() {
    return (
          <div className="b-create-form b-post" >
          <form>
              <FieldGroup
                id="formControlsText"
                type="text"
                placeholder="Заголовок"
                value={ this.state.title }
                onChange={ this.onChange }
                name="title"
                />
                <FormGroup controlId="formControlsTextarea">
                  <FormControl
                    componentClass="textarea"
                    placeholder="Текст"
                    value={ this.state.content }
                    onChange={ this.onChange }
                    name="content"/>
                </FormGroup>
                <div className="button_field">
                  <button onClick={ this.onCreate.bind(this) }>Создать</button>
                </div>
          </form>
          </div>
    );
  }
}

// PostFormComponent.propTypes = {
//   onCreate: React.PropTypes.func.isRequired,
// }

const mapStoreToProps = props => ({
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({postCreate}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostFormComponent);
