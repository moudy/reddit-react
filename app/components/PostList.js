import  React, { PropTypes } from 'react';
import  Post from './Post';

export default class PostList extends React.Component {

  render() {
    const list = this.props.items.map((item) => {
      return (<Post key={item.id} post={item} />);
    });

    return (
      <div className="list-group">
        {list}
      </div>
    );
  }

}

PostList.propTypes = {
  items: PropTypes.array.isRequired
};

