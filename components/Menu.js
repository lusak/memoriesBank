import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default props => {
  return (
    <Menu style={{ marginTop: '10px' }}>
    <Link route="/">
      <a className="item">Main Page</a>
    </Link>
      
      <Menu.Menu position = "right">

    <Link route={props.link}>
      <a className="item">{props.linkname}</a>
    </Link>

      </Menu.Menu>
    </Menu>
  );
};