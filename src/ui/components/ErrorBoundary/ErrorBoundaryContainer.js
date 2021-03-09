import React from 'react';
import ErrorBoundaryComponent from './ErrorBoundaryComponent';

class ErrorBoundaryContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error,
			errorInfo,
		});
	}

	render() {
		if (this.state.errorInfo) {
			return <ErrorBoundaryComponent />;
		}

		return this.props.children;
	}
}

export default ErrorBoundaryContainer;
