import React, { useEffect, useState } from "react";
import PageTitle from "./../../Layout/PageTitle";
import { Card, Row, Col, Button, Divider, Tag, Drawer } from "antd";
import { getEventService } from "../../../utils/services";
import { _notification } from "./../../../utils/_helpers";
import styled from "styled-components";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { generateCertificateService } from "./../../../utils/services";
import FeedbackForm from "./Feedback";

const Heading = styled.h4`
	font-weight: bold;
	font-size: 28px;
`;

const DescriptionContainer = styled.div`
	margin-top: 0px;
`;

const DescHeading = styled.h4`
	font-size: 18px;
	font-weight: 600;
`;

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	font-size: 16px;
`;

const MyEventDetails = props => {
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(false);
	const [viewDrawer, setViewDrawer] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const res = await getEventService(props.match.params.id);
				setEvent(res.data);
			} catch (err) {
				_notification("warning", "Error", err.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const generateCerti = async () => {
		setLoading(true);
		try {
			let id = props.match.params.id;
			const res = await generateCertificateService(id);
			if (res.message === "success") {
				_notification("success", "Success", "Download success");
			} else {
				_notification("error", "Error", res.message);
			}
			setLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setLoading(false);
		}
	};

	const feedbackSubmit = () => {
		setViewDrawer(false);
	};

	return (
		<div>
			<PageTitle title="My Events" />
			{event ? (
				<Card bordered={false}>
					<Row gutter={[16, 16]}>
						<Col xl={4} lg={8} md={8} sm={24} xs={24}>
							<img src={event.image} alt="pic" width="100%" />
						</Col>
						<Col xl={10} lg={8} md={8} sm={24} xs={24}>
							<Heading>{event.title}</Heading>
							<Wrapper>
								<div
									style={{
										marginRight: "4px",
										fontSize: "24px"
									}}
								>
									<MdLocationOn />
								</div>
								<p>{event.venue}</p>
							</Wrapper>
							<Wrapper>
								<div
									style={{
										marginRight: "4px",
										fontSize: "22px",
										marginTop: "-1px"
									}}
								>
									<IoIosTime />
								</div>
								<p>{event.time}</p>
							</Wrapper>
							<Wrapper>
								<div
									style={{
										marginRight: "4px",
										fontSize: "22px",
										marginTop: "-1px"
									}}
								>
									<MdDateRange />
								</div>
								<p>
									{new Date(event.startDate).toDateString()}{" "}
									to {new Date(event.endDate).toDateString()}
								</p>
							</Wrapper>
							{/* <Tag color="blue">{eventType}</Tag> */}
						</Col>
						<Col xl={10} lg={8} md={8} sm={24} xs={24}>
							<DescriptionContainer>
								<DescHeading>Description</DescHeading>
								<p>{event.description}</p>
								<div>
									<Button
										type="dashed"
										onClick={() => setViewDrawer(true)}
									>
										Feedback
									</Button>
									<br />
									<Button
										type="primary"
										style={{ marginTop: "8px" }}
										onClick={generateCerti}
										loading={loading}
									>
										Generate Certificate
									</Button>
								</div>
							</DescriptionContainer>
						</Col>
					</Row>
				</Card>
			) : null}

			<Drawer
				title="Feedback Form"
				placement="right"
				closable={true}
				width="30%"
				destroyOnClose={true}
				onClose={() => setViewDrawer(false)}
				visible={viewDrawer}
			>
				<FeedbackForm
					eid={props.match.params.id}
					onFeedbackSubmit={feedbackSubmit}
				/>
			</Drawer>
		</div>
	);
};

export default MyEventDetails;
