import React from 'react';
import {render} from 'react-dom';
import "./index.scss";
import "./dashboard/style/index.scss"
import App from './dashboard/app';
// import App from './componants/app';

const root = document.getElementById("root") as HTMLDivElement;

render(<App/>,root);
