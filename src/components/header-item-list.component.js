import React, {PureComponent, Fragment} from 'react'
import {Link} from 'react-router-dom'

class HeaderItemListComponent extends PureComponent {
	render() {
		return (
			<Fragment>
				<li>
					<Link activeClassName='active'
						  to="/">
						To Do Lists
					</Link>
				</li>
				<li>
					<Link activeClassName='active'
						  to="/create-to-do-list">
						Create List
					</Link>
				</li>
				<li>
					<Link activeClassName='active'
						  to="/closed-lists">
						Closed Lists
					</Link>
				</li>
			</Fragment>
		);
	}
}

export default HeaderItemListComponent;
