import React, { useState, useEffect } from 'react';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonRow, 
  IonCol, 
  IonItem, 
  IonLabel, 
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import axiosInstance from '../../utilitaire/axiosConfig'; // Importer l'instance Axios
import './Dashboard.css';

// Enregistrer les composants nécessaires de chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const defaultDate1 = `${currentYear}-01-01`;
  const defaultDate2 = `${currentYear}-12-31`;

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [newUsers, setNewUsers] = useState<number>(0);
  const [exchangesData, setExchangesData] = useState<any>({});
  const [categories, setCategories] = useState<any>({});
  const [date1, setDate1] = useState<string>(defaultDate1);
  const [date2, setDate2] = useState<string>(defaultDate2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel API pour les statistiques des utilisateurs
        const userStatsResponse = await axiosInstance.get('/dashboard/userstats', {
          params: {
            date1: date1,
            date2: date2
          }
        });
        const { totalUsers, activeUsers, newUsers } = userStatsResponse.data;
        setTotalUsers(totalUsers);
        setActiveUsers(activeUsers);
        setNewUsers(newUsers);

        // Appel API pour les statistiques des échanges
        const exchangeStatsResponse = await axiosInstance.get('/dashboard/exchangestats', {
          params: {
            date1: date1,
            date2: date2
          }
        });
        const exchangeStats = exchangeStatsResponse.data.reduce((acc: any, stat: any) => {
          const month = new Date(stat.month).toLocaleString('default', { month: 'short' });
          acc[month] = {
            total: parseInt(stat.total),
            accepted: parseInt(stat.accepted)
          };
          return acc;
        }, {});
        setExchangesData(exchangeStats);

        // Appel API pour la distribution des catégories
        const categoryDistributionResponse = await axiosInstance.get('/dashboard/categorydistribution');
        const categoryDistribution = categoryDistributionResponse.data.reduce((acc: any, category: any) => {
          acc[category.nom] = parseInt(category.count);
          return acc;
        }, {});
        setCategories(categoryDistribution);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [date1, date2]);

  const donutData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  const barData = {
    labels: Object.keys(exchangesData),
    datasets: [
      {
        label: 'Total Exchanges',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: Object.values(exchangesData).map((data: any) => data.total)
      },
      {
        label: 'Accepted Exchanges',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.6)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: Object.values(exchangesData).map((data: any) => data.accepted)
      }
    ]
  };

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent className="ion-padding">
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonItem>
              <IonLabel>Date Début</IonLabel>
              <input 
                type="date" 
                value={date1} 
                onChange={(e) => setDate1(e.target.value)} 
                className="ion-input"
              />
            </IonItem>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonItem>
              <IonLabel>Date Fin</IonLabel>
              <input 
                type="date" 
                value={date2} 
                onChange={(e) => setDate2(e.target.value)} 
                className="ion-input"
              />
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Statistiques des échanges par mois</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <Bar data={barData} />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Utilisateurs</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <Pie data={{
                  labels: ['Total Users', 'Active Users', 'New Users'],
                  datasets: [{
                    data: [totalUsers, activeUsers, newUsers],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                  }]
                }} />
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Objet par catégorie</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <Pie data={donutData} />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
