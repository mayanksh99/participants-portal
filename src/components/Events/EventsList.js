import React, { useEffect, useState } from "react";
import PageTitle from "../Layout/PageTitle";
import { Card, Row } from "antd";
import "./style.css";
import { getEventsService } from "../../utils/services";
import { _notification } from "../../utils/_helpers";
import Event from "./Event";
import { Link } from "react-router-dom";

export default props => {
	const [events, setEvents] = useState([]);
	const [editDrawer, setEditDrawer] = useState(false);
	const [eventId, setEventId] = useState(null);
	const [refresh, toggleRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { data } = await getEventsService();
				setEvents(data.upcomingEvents);
				setIsLoading(false);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
	}, [refresh]);

	return (
		<>
			<PageTitle title="Events" />

			<div className="events-wrapper">
				<Row gutter={[16, 16]}>
					{events
						? events.map(event => <Event event={event} />)
						: "Loading"}
				</Row>
			</div>
		</>
	);
};
