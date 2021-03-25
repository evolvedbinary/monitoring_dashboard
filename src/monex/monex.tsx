import * as React  from 'react';
import {useState} from 'react';
import Grid from './components/grid';
import "./style.scss";
import "./widget.scss";

const Widget = () => {
    const [widgetOpen, setWidgetOpen] = useState(true);
    return(
        <div className="widget">
            <div className="widget--header">
                <h3 className="widget--header__text">text</h3>
                <button className="widget--btn" onClick={() => setWidgetOpen(!widgetOpen)}><i className={`fa fa-${widgetOpen? "minus" : "plus"}`} aria-hidden="true"></i></button>
            </div>
            {widgetOpen ? 
            <div className="widget--body">
            
            </div>
            : null}
            
        </div>
    );
};


const Monex = () => {
    return (
        <>
            <Grid/>
        </>
    );
}

export default Monex
