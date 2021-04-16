import * as React from 'react';
import List from './List';
// const data = {
// "eXist Version":	"5.3.0-SNAPSHOT",
// "eXist Build":	"20210224150748",
// "Operating System":	"Linux 5.8.0-44-generic amd64",
// "Java Version":	"1.8.0_282",
// "Default Encoding":	"UTF8",
// "Instance ID":	"exist",
// "System CPU Load":	"0.149877",
// "Process CPU Load":	"0.00245098",
// "Free Physical Memory":	"1368629248",
// "Total Physical Memory":	"8310288384",
// };
// const dataArr = Object.keys(data).map(k => [k,data[k]]);

const data = `[["eXist Version","5.3.0-SNAPSHOT"],["eXist Build","20210224150748"],["Operating System","Linux 5.8.0-44-generic amd64"],["Java Version","1.8.0_282"],["Default Encoding","UTF8"],["Instance ID","exist"],["System CPU Load","0.149877"],["Process CPU Load","0.00245098"],["Free Physical Memory","1368629248"],["Total Physical Memory","8310288384"]]`
const dataArr:string[][] = JSON.parse(data); 

const SystemInformation = () => {
    return (
        <div className="SystemInformation">
            <List list={dataArr} headerList={["Key","Value"]} icon="fa-info" title="SystemInformation"/>
        </div>
    )
}

export default SystemInformation;
