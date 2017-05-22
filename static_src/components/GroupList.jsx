                       import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import GroupButton from './GroupButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { groupFetchData, loadGroups } from './../actions/groups';
// import { loadChats, loadChatsSuccess, loadChatsError, chatFetchData } from './../actions/chats';
import Page from './Page';

class GroupListComponent extends React.Component {
  componentDidMount() {
    if(this.props.page != null) {
      this.props.fetchData('/api/groups/?offset=' + 10 * (parseInt(this.props.page) - 1));
    }
    else {
      this.props.fetchData('/api/groups');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.page != this.props.page) {
      this.props.load();
      this.props.fetchData('/api/groups/?offset=' + 10 * (parseInt(nextProps.page) - 1));
    }
  }

  render() {
      const groupList = this.props.groupList.map(
        (groupId) => {
          return <GroupButton
            key={ groupId }
            id={ groupId } />
        }
      );
      let pages = [];
      for(let i = 1; i <= this.props.count + 1; i++) {
        pages.push(<Page page={i} link={'/vk/groups/page/' + i + '/'} key={i}/>);
      }
    return (
      <div>
        {pages}
        <div className="b-post-list">
         { this.props.isLoading ? <div className="loading"></div> :  groupList }
        </div>
      </div>
    );
  }
};

GroupListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  page: PropTypes.string
};

const mapStoreToProps = state => ({
  groupList: state.groups.groupList,
  isLoading: state.groups.isLoading,
  count: state.groups.count,
});

const mapDispatchToProps = (dispatch) => {
  return {
      ...bindActionCreators({}, dispatch),
    fetchData: (url) => dispatch(groupFetchData(url)),
    load: () => dispatch(loadGroups()),
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(GroupListComponent);