import React from 'react';
import { Modal, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { toggleModal } from '../actions';
import moment from 'moment';

import UserModalCSS from '../css/UserModalCSS';

class UserModal extends React.Component {

    render() {
        const { classes, selectedUser } = this.props;

        const fullName = (selectedUser) ? `${selectedUser.name.lastName}${selectedUser.name.firstName}` : 'None';
        const company = (selectedUser) ? selectedUser.company : 'None';
        const dutyDatesStr = (selectedUser) ? selectedUser.dutyDates.map(dutyDate => moment(dutyDate).format('YYYY-MM-DD')).join(', ') : 'None';

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
                            On Duty: {fullName}
                        </Typography>
                        <Typography variant="subtitle1" id="user-modal-description">
                            Company: {company}
                        </Typography>
                        <div style={{ "display": "inline" }}>
                            <Typography variant="subtitle1" id="user-modal-description">
                                Duty Dates: {dutyDatesStr}
                            </Typography>
                        </div>

                        <UserModalWrapped />
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ modal, selectedUser }) => {
    return { modal, selectedUser };
};

const UserModalWrapped = withStyles(UserModalCSS.styles)(UserModal);

export default connect(mapStateToProps,{
    toggleModal
})(UserModalWrapped);


