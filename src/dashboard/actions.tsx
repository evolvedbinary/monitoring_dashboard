import React from 'react';


const bruchIcon = (
    <svg className="icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 10H10V9H13V10Z" fill="currentColor" />
        <path d="M15 14H12V13H15V14Z" fill="currentColor" />
        <path d="M14 12H11V11H14V12Z" fill="currentColor" />
        <path d="M8.50151 10C8.49799 9.57811 8.38546 9.16429 8.17485 8.79871C7.96425 8.43312 7.66271 8.12819 7.29951 7.9135L11 1.5L10.135 1L6.34651 7.563C5.88156 7.45913 5.39799 7.4735 4.94002 7.60478C4.48205 7.73606 4.06431 7.98008 3.72501 8.3145C1.85301 10.12 1.99801 14.341 2.00501 14.52C2.01018 14.6491 2.06513 14.7712 2.15834 14.8607C2.25156 14.9502 2.37579 15.0001 2.50501 15H10.0005C10.1054 15 10.2077 14.967 10.2929 14.9056C10.378 14.8443 10.4417 14.7577 10.4749 14.6581C10.508 14.5586 10.5091 14.4511 10.4778 14.3509C10.4465 14.2507 10.3845 14.163 10.3005 14.1C8.53051 12.772 8.50151 10.027 8.50151 10ZM5.96501 8.4985C6.3652 8.5029 6.74828 8.66142 7.03456 8.94108C7.32083 9.22075 7.48826 9.60003 7.50201 10C7.50201 10.019 7.50301 10.104 7.51051 10.2345L4.56051 8.9225C4.75483 8.76226 4.97907 8.64226 5.22018 8.56947C5.4613 8.49668 5.71448 8.47256 5.96501 8.4985V8.4985ZM7.72501 14C7.32535 13.5931 7.0706 13.066 7.00001 12.5H6.00001C6.03582 13.0321 6.20204 13.5473 6.48401 14H5.37251C5.16688 13.3511 5.04178 12.6794 5.00001 12H4.00001C4.03225 12.6774 4.14385 13.3486 4.33251 14H3.00001C3.01551 13.082 3.14501 11.054 3.90151 9.7235L7.66801 11.3985C7.84897 12.3382 8.23479 13.2264 8.79801 14H7.72501Z" fill="currentColor" />
    </svg>
);

const pauseIcon = (
    <svg className="icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6954 4.36047H6.6954V20.3605H10.6954V4.36047Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18.6954 4.36047H14.6954V20.3605H18.6954V4.36047Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const Button: React.FC<{ text: string, clicked: boolean, icon: JSX.Element }> = (props) => {
    return (
        <div className="button">
            {props.text}
            <div className="icon">
                {props.icon}
            </div>
        </div>
    );
}

const Actions: React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    };

    return (
        <div className="actions" style={style}>
            <Button text="Preform GC" clicked={false} icon={bruchIcon} />
            <Button text="Pause" clicked={false} icon={pauseIcon} />
        </div>
    )
}

export default Actions
