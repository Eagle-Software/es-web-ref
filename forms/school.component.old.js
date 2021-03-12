import React from "react";
import { Form } from "react-bootstrap";

export default (props) => {
  console.log(props);
  return (
    <div className='col container row' >
      <Form.Label className='col-sm' >
        { props.school || "<school>" }
      </Form.Label>
      <Form.Text className='col-sm' >
        Years completed: { props.years || '<years>' }
      </Form.Text>
      <Form.Text className='col-sm' >
        Course of study: { props.major || '<major>' }
      </Form.Text>
      <Form.Text className='col-sm' >
        Degrees earned: { props.degrees || '<degrees>'}
      </Form.Text>
    </div>
  );
}
