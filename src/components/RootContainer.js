import React, { Component, Fragment } from 'react'
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import FeedPage from './../pages/Post/FeedPage'
import DraftsPage from './../pages/Post/DraftsPage'
import DetailPage from './../pages/Post/DetailPage'
import LoginPage from './../pages/User/LoginPage'
import SignupPage from './../pages/User/SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './../pages/User/LogoutPage'
import SocialPlayer from './SocialPlayer/SocialPlayer'
import SongList from './../pages/Song/SongList'
import PlaylistList from './../pages/Playlist/PlaylistList'
import PlaylistDetail from './../pages/Playlist/PlaylistDetail'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import QueueMusic from '@material-ui/icons/QueueMusic'
import PlaylistAdd from '@material-ui/icons/PlaylistAdd'
import ExitToApp from '@material-ui/icons/ExitToApp'
import NoteAdd from '@material-ui/icons/NoteAdd'
import PersonAdd from '@material-ui/icons/PersonAdd'
import LockIcon from '@material-ui/icons/LockOutlined'
import AccountCircle from '@material-ui/icons/AccountCircle';


const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/login" />
  )
}
const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
})

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshTokenFn = this.refreshTokenFn.bind(this)

    this.state = {
      token: props.token,
      open: true,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  refreshTokenFn(data = {}) {
    const token = data.AUTH_TOKEN

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
    }

    this.setState({
      token: data.AUTH_TOKEN,
    })
  }

  bootStrapData() {
    try {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (token !== null && token !== undefined) {
        const expired = isTokenExpired(token)
        if (!expired) {
          this.setState({ token: token })
        } else {
          localStorage.removeItem(AUTH_TOKEN)
          this.setState({ token: null })
        }
      }
    } catch (e) {
      console.log('')
    }
  }

  //verify localStorage check
  componentDidMount() {
    this.bootStrapData()
  }

  render() {
    const { classes } = this.props

    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <div className={classes.root}>
            <AppBar
              position="absolute"
              className={classNames(
                classes.appBar,
                this.state.open && classes.appBarShift,
              )}
            >
              <Toolbar
                disableGutters={!this.state.open}
                className={classes.toolbar}
              >
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden,
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  noWrap
                  className={classes.title}
                >
                  Muzzak
                </Typography>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose,
                ),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>{this.renderMenuItem()}</List>
              <Divider />
              <List>{this.renderMenuSubItem()}</List>

              <Divider />
              <List />
            </Drawer>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              {this.renderRoute()}
              {this.renderPlayer()}
            </main>
          </div>
        </Fragment>
      </Router>
    )
  }

  renderPlayer() {
    return <SocialPlayer />
  }

  renderMenuItem() {
    return (
      <div>
        <ListItem button component={NavLink} to="/" title="Feed" exact={true}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/playlists"
          title="Playlists"
          exact={true}
        >
          <ListItemIcon>
            <PlaylistAdd />
          </ListItemIcon>
          <ListItemText primary="Playlist" />
        </ListItem>
        {this.props.data &&
          this.props.data.me &&
          this.props.data.me.email &&
          this.state.token && (
            <ListItem
              button
              component={NavLink}
              to="/songs"
              title="Songs"
              exact={true}
            >
              <ListItemIcon>
                <QueueMusic />
              </ListItemIcon>
              <ListItemText primary="Songs" />
            </ListItem>
          )}
        {this.props.data &&
          this.props.data.me &&
          this.props.data.me.email &&
          this.state.token && (
            <ListItem
              button
              component={NavLink}
              to="/drafts"
              title="Drafts"
              exact={true}
            >
              <ListItemIcon>
                <NoteAdd />
              </ListItemIcon>
              <ListItemText primary="Blog Drafts" />
            </ListItem>
          )}
      </div>
    )
  }

  renderMenuSubItem() {
    return (
      <div>
        {this.state.token ? (
          <ListItem
            button
            onClick={() => {
              this.refreshTokenFn &&
                this.refreshTokenFn({
                  [AUTH_TOKEN]: null,
                })
              window.location.href = '/'
            }}
            title="Logout"
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem
            button
            component={NavLink}
            to="/login"
            title="Login"
            exact={true}
          >
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
        {!this.state.token && (
          <ListItem
            button
            component={NavLink}
            to="/signup"
            title="Signup"
            exact={true}
          >
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText primary="Signup" />
          </ListItem>
        )}
      </div>
    )
  }

  renderRoute() {
    return (
      <div className="fl w-100 pl4 pr4">
        <Switch>
          <Route exact path="/" component={FeedPage} />
          <ProtectedRoute
            token={this.state.token}
            path="/drafts"
            component={DraftsPage}
          />
          <Route path="/post/:id" component={DetailPage} />
          <Route
            token={this.state.token}
            path="/login"
            render={props => <LoginPage refreshTokenFn={this.refreshTokenFn} />}
          />
          <Route
            token={this.state.token}
            path="/signup"
            render={props => (
              <SignupPage refreshTokenFn={this.refreshTokenFn} />
            )}
          />
          <Route
            token={this.state.token}
            path="/songs"
            render={props => <SongList refreshTokenFn={this.refreshTokenFn} />}
          />
          <Route
            token={this.state.token}
            path="/playlists"
            render={props => (
              <PlaylistList refreshTokenFn={this.refreshTokenFn} />
            )}
          />
          <Route
            token={this.state.token}
            path="/playlist/:id"
            render={props => (
              <PlaylistDetail
                user={this.props.data.me}
                {...props}
                refreshTokenFn={this.refreshTokenFn}
              />
            )}
          />
          <Route path="/logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

RootContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default graphql(ME_QUERY, {
  options: {
    errorPolicy: 'all',
  },
})(withStyles(styles)(RootContainer))
