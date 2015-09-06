import  React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { requestDataFromRedditAsync } from '../actions';
import PostList from '../components/PostList';

class IndexContainer extends React.Component {
  componentDidMount() {
    this.props.requestDataFromRedditAsync();
  }

  render() {
    if (this.props.posts.isLoading) {
      return (
        <h5>
          Loading...
        </h5>
      );
    }
    if (this.props.posts.items) {
      return (
        <PostList items={this.props.posts.items} />
      );
    }

    return (
      <div>
        Could not load posts.
      </div>
    );
  }
}

IndexContainer.propTypes = {
  posts: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(
  mapStateToProps,
  { requestDataFromRedditAsync }
)(IndexContainer);

