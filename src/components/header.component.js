import React, {Fragment} from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import HeaderItemListComponent from "./header-item-list.component";

class HeaderComponent extends React.PureComponent {
	componentDidMount() {
		let sidenav = document.querySelector('#sideMenu');
		M.Sidenav.init(sidenav, {});
	}

	render() {
		return (
			<Fragment>
				<nav>
					<div className="nav-wrapper blue-grey darken-3">
						<a href="#"
						   className="brand-logo right">
							My To Do List
						</a>

						<a href="#"
						   data-target="sideMenu"
						   className="sidenav-trigger">
							<i className="material-icons">menu</i>
						</a>

						<ul className="left hide-on-med-and-down">
							<HeaderItemListComponent/>
						</ul>
					</div>
				</nav>

				<ul className="sidenav blue-grey darken-3"
					id="sideMenu">
					<HeaderItemListComponent/>
				</ul>
			</Fragment>
		);
	}
}

export default HeaderComponent;
