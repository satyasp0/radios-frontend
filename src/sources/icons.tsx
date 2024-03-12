import React from 'react';

export const PrevIcon = () => {
    return (
        <svg width="24" height="24" fill="none">
            <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M6 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
};

export const NextIcon = () => {
    return(
            <svg width="24" height="24" fill="none">
                <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M18 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
    );
}

export const StopIcon = () => {
    return(
        <svg viewBox="-8 -6 34 34" fill="currentColor" width="40px" height="40px">
            <path d="m4.801 23.999h-3.6c-.662-.001-1.199-.537-1.2-1.2v-21.6c0-.663.537-1.2 1.2-1.201h3.6c.662.001 1.199.537 1.2 1.2v21.6c0 .663-.537 1.2-1.2 1.201z"/>
            <path d="m16.8 23.999h-3.6c-.663 0-1.2-.537-1.2-1.2v-21.6-.001c0-.663.537-1.2 1.2-1.2h3.6c.663 0 1.2.537 1.2 1.2v21.6c0 .663-.537 1.2-1.2 1.2z"/>
        </svg>
    )
}

export const PlayIcon = () =>{
    return(
        <svg fill="currentColor" width="40px" height="40px" viewBox="0 0 24 24">
            <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z"/>
        </svg>
    );
}

export const LoadingIcon = () => {
    return (
        <svg
            width="40px"
            height="40px"
            viewBox="0 0 16 16"
            className="spin-it"
        >
            <g fill="#000000" fillRule="evenodd" clipRule="evenodd">
                <path
                    d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                    opacity={0.2}
                />
                <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
            </g>
        </svg>
    );
};

export const GoIcon = ({iconColor}: { iconColor: string }) => {
    return(
        <svg width="24" height="24" fill="none">
            <g fill="none" fillRule="evenodd">
                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z"/>
                <path d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657Z" fill={iconColor}/>
            </g>
        </svg>
    );
};
