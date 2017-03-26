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

const POST_TEXT = 'There are a lot of as;ldjfsaldkjfa;sldkjf;lsadflasdjflsakdf;lks';
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

class AppComponent extends React.Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
           <Col xs={4} xsOffset={4}  className="list">
          <h1>Лента постов</h1>
          <div className="b-create-form">
            <h2>Форма добавления</h2>
            <form>
              <FieldGroup
                id="formControlsText"
                type="text"
                placeholder="Заголовок"
                />
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea" placeholder="Текст" />
                </FormGroup>
                <div className="well" style={ wellStyles }>
                  <Button bsStyle="primary" bsSize="large" block>Создать</Button>
              </div>
            </form>
          </div>
      <PostList />
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
