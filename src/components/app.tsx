import React from 'react';
import './style.scss';

const style: React.CSSProperties = {
    padding: "2rem",
    margin: "2rem",
    border: "5px solid #ccc",
    borderRadius: "10px",
    color: "#ccc",
}

const App = () => {
    return (
        <div style={style}>
        </div>
    )
}

export default App
