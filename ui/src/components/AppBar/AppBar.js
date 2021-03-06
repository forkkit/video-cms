import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { toggleDrawerAction } from '../../actions/displayActions'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loginButton: {
    marginRight: 5,
    textTransform: 'none'
  },
  avatar: {
    display: 'flex'
  }
});

class MyAppBar extends React.Component {

  logout = () => {
    console.log('logout');
    this.props.setCurrentUser(null);
  }

  toggleDrawerAction = (event) => {
    this.props.toggleDrawerAction();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
              onClick={this.toggleDrawerAction}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex} component={Link} to={this.props.currentUser ? '/private/dashboard' : '/'}>
              Blue - Video CMS
            </Typography>
            {this.props.currentUser ? (
              <div>
                <IconButton className={classes.avatarButton} color="inherit" aria-label="Menu">
                  <Avatar alt={this.props.currentUser.name} src={this.props.currentUser.picture} className={classes.avatar} />
                </IconButton>
                <Button size="large" onClick={this.logout} color="inherit" className={classes.loginButton}>Logout</Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="large" color="inherit" className={classes.loginButton}>Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
}
}

MyAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.user.user
});
const mapDispatchToProps = dispatch => ({
  toggleDrawerAction: () => dispatch(toggleDrawerAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyAppBar));