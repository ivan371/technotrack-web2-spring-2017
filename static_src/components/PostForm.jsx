import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button';

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
    this.props.onCreate({ ...this.state });
  }

  render() {
    return (
          <div className="b-create-form">
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
                    name="content"
                    />
                </FormGroup>
                <div className="well" style={ wellStyles }>
                  <Button onClick={ this.onCreate } bsStyle="primary" bsSize="large" block>Создать</Button>
              </div>
            </form>
          </div>
    );
  }
}

PostFormComponent.propTypes = {
  onCreate: React.PropTypes.func.isRequired,
}

export default PostFormComponent;
