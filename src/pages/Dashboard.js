import React from 'react';
import { useParams } from 'react-router-dom';
import AdvancedTimeline from '../components/shared/AdvancedTimeline';

const Dashboard = () => {
  const { module } = useParams();

  // Recuperar o nome do usuário do localStorage
  const userName = localStorage.getItem('userName') || 'Usuário';

  return (
    <AdvancedTimeline 
      userName={userName}
      module={module}
    />
  );
};

export default Dashboard;