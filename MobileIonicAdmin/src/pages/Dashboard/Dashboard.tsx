import React, { useState } from 'react';
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
  IonSelect, 
  IonSelectOption, 
  IonItem, 
  IonLabel, 
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './Dashboard.css';

// Enregistrer les composants nécessaires de chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const totalUsers = 1000;
  const activeUsers = 200;
  const newUsers = 50;

  const exchangesData = {
    Jan: { total: 30, accepted: 20 },
    Feb: { total: 40, accepted: 25 },
    Mar: { total: 50, accepted: 30 },
    Apr: { total: 60, accepted: 35 },
    May: { total: 70, accepted: 40 },
    Jun: { total: 80, accepted: 45 },
    Jul: { total: 90, accepted: 50 },
    Aug: { total: 100, accepted: 55 },
    Sep: { total: 110, accepted: 60 },
    Oct: { total: 120, accepted: 65 },
    Nov: { total: 130, accepted: 70 },
    Dec: { total: 140, accepted: 75 },
  };

  const categories = {
    Category1: 40,
    Category2: 30,
    Category3: 20,
    Category4: 10,
  };

  const [selectedMonth, setSelectedMonth] = useState<string>('Jan');
  const [selectedYear, setSelectedYear] = useState<number>(2023);

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
        data: Object.values(exchangesData).map(data => data.total)
      },
      {
        label: 'Accepted Exchanges',
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153,102,255,0.6)',
        hoverBorderColor: 'rgba(153,102,255,1)',
        data: Object.values(exchangesData).map(data => data.accepted)
      }
    ]
  };

  const filteredExchanges = Object.values(exchangesData).map(data => ({
    total: data.total,
    accepted: data.accepted,
  }));

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
              <IonLabel>Mois</IonLabel>
              <IonSelect value={selectedMonth} onIonChange={e => setSelectedMonth(e.detail.value)}>
                {Object.keys(exchangesData).map((month, index) => (
                  <IonSelectOption key={index} value={month}>{month}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol size="12" sizeMd="6">
            <IonItem>
              <IonLabel>Année</IonLabel>
              <IonSelect value={selectedYear} onIonChange={e => setSelectedYear(e.detail.value)}>
                {[2023, 2022, 2021, 2020].map((year, index) => (
                  <IonSelectOption key={index} value={year}>{year}</IonSelectOption>
                ))}
              </IonSelect>
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
