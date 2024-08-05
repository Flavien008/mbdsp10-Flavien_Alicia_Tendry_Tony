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
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonThumbnail,
  IonText
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './ListeObjets.css';

// Données statiques pour les exemples
const objetsData = [
  { id: 1, title: 'Objet 1', description: 'Description de l\'objet 1', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Objet 2', description: 'Description de l\'objet 2', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Objet 3', description: 'Description de l\'objet 3', imageUrl: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Objet 4', description: 'Description de l\'objet 4', imageUrl: 'https://via.placeholder.com/150' },
];

const ListeObjets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredObjets, setFilteredObjets] = useState(objetsData);
  const history = useHistory();

  useEffect(() => {
    const results = objetsData.filter(objet =>
      objet.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredObjets(results);
  }, [searchTerm]);

  const handleCardClick = (id: number) => {
    history.push(`/fiche-objet/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Liste Objets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">
            <IonIcon icon={searchOutline} />
            Rechercher des objets
          </IonLabel>
          <IonInput
            value={searchTerm}
            onIonChange={e => setSearchTerm(e.detail.value!)}
          />
        </IonItem>
        <IonGrid>
          <IonRow>
            {filteredObjets.map(objet => (
              <IonCol key={objet.id} size="12" sizeMd="6">
                <IonCard className="custom-card" button onClick={() => handleCardClick(objet.id)}>
                  <IonCardHeader className="custom-card-header">
                    <IonThumbnail className="custom-thumbnail" slot="start">
                      <img src={objet.imageUrl} alt={objet.title} />
                    </IonThumbnail>
                    <IonCardTitle className="custom-card-title">{objet.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="custom-card-content">
                    <IonText className="custom-description">{objet.description}</IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ListeObjets;
