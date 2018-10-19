import React, { Component } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../../constant'

import Password from './Password'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import LinearProgress from '@material-ui/core/LinearProgress'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';

import FormControl from '@material-ui/core/FormControl'
import SnackBarCustom from '../Nav/SnackBarCustom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'


var validator = require('email-validator')


class SignupPage extends Component {
  state = {
    email: '',
    emailValidation: true,
    inputValidation2: true,
    password: '',
    name: '',
    isPasswordActiveStep: false,
    activeStep: 0,
    maxStep: 3,
  }
  onChange2(statePasword) {
    this.setState({
      password: statePasword.password,
      inputValidation2: statePasword.inputValidation2
    })
  }

  onChange1(e) {
    this.setState({ email: e.target.value })
    if (this.validateEmail(e.target.value)) {
      this.setState({ emailValidation: true })
    } else {
      this.setState({ emailValidation: false })
    }
  }
  validateEmail(email) {
    return validator.validate(email)
  }
  calculateBuffer() {
    let data = ''
    if (this.state.activeStep === 0) {
      data = this.state.name
    }
    if (this.state.activeStep === 1) {
      data = this.state.email
    }
    if (this.state.activeStep === 2) {
      data = this.state.password
    }
    let maxValue = data.length / 10 > 1 ? 1 : data.length / 10
    return (this.state.activeStep + maxValue) * 100 / this.state.maxStep
  }
  handleNext = () => {
    if (this.state.name) {
      if (this.state.activeStep === 0) {
        this.setState({
          activeStep: this.state.activeStep + 1,
        }, () => {
          this.input1.focus()
        })
      }
      if (this.state.activeStep === 1) {
        if (this.state.emailValidation) {
          this.setState({
            activeStep: this.state.activeStep + 1,
          }, () => {
            // this.input2.focus()
            this.setState({ isPasswordActiveStep: true })
          })
        }
      }
      if (this.state.activeStep === 2) {
        if (this.state.inputValidation2) {
          this.setState({
            activeStep: this.state.activeStep + 1,
          }, () => {
            this._signup()
          })
        }
      }
    }
  };

  handleKey = (data) => {
    if (data.charCode === 13) { //keyPress enter
      this.handleNext()
    }
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ThreeDRotation />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            Already have an account? <NavLink to="/login"> Login</NavLink>
            <div className='flex flex-column'>

              <LinearProgress variant='buffer'
                value={this.state.activeStep * 100 / this.state.maxStep}
                valueBuffer={this.calculateBuffer()}
              />
              <br />
              <div className='tac'>
                <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 0 ? 'focusField' : 'notFocusField')}>
                  <InputLabel htmlFor='name'>Your name</InputLabel>
                  <Input
                    id='name'
                    value={this.state.name}
                    inputRef={node => this.input0 = node}
                    onChange={e => this.setState({ name: e.target.value })}
                    type='text'
                    onKeyPress={this.handleKey}
                    endAdornment={
                      <InputAdornment position='end'>
                        {this.state.activeStep === 0 && (
                          <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                            <Icon>navigate_next</Icon>
                          </Button>
                        )}
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <br /><br />
                {this.state.activeStep >= 1 && (
                  <FormControl className={'wrapperAnimate ' + (this.state.activeStep === 1 ? 'focusField' : 'notFocusField')}>
                    <InputLabel htmlFor='email'>Your email address</InputLabel>
                    <Input
                      id='email'
                      value={this.state.email}
                      error={!this.state.emailValidation}
                      onChange={this.onChange1.bind(this)}
                      type='text'
                      inputRef={node => this.input1 = node}
                      onKeyPress={this.handleKey}
                      endAdornment={
                        <InputAdornment position='end'>
                          {this.state.activeStep === 1 && (
                            <Button onClick={this.handleNext} variant='fab' color='primary' mini>
                              <Icon>navigate_next</Icon>
                            </Button>
                          )}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
                <br /><br />
                {this.state.activeStep >= 2 && (
                  <Password
                    handleNext={this.handleNext.bind(this)}
                    activeStep={this.state.isPasswordActiveStep}
                    onChange2={this.onChange2.bind(this)} />
                )}
              </div>
            </div>
            <SnackBarCustom ref={instance => { this.child = instance }} />
          </Paper>
        </main>
      </React.Fragment >
    )
  }

  _signup = () => {
    const { email, name, password } = this.state
    const result = this.props.signupMutation({
      variables: {
        name,
        email,
        password,
      },
    }).then(result => {
      const token = result.data.signup.token
      localStorage.setItem(AUTH_TOKEN, token)

      this.props.refreshTokenFn &&
        this.props.refreshTokenFn({
          [AUTH_TOKEN]: token,
        })

      this.props.history.replace('/')
      window.location.reload()
    }).catch((e) => {
      if (e.graphQLErrors.length) {
        this.child._openSnackBar(e.graphQLErrors[0].message)
      } else {
        this.child._openSnackBar('error: No connection with server')
      }
    })
  }
}

const SIGNUP_USER_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired,
}


const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
})

export default graphql(SIGNUP_USER_MUTATION, { name: 'signupMutation' })(
  withRouter(withStyles(styles)(SignupPage)),
)
