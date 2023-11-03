During my recent venture into a charts project, I came across SciChart, and it instantly piqued my interest due to its exceptional chart quality, extremely swift real-time data processing, and capability to efficiently manage a considerable number of data points within a single chart. 

Since I was highly impressed with its potential, I researched further to get a better sense and understanding of the origin of SciChart. As I delved deeper into the subject, I learned that it was originally designed for Windows Graphics Library (WGL) but eventually expanded to support JavaScript libraries. Despite the documentation being quite comprehensive, I decided to create a succinct yet elaborative demonstration of how one can easily build a simple application with SciChart, using React application. 

## Introduction
The role of visualizing data cannot be overemphasized, whether it is about examining stock market trends, monitoring vital medical statistics, or simply analyzing progress, visually presented data enables us to make more informed decisions. SciChart offers a versatile solution for particularly these types of tasks. 


## Discovery of SciChart
My recent endeavor involved developing a financial data analysis tool capable of rendering thousands of data points in a single chart, and it was during this course that I realized that SciChart is an ideal library for the job. As I understood the nuances and the potential applications of this project better, I discovered that while the documentation provided may be extensive, it's still important to follow specific steps to integrate SciChart seamlessly into a React project. This article is tailored for developers seeking a step-by-step guide to implementing SciChart within their React projects. 


## Building a Simple React Application with SciChart

In this section, I'll guide you through the process of setting up a basic React application with SciChart for data visualization. I'll break down the steps involved and provide the necessary code snippets for a seamless integration. 

### Create a React App:

To begin, let's set up a new React application. In this example, we are using [Vite](https://vitejs.dev/guide/) and [npm](https://npmjs.com/). You can create your app with the following command: 

```
npm create vite@latest
```
This command will prompt you to provide details for your project, including the project name, package name, framework (choose React), and variant (choose TypeScript).

```
PS D:\workspace> npm create vite@latest
√ Project name: ... SciChart-React-Demo
√ Package name: ... scichart-react-demo
√ Select a framework: » React
√ Select a variant: » TypeScript

Scaffolding project in D:\workspace\SciChart-React-Demo...

Done. Now run:

  cd SciChart-React-Demo
  npm install
  npm run dev

npm notice
npm notice New major version of npm available! 9.6.6 -> 10.2.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.2.2
npm notice Run npm install -g npm@10.2.2 to update!
npm notice

```
After the setup is complete, navigate to your project directory and install the required packages:

```
cd SciChart-React-Demo
npm install
npm run dev
```
If everything is fine the application will be up and running on the url http://localhost:5173/


### Integrate SciChart:
Now, it's time to include SciChart in your project. To do this, you can use the [npm package for SciChart](https://www.npmjs.com/package/scichart):

```
npm i scichart
```

### Configure Static File Copy:

To ensure that SciChart's required files are available on your application, you'll need a static file copy plugin. You can install it using the following command: 

```
npm i vite-plugin-static-copy
```

After installation, make sure to update your vite.config.js file with the provided configuration code. This code configures the ViteStaticCopy plugin to copy specific files from the 'node_modules' directory to the root directory of your project. This step is crucial for making the necessary static files accessible to your web application. 


```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/scichart/_wasm/scichart2d.data',
          dest: '/'
        },
        {
          src: 'node_modules/scichart/_wasm/scichart2d.wasm',
          dest: '/'
        },
      ]
    })],
})

```

### Create a SciChart component:

Now that your project is set up and SciChart is integrated, it's time to create a SciChart component that will render your charts. The provided code demonstrates how to define this component. It includes the necessary imports from React and SciChart, and it accepts properties for initialization and styling. 

```
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

```

This SciChart component is designed to create and display a chart on a web page. It accepts initialization functions and styling properties as props.


### Create Your First Line Chart:

Finally, you can use the SciChart component to render your first chart. The provided code demonstrates how to create a line chart using the createChart function. This function initializes a SciChart surface, sets up X and Y axes, generates sample data, and associates it with a line series. The chart is then added to the SciChart surface. 


```

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

```
To use the SciChart component and display your line chart, simply include the following line in your code: 

```
 <SciChart initChart={createChart} style={{ width: 800, height: 600 }} />

```
With these steps, you're all set to create and visualize data with SciChart in your React application.  

The expected result should resemble the following:

![SciChart Demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j03ufpv2vt50iueo78lg.png)

## Conclusion

In the light of the aforesaid, it is safe to conclude that SciChart emerges as a powerful ally in the world of data visualization. Its capabilities in handling real-time data, seamless integration with popular JavaScript libraries, and detailed documentation make it a preferred option for the developers. 

By following our guide, you can speedily integrate SciChart into your React projects, creating dynamic charts that will transform data into extraordinary insights. With SciChart, you will be able to unlock a realm of multiple possibilities, enhancing decision-making and user experiences in various applications. Explore, experiment, and let SciChart infuse life into your data. 


If you want to explore and access all the codes used in this article, it's available on GitHub repository.  

https://github.com/ashusharmatech/scichart-react-demo


Resources:

- https://github.com/ABTSoftware/SciChart.JS.Examples/tree/dev_v3.2/Tutorials/React/reusable-react-component/src
- https://www.npmjs.com/package/scichart
- https://vitejs.dev/guide/
- https://www.scichart.com/javascript-chart-features/
