import { BarChart2, Clock, PieChart, Users } from 'react-feather';
import StatCard from './StatCard/StatCard';
import ChartCard from './component/ChartCard/ChartCard';
import BarChart from './component/BarChart/BarChart';
import PieChartComponent from './component/PieChart/PieChart';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      navigate('/login');
      
    }
    
  }, [navigate]);
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
  
    return () => clearTimeout(timer);
  }, []);
  
  
  const totalUsers = 10000;
  const currentUsers = 290;
  const averageUsageTime = '45 minutes';
  const componentUsage = [
    { name: 'Component A', usage: 45 },
    { name: 'Component B', usage: 30 },
    { name: 'Component C', usage: 15 },
    { name: 'Component D', usage: 10 },
  ];
  const regionData = [
    { name: 'North America', value: 40 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 20 },
    { name: 'Others', value: 10 },
  ];

  if (isLoading) {
    return(
      <div className="p-4 space-y-8 md:p-8">
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div className="animate-pulse">
      <div className="h-24 bg-gray-300 rounded"></div>
    </div>
    <div className="animate-pulse">
      <div className="h-24 bg-gray-300 rounded"></div>
    </div>
    <div className="animate-pulse">
      <div className="h-24 bg-gray-300 rounded"></div>
    </div>
  </div>
  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div className="animate-pulse">
      <div className="h-48 bg-gray-300 rounded"></div>
    </div>
    <div className="animate-pulse">
      <div className="h-48 bg-gray-300 rounded"></div>
    </div>
  </div>
</div>


      
    );
  }
  return (
    <div className="p-4 space-y-8 md:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Users" value={totalUsers.toLocaleString()} icon={Users} />
        <StatCard title="Current Users" value={currentUsers.toLocaleString()} icon={Users} />
        <StatCard title="Average Usage Time" value={averageUsageTime} icon={Clock} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ChartCard title="Component Usage" icon={BarChart2}>
          <BarChart data={componentUsage} />
        </ChartCard>
        <ChartCard title="Regional Access" icon={PieChart}>
          <PieChartComponent data={regionData} />
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardHome;
