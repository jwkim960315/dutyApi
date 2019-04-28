import React from 'react';
import { Modal, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { toggleModal } from '../actions';

import UserModalCSS from '../css/UserModalCSS';

class UserModal extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="user-modal-title"
                    aria-describedby="user-modal-description"
                    open={this.props.modal || false}
                    onClose={this.props.toggleModal}
                >
                    <div style={UserModalCSS.getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title">
                            User Name
                        </Typography>
                        <Typography variant="subtitle1" id="user-modal-description">
                            Duty Date: ...
                        </Typography>
                        <UserModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({modal}) => {
    return {modal};
};

const UserModalWrapped = withStyles(UserModalCSS.styles)(UserModal);

export default connect(mapStateToProps,{
    toggleModal
})(UserModalWrapped);


