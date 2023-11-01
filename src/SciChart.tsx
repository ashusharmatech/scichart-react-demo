import { CSSProperties, useEffect, useState } from "react";
import { ISciChartSurfaceBase, generateGuid } from "scichart";

interface IChartComponentProps {
    initChart: (rootElementId: string) => Promise<{ sciChartSurface: ISciChartSurfaceBase }>;
    className?: string;
    style?: CSSProperties;
}
export function SciChart(props: IChartComponentProps) {
    const [rootElementId] = useState(`chart-root-${generateGuid()}`);
    useEffect(() => {
        props.initChart(rootElementId);
    }, []);
    return <div id={rootElementId} className={props.className} style={props.style} />;
}

