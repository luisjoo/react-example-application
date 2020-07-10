import React, {PureComponent, Fragment} from 'react'

class HeaderItemListComponent extends PureComponent {
	render() {
		return (
			<Fragment>
				<li><a href="">All Lists</a></li>
				<li><a href="">Create List</a></li>
				<li><a href="">Friends</a></li>
			</Fragment>
		);
	}
}

export default HeaderItemListComponent;
