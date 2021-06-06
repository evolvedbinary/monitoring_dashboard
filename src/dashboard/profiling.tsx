import React, { useEffect, useRef, useState } from 'react';
import FlameChart from './components/flame';
import ToggleSwitch from './components/toggleSwitch/ToggleSwitch';

const colors = {
    gridLines: "#4b4b4b",
    fontColor: "#e9e9e9",
};

interface ProfilingProps {
    gridArea: string;
}

const queries = [{
    source: "/db/apps/monex/modules/app.xql",
    index: "range",
    optimization: "no-index",
    time: "044s",
    calls: "5445"
},
{
    source: "/db/apps/monex/modules/app.xql",
    index: "range",
    optimization: "no-index",
    time: "044s",
    calls: "5445"
},
{
    source: "/db/apps/monex/modules/app.xql",
    index: "",
    optimization: "",
    time: "044s",
    calls: "5445"
},
{
    source: " ↳ /db/apps/monex/modules/app.xql",
    index: "range",
    optimization: "no-index",
    time: "044s",
    calls: "5445"
},
{
    source: " ↳ /db/apps/monex/modules/app.xql",
    index: "range",
    optimization: "no-index",
    time: "044s",
    calls: "5445"
}].map((q, idx) => {
    return (
        <React.Fragment key={idx}>
            <span className={idx % 2 == 0 ? "even" : "odd"}>{q.source}</span>
            <span className={idx % 2 == 0 ? "even" : "odd"}>{q.index}</span>
            <span className={idx % 2 == 0 ? "even" : "odd"}>{q.optimization}</span>
            <span className={idx % 2 == 0 ? "even" : "odd"}>{q.time}</span>
            <span className={idx % 2 == 0 ? "even" : "odd"}>{q.calls}</span>
        </React.Fragment>
    )
})

const data = JSON.parse(`[{"parent":null,"start":518.1653992560728,"end":1583.6450889834664,"duration":1065.4796897273936,"name":"eEGGrbn","type":"fpElyA","children":[{"parent":null,"start":534.7049223804113,"end":893.484536037232,"duration":358.77961365682074,"name":"PpkFI","type":"fpElyA","children":[{"parent":null,"start":535.027540054924,"end":548.7322042024364,"duration":13.704664147512403,"name":"LuMgvsw","type":"fpElyA","children":[]},{"parent":null,"start":549.6350275237106,"end":714.9362224235778,"duration":165.30119489986714,"name":"RTVowK","type":"fpElyA","children":[]},{"parent":null,"start":722.6950022515291,"end":890.8180622804641,"duration":168.12306002893501,"name":"EfVNgLYF","type":"fpElyA","children":[]}]},{"parent":null,"start":928.2121664915971,"end":1576.867270136883,"duration":648.6551036452859,"name":"hIgTVoEjwvWy","type":"fpElyA","children":[{"parent":null,"start":929.2822750862681,"end":1023.9488999259804,"duration":94.66662483971231,"name":"DSsDKgJjv","type":"fpElyA","children":[]},{"parent":null,"start":1025.0837491583516,"end":1351.482312338754,"duration":326.39856318040233,"name":"kNqycYUqpouX","type":"fpElyA","children":[]},{"parent":null,"start":1356.3003905901542,"end":1438.586457025024,"duration":82.28606643486978,"name":"oVsJXGJLotxJ","type":"fpElyA","children":[]},{"parent":null,"start":1444.1046114762319,"end":1573.2469036520483,"duration":129.14229217581646,"name":"KlwCGtZBbgfpV","type":"fpElyA","children":[]}]}]},{"parent":null,"start":1643.783394685843,"end":4993.625883618969,"duration":3349.8424889331263,"name":"XRlA","type":"fpElyA","children":[{"parent":null,"start":1644.4464637267417,"end":1668.25335727758,"duration":23.806893550838367,"name":"doLqb","type":"fpElyA","children":[{"parent":null,"start":1644.4518469863206,"end":1650.196356343081,"duration":5.744509356760545,"name":"dJuESTl","type":"fpElyA","children":[]},{"parent":null,"start":1650.624849829835,"end":1655.7694175665367,"duration":5.144567736701674,"name":"ukmvItkeXLEIdz","type":"fpElyA","children":[]},{"parent":null,"start":1656.655594118916,"end":1666.7566776528884,"duration":10.101083533972314,"name":"BsyPiIZWxvN","type":"fpElyA","children":[]},{"parent":null,"start":1666.9465763712944,"end":1668.17291915844,"duration":1.2263427871455406,"name":"EdTVRqdl","type":"fpElyA","children":[]}]},{"parent":null,"start":1672.841344390252,"end":4599.6276934285015,"duration":2926.7863490382497,"name":"eGfHgd","type":"fpElyA","children":[{"parent":null,"start":1679.9441102024766,"end":4567.553329592681,"duration":2887.609219390204,"name":"uwIxsqCebYUlx","type":"fpElyA","children":[]}]},{"parent":null,"start":4642.433658729368,"end":4955.189375190623,"duration":312.75571646125445,"name":"bLZbjzVq","type":"fpElyA","children":[{"parent":null,"start":4650.363051396712,"end":4943.091327861185,"duration":292.7282764644733,"name":"QeEsa","type":"fpElyA","children":[]}]}]}]`);


const Profiling: React.FC<ProfilingProps> = (props) => {
    const flameRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const [tracing, setTracing] = useState(false);

    useEffect(() => {
        if (!flameRef.current || !chartRef.current) return;
        const ctx = flameRef.current
        const flameChart = new FlameChart({
            canvas: ctx,
            data: data,
            colors: {
                'task': '#FFFFFF',
                'sub-task': '#fff',
                time: "#e9e9e9",
                background: "#252526",
                gridlines: colors.gridLines,
                text: "#1e1e1e"
            },
            settings: {
                performance: true
            },
        });
        flameChart.resize(chartRef.current.offsetWidth, 150);
        flameChart.init();
        flameChart.on("select",(node) => {
            console.log(node);
        });

        () => {
            flameChart.destroy();
        }
    }, []);


    const style: React.CSSProperties = {
        gridArea: props.gridArea,
    }
    return (
        <div style={style} className="profiling">
            <div className="header">
                <h3>Profiling</h3>
                <div className="toggle">
                    <p>Trace: </p>
                    {/* TODO (YB): implement a cleaner toggle switch */}
                    <ToggleSwitch
                        id="newsletter"
                        checked={tracing}
                        onChange={() => setTracing(!tracing)}
                    />
                </div>
            </div>
            <div ref={chartRef} className="chart">
                <canvas ref={flameRef} width="500" height="150"></canvas>
            </div>
            <div className="queries">
                {/* header */}
                <span>Source</span>
                <span>Index</span>
                <span>Optimization</span>
                <span>Time</span>
                <span>Calls</span>
                {/* header ends */}
                {
                    queries
                }
            </div>
        </div>
    )
}


export default Profiling