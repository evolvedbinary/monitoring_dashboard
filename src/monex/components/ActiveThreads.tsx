import * as React from 'react'
import List from './List'

const ActiveThreads = () => {
    return (
        <div className="ActiveThreads">
            <List title="ActiveThreads" headerList={["Thread"]} list={[]} icon="fa-cloud" />
        </div>
    )
}

export default ActiveThreads
