import React, { PropTypes } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import classes from './LoginView.scss';

class LoginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { handle: '' };
  }

  render() {
    const { login } = this.props;
    return (
      <div className={classes.loginView}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            login(this.state.handle);
          }}
        >
          <h2>Sign in</h2>
          <FormGroup>
            <Input
              onChange={(e) => this.setState({handle: e.target.value})}
              value={this.state.handle}
              required
              type="text"
              name="handle"
              id="handle"
              placeholder="Enter your topcoder handle (case sensitive)"
            />
          </FormGroup>
          <Button block color="primary">Log in</Button>
        </Form>
      </div>
    );
  }
}

LoginView.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginView;
