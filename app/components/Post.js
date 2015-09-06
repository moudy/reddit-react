import  React, { PropTypes } from 'react';

export default class Post extends React.Component {
  render() {
    const { title, permalink } = this.props.post;
    const href = `https://reddit.com${permalink}`;
    return (
      <div className="list-group-item">
      <p>
        {title}
      </p>
        <a target='_blank' href={href}>
          Link
        </a>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};
