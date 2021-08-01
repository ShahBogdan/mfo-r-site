import React from 'react';
import LoadingScreen from 'react-loading-screen';

const Loading = props => {
    return (
        <LoadingScreen
            className='position-fixed text-primary'
            loading={props.loading}
            bgColor='#ecf1f9'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            // logoSrc='/logo.png'
            text='Подбираем для вас лучшее предложение'
        />
    );
};

export default Loading;
