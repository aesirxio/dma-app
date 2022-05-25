import React from "react";
import Chart from "react-google-charts";

const data = [
  ["", "Comments", "Followers", "Posts", "Engagement"],
  ["Facebook", 1000, 400, 200, 100],
  ["Facebook Ads", 1000, 400, 200, 100],
  ["Youtube", 1170, 460, 250, 800],
  ["Joomla", 660, 1120, 300, 700],
  ["Twitter", 1030, 540, 350, 50],
  ["Pinterest", 1030, 540, 350, 2000],
  ["Instagram", 1030, 540, 350, 1200],
  ["Linkedin", 1030, 540, 350, 600],
];

const colorsLine = ["#4791FF", "#FFD950", "#02BC77", "#FF2366"];

class ComponentChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { titleChart } = this.props;
    return (
      <div className="bg-white shadow-sm rounded-2 h-100">
        {titleChart && (
          <h6 className="text-blue-0 opacity-75 border-bottom-1 p-3 mb-0">
            Engagement / Posts Published
          </h6>
        )}

        <div className="p-3">
          <Chart
            width={"100%"}
            height={"340px"}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              chartArea: {
                width: "92%",
                right: 0,
              },
              color: "red",
              legend: {
                position: "bottom",
                textStyle: {
                  color: "#081240",
                  fontName: "SVN-Sofia Pro",
                  borderRadius: "20px",
                },
              },
              colors: colorsLine,
              vAxis: {
                textStyle: {
                  color: "#081240",
                  fontName: "SVN-Sofia Pro",
                },
                baselineColor: "#EFEFEF",
                gridlines: {
                  color: "#EFEFEF",
                  zeroLineColor: "#EFEFEF",
                },
              },
              hAxis: {
                textStyle: {
                  fontSize: 12,
                  fontName: "SVN-Sofia Pro",
                  color: "#081240",
                },
                baselineColor: "#EFEFEF",
                gridlines: {
                  color: "#EFEFEF",
                  zeroLineColor: "#EFEFEF",
                },
              },
            }}
            rootProps={{ "data-testid": "2" }}
          />
        </div>
      </div>
    );
  }
}

export default ComponentChart;
