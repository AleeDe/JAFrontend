
import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <Icon className="text-blue-500" size={24} />
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default StatCard;

