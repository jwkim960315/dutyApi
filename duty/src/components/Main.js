import React from 'react';


class Main extends React.Component {


    render() {
        return (
            <div>
                <a href="/auth/google">Login With Google</a>
                <a href="/auth/naver">Login With Naver</a>
            </div>

        );
    }
}

export default Main;