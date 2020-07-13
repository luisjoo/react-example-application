import M from 'materialize-css/dist/js/materialize.min';

class Toast {
	static success = (message) => {
		M.toast({
			html: message,
			classes: 'green darken-3 white-text'
		});
	};

	static error = (message) => {
		M.toast({
			html: message,
			classes: 'red darken-3 white-text'
		});
	};

	static info = (message) => {
		M.toast({
			html: message,
			classes: 'light-blue darken-3 white-text'
		});
	};
}

export default Toast
