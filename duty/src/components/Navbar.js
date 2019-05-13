import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = {
    appBar: {
        marginBottom: 100
    },
    root: {
        display: "flex",
        justifyContent: "space-between"
    },
    navbarLeft: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navbarRight: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    link: {
        marginLeft: 10,
        marginRight: 10,
    },
    logo: {
        marginRight: 10
    },
};

class Navbar extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.appBar}>
                <AppBar position="absolute">
                    <Toolbar className={classes.root} variant="regular">
                        <div className={classes.navbarLeft}>
                            <Button to="/home" className={classes.logo} color="inherit" component={RouterLink}>
                                <Typography variant="h5" color="inherit">
                                    인사과당직표
                                </Typography>
                            </Button>
                            <Button to="/home" className={classes.link} color="inherit" component={RouterLink}>
                                <Typography variant="h6" color="inherit">
                                    당직표
                                </Typography>
                            </Button>
                            <Button to="/createUser" className={classes.link} color="inherit" component={RouterLink}>
                                <Typography variant="h6" color="inherit">
                                    프로필
                                </Typography>
                            </Button>
                            <Button to="/trade" className={classes.link} color="inherit" component={RouterLink}>
                                <Typography variant="h6" color="inherit">
                                    당직 바꾸기
                                </Typography>
                            </Button>
                        </div>
                        <div className={classes.navbarRight}>
                            <Button to="/logout" color="inherit" component={RouterLink}>
                                <Typography variant="h6" color="inherit">
                                    로그아웃
                                </Typography>
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Navbar);