import PropTypes from 'prop-types';

const ChartCard = ({ title, icon: Icon, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
        <Icon className="text-blue-500" size={24} />
      </div>
      {children}
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node
};

export default ChartCard;

