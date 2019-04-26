import React from 'react';

import DayButton from './DayButton';

class DayButtonsRowContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.weekItems.map(item => <DayButton item={item} />)}
            </div>
        );
    }
}

export default DayButtonsRowContainer;