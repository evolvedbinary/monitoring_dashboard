import * as React from 'react'

const GeneralInfo = () => {
    return (
        <div className="general-info">
            <div className="general-info_item">
                <div className="general-info_item--icon">
                    <i className="fa fa-server fa-2x" aria-hidden="true"></i>
                </div>
                <div className="general-info_item--detail">
                <div className="general-info_item--title">
                    ACTIVE DB PROCESSES
                </div>
                <div className="general-info_item--value">
                    0 of 6
                    </div>
            </div>
            </div>
            <div className="general-info_item">
                <div className="general-info_item--icon">
                    <i className="fa fa-clock-o fa-2x" aria-hidden="true"></i>
                </div>
                <div className="general-info_item--detail">
                <div className="general-info_item--title">
                    UPTIME
                </div>
                <div className="general-info_item--value">
                    02h 29m
                    </div>
            </div>
            </div>
            <div className="general-info_item">
                <div className="general-info_item--icon">
                    <i className="fa fa-database fa-2x" aria-hidden="true"></i>
                </div>
                <div className="general-info_item--detail">
                    <div className="general-info_item--title">
                        RUNNING QUERIES
                    </div>
                    <div className="general-info_item--value">
                    0
                    </div>
            </div>
            </div>
            <div className="general-info_item">
                <div className="general-info_item--icon">
                    <i className="fa fa-cogs fa-2x" aria-hidden="true"></i>
                </div>
                <div className="general-info_item--detail">
                <div className="general-info_item--title">
                    WAITING THREADS
                </div>
                <div className="general-info_item--value">
                    0
                    </div>
            </div>
            </div>
        </div>
    )
}

export default GeneralInfo
