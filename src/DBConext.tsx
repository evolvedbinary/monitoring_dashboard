import {createContext} from 'react';

export const DBContext = createContext({
    pause:false,
    trace:false,
});