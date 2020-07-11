import React, {Component} from 'react';
import RowComponent from "../components/row.component";
import FlatButtonComponent from "../components/flat-button.component";
import ButtonComponent from "../components/button.component";
import InputComponent from "../components/input.component";
import CheckboxComponent from "../components/checkbox.component";
import ContainerComponent from "../components/container.component";

class CreateTodoListRoute extends Component {
	render() {
		return (
			<RowComponent>
				<div className="col s12 m6 l4 offset-l4 offset-m3">
					<div className="card blue-grey lighten-5">
						<div className="card-content white-text">
							<span className="card-title black-text">
								Create New List
							</span>
						</div>
						<div className="card-content">
							<form action="#">
								<div className="row">
									<InputComponent
										elementId="litName"
										inputType="text"
										labelText="List Name"
										value=""
									/>
								</div>
								<div className="row">
									<InputComponent
										elementId="dueDate"
										inputType="date"
										labelText="Due date"
										value=""

									/>
								</div>
								<RowComponent>
									<div>
										<div className="input-field">
											<i className="material-icons prefix">add</i>
											<label htmlFor="icon_prefix">Task Name</label>
											<input id="icon_prefix" type="text" className="validate"/>
										</div>
									</div>
								</RowComponent>
								<ContainerComponent>
									<CheckboxComponent
										isChecked={true}
										taskName="Buy Milk"
									/>
								</ContainerComponent>
							</form>
						</div>
						<div className="card-action">
							<FlatButtonComponent
								clickMethod={() => {
								}}
								buttonText="Cancel"
							/>
							<ButtonComponent
								clickMethod={() => {
								}}
								buttonText="Save"
							/>
						</div>
					</div>
				</div>
			</RowComponent>
		)
	}
}

export default CreateTodoListRoute;
