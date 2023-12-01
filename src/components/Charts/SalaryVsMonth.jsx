import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { useEffect, useState } from 'react';

const chartSetting = {
  yAxis: [
    {
      label: 'Salary (BDT)',
    },
  ],
  width: 700,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-10px, 0)',
    },

  },
};

const months = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

export default function SalaryVsMonth({ salaryData }) {
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true)
  console.log(salaryData, "222");
  useEffect(() => {
    // Transform salaryData into the desired format
    const updatedData = salaryData.map(data => ({
      time: `${months[data.month - 1].label}, ${data.year}`,
      amount: data.paid / (1000),
    }));

    // Update the dataset state
    setDataset(updatedData)
    setLoading(false)
  }, [salaryData]);

  return (
    <>
      {
        loading ?
          <span className='loading loading-spinner loading-lg'></span>
            :
            dataset.length > 0 ?
              <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'time' }]}
                series={[
                  { dataKey: 'amount', label: 'Amount(In thousand)', valueFormatter: (value) => `${value}K BDT` },
                ]}
                {...chartSetting}
              />
              :
              <div>No salary data available</div>
      }
    </>
  );
}
