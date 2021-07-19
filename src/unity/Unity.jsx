export const handleChangeData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                day: date,
                case: data[casesType][date] - lastDataPoint,
            };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
};

export const handleChangeDataTotal = (data, casesType) => {
    let chartData = [];
    for (let date in data.cases) {
            let newDataPoint = {
                day: date,
                case: data[casesType][date],
            };
        chartData.push(newDataPoint);
    }
    return chartData;
};

