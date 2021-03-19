import * as React from 'react';
import {render} from 'react-dom';

import Monex from "./monex/monex";

const root = document.getElementById("root") as HTMLDivElement;

render(<Monex/>,root);
