export default {
    styles: theme => ({
        paper: {
            position: 'absolute',
                width: theme.spacing.unit * 100,
                // height: theme.spacing.unit * 90,
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[5],
                padding: theme.spacing.unit * 4,
                outline: 'none',
        }
    }),
    getModalStyle: () => {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
}