import PropTypes from 'prop-types';

const BarChart = ({ data }) => {
  const maxUsage = Math.max(...data.map(item => item.usage));

  return (
    <div className="space-y-2">
      {data.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="w-24 text-sm text-gray-600">{item.name}</div>
          <div className="flex-grow">
            <div
              className="h-6 bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(item.usage / maxUsage) * 100}%` }}
            >
              <span className="px-2 text-white text-sm">{item.usage}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

};

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BarChart;
