import React, { useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
	const { onFetchOrders } = props;

	useEffect(() => {
		onFetchOrders(props.token, props.userId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onFetchOrders]);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map((order) => (
			<Order
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}
			/>
		));
	}
	return <div>{orders}</div>;
};

const mapStateToProps = (state) => ({
	orders: state.order.orders,
	loading: state.order.loading,
	token: state.auth.token,
	userId: state.auth.userId,
});

const mapDispatchToProps = {
	onFetchOrders: actions.fetchOrders,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
