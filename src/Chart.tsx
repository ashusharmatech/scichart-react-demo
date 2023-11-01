import { FastLineRenderableSeries, NumericAxis, SciChartSurface, XyDataSeries } from 'scichart';
import { SciChart } from './SciChart';



const createChart = async (divElementId: string) => {
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(divElementId);

    // Create an X,Y Axis and add to the chart
    const xAxis = new NumericAxis(wasmContext);
    const yAxis = new NumericAxis(wasmContext);

    sciChartSurface.xAxes.add(xAxis);
    sciChartSurface.yAxes.add(yAxis);


    const xValues = [];
    const yValues = [];
    for (let i = 0; i < 100; i++) {
        xValues.push(i);
        yValues.push(0.2 * Math.sin(i * 0.1) - Math.cos(i * 0.01));
    }

    const xyDataSeries = new XyDataSeries(wasmContext, {
        xValues,
        yValues,
    });

    const lineSeries = new FastLineRenderableSeries(wasmContext, {
        stroke: "#FF6600",
        strokeThickness: 5,
        dataSeries: xyDataSeries
    });
    sciChartSurface.renderableSeries.add(lineSeries);


    return { sciChartSurface };
};


function Chart() {
    return (
        <>
            <div>Chart</div>
            <SciChart initChart={createChart} style={{ width: 800, height: 600 }} />
        </>
    )
}

export default Chart