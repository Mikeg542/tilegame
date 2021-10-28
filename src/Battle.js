import React from "react";
import { withRouter } from "react-router-dom";

const Battle = ({ history }) => {
	return (
		<div>
			<button onClick={() => history.push("/")} />
		</div>
	);
};
export default withRouter(Battle);
