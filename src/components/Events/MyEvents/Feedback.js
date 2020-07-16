import React, { useState } from "react";
import { Form, Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { _notification } from "./../../../utils/_helpers";
import { submitFeedbackService } from "../../../utils/services";

const Feedback = props => {
	const [isLoading, setIsLoading] = useState(false);
	const { getFieldDecorator } = props.form;

	const handleSubmit = e => {
		e.preventDefault();
		setIsLoading(true);

		props.form.validateFields(async (err, values) => {
			if (!err) {
				try {
					let data = { eid: props.eid, feedback: values.feedback };
					const res = await submitFeedbackService(data);
					if (res.message === "success") {
						_notification("success", "Success", "Submitted");
						props.onFeedbackSubmit();
					} else {
						_notification("error", "Error", res.message);
					}
					setIsLoading(false);
				} catch (err) {
					_notification("error", "Error", err.message);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit} layout="vertical">
			<Form.Item label="Feedback" required>
				{getFieldDecorator("feedback", {
					rules: [
						{
							required: true,
							message: "Please enter feedback!"
						}
					]
				})(
					<TextArea
						type="text"
						rows={5}
						placeholder="Enter feedback"
					/>
				)}
			</Form.Item>

			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
					loading={isLoading}
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};

const FeedbackForm = Form.create({ name: "feedback_form" })(Feedback);

export default FeedbackForm;
