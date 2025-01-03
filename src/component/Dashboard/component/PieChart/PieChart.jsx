
import PropTypes from 'prop-types';

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No data available</div>;
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item, index) => (
        <div key={index} className="m-2 p-2 bg-gray-100 rounded-lg text-center">
          <div className="font-semibold">{item.name}</div>
          <div className="text-lg">{((item.value / total) * 100).toFixed(1)}%</div>
        </div>
      ))}
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PieChart;

