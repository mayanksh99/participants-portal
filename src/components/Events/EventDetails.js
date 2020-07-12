import React, { useState } from "react";
import { Modal, Col, Row, Button, Tag } from "antd";
import styled from "styled-components";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { registerEventService } from "./../../utils/services";
import { _notification } from "./../../utils/_helpers";

const Heading = styled.h4`
	font-weight: bold;
	font-size: 28px;
`;

const ButtonContainer = styled.div`
	float: right;
	margin-top: 6px;
`;

const EditButton = styled(Button)`
	border: 0;
	border-radius: 2px;
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

const EventDetails = ({ visible, handleModal, event, eventType }) => {
	const [loading, setLoading] = useState(false);
	const {
		_id,
		title,
		description,
		time,
		image,
		startDate,
		endDate,
		venue
	} = event;

	const handleRegister = async () => {
		setLoading(true);
		try {
			const body = { eid: _id };
			const res = await registerEventService(body);
			if (res.message === "success") {
				_notification("success", "Success", "Registration Successful!");
			} else {
				_notification("error", "Error", res.message);
			}
			setLoading(false);
		} catch (err) {
			_notification("warning", "Error", err.message);
			setLoading(false);
		}
	};
	return (
		<div>
			<Modal
				style={{ top: 20 }}
				visible={visible}
				onCancel={() => handleModal(false)}
				footer={null}
				width={700}
			>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<img src={image} alt="pic" width="100%" />
					</Col>
					<Col span={2}></Col>
				</Row>
				<Row style={{ marginTop: "15px" }}>
					<Col xl={12} lg={12} md={12} sm={12} xs={24}>
						<Heading>{title}</Heading>
						<Tag color="blue">{eventType}</Tag>
					</Col>
					<Col xl={12} lg={12} md={12} sm={12} xs={24}>
						<ButtonContainer>
							<EditButton
								size="large"
								loading={loading}
								onClick={handleRegister}
							>
								Register here
							</EditButton>
						</ButtonContainer>
					</Col>
				</Row>
				<br />
				<Wrapper>
					<div
						style={{
							marginRight: "4px",
							fontSize: "24px"
						}}
					>
						<MdLocationOn />
					</div>
					<p>{venue}</p>
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
					<p>{time}</p>
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
						{new Date(startDate).toDateString()} to{" "}
						{new Date(endDate).toDateString()}
					</p>
				</Wrapper>
				<DescriptionContainer>
					<DescHeading>Description</DescHeading>
					<p>{description}</p>
				</DescriptionContainer>
			</Modal>
		</div>
	);
};

export default EventDetails;
