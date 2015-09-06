import  React from 'react';
import  { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <nav className="navbar navbar-light bg-faded">
        <Link to='/' className='navbar-brand'>Reddit React</Link>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item">
            <Link to='/about' className='navbar-brand'>About</Link>
          </li>
        </ul>
        </nav>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

