import styled from 'styled-components';

// styled-components instead of using css

export const WrapperList = styled.li`
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 800;
	font-size: 18px;
	color: #2e8e53;
	height: 50px;
	margin: 10px;
	border-radius: 15px;
	background: rgb(238, 174, 202);
	background: radial-gradient(circle, rgb(219 174 238) 0%, rgb(64 106 154) 100%);
	a:hover {
		text-decoration: none !important;
		cursor: pointer;
	}
`;

export const ScrollContent = styled.div`
	display: block;
	width: 500px;
	height: 300px;
	margin: 50px 0 10px 10px;
	overflow-y: scroll;
`;
