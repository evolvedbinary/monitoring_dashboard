import React, { useState } from 'react';

const SortButton = () => {
    const [state, setState] = useState(0);

    const Sort = (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.68946 14.0625H18.3105C19.3555 14.0625 19.8779 15.3271 19.1406 16.0645L13.3301 21.875C12.8711 22.334 12.1289 22.334 11.6748 21.875L5.85938 16.0645C5.12207 15.3271 5.64453 14.0625 6.68946 14.0625ZM19.1406 8.93555L13.3301 3.125C12.8711 2.66602 12.1289 2.66602 11.6748 3.125L5.85938 8.93555C5.12207 9.67285 5.64453 10.9375 6.68946 10.9375H18.3105C19.3555 10.9375 19.8779 9.67285 19.1406 8.93555Z" fill="currentColor" />
        </svg>
    );

    const Top = (
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47071 0.5L14.2813 6.31055C15.0186 7.04785 14.4961 8.3125 13.4512 8.3125H1.83008C0.785159 8.3125 0.262698 7.04785 1 6.31055L6.81543 0.5C7.26953 0.0410156 8.01172 0.0410156 8.47071 0.5Z" fill="currentColor" />
        </svg>
    );

    const Bottom = (
        <svg width="25" height="25" viewBox="0 0 25 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4512 0.4375H1.83008C0.785159 0.4375 0.262698 1.70215 1 2.43945L6.81543 8.25C7.26953 8.70898 8.01172 8.70898 8.47071 8.25L14.2813 2.43945C15.0186 1.70215 14.4961 0.4375 13.4512 0.4375Z" fill="currentColor" />
        </svg>
    );


    const handleClick = () => {
        setState(state => {
            state += 1;
            return state % 3;
        })
    }

    return (
        <span className="btn flx" onClick={() => handleClick()}>
            {state === 0 ? Sort : state === 1 ? Top : Bottom}
        </span>
    );
}

function renderTableHeader() {
    return (
        <tr>
            <th>
                <span>
                    <span>
                        Source
                    </span>
                </span>
            </th>
            <th>
                <span   className="th">
                    <span>
                        Time
                    </span>
                    <SortButton />
                </span>
            </th>
            <th>
                <span>
                    <span>
                        Request Url
                    </span>
                </span>
            </th>
            <th>
                <span className="th">
                    <span>
                        Date
                    </span>
                    <SortButton />
                </span>
            </th>
        </tr>
    );
}



const History : React.FC<{ gridArea: string }> = (props) => {
    const style: React.CSSProperties = {
        gridArea: props.gridArea,
        alignSelf:"flex-start",
    }
    return (
        <div style={style}>
            <h3>Queries History</h3>
            <table>
                <thead>
                    {renderTableHeader()}
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )
}

export default History
