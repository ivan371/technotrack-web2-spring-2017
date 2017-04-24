import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NewComponent extends React.Component {

  render() {
    return (
      <div className="b-post">
        <h3>{ this.props.objtype }</h3>
       </div>
    );
  }
}

NewComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  objtype: state.news.news[props.id].objtype,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(NewComponent);
