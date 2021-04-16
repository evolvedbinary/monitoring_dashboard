import React from 'react';
import {render} from 'react-dom';
import App from './dashboard/app';
import "./index.scss";
import "./dashboard/style/index.scss"

const root = document.getElementById("root") as HTMLDivElement;

render(<App/>,root);
