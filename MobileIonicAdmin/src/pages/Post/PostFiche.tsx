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
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonMenuButton,
  IonList
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import './PostFiche.css';

// Données statiques pour les exemples
const exchangesData = [
  {
    id: 1,
    status: 'validé',
    description: 'Echange 1 validé',
    objects: [
      { id: 1, name: 'Objet 1', description: 'Description de l\'objet 1' },
      { id: 2, name: 'Objet 2', description: 'Description de l\'objet 2' }
    ]
  },
  {
    id: 2,
    status: 'non validé',
    description: 'Echange 2 non validé',
    objects: [
      { id: 3, name: 'Objet 3', description: 'Description de l\'objet 3' }
    ]
  },
  {
    id: 3,
    status: 'validé',
    description: 'Echange 3 validé',
    objects: [
      { id: 4, name: 'Objet 4', description: 'Description de l\'objet 4' },
      { id: 5, name: 'Objet 5', description: 'Description de l\'objet 5' }
    ]
  },
  {
    id: 4,
    status: 'non validé',
    description: 'Echange 4 non validé',
    objects: [
      { id: 6, name: 'Objet 6', description: 'Description de l\'objet 6' }
    ]
  }
];

// Données statiques pour les objets du post
const postObjectsData = [
  { id: 1, name: 'Objet Post 1', description: 'Description de l\'objet du post 1' },
  { id: 2, name: 'Objet Post 2', description: 'Description de l\'objet du post 2' },
  { id: 3, name: 'Objet Post 3', description: 'Description de l\'objet du post 3' }
];

const PostFiche: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<string>('validé');

  // Données statiques pour le post (à remplacer par un appel API réel)
  const post = {
    id,
    title: 'Titre du post',
    description: 'Description du post',
    created_at: '2023-01-01T12:00:00Z',
    user_name: 'User 1',
    longitude: 10.0,
    latitude: 20.0,
    status: false,
  };

  const filteredExchanges = exchangesData.filter(exchange => exchange.status === selectedTab);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fiche Post</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => window.history.back()}>Retour</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="post-card">
          <IonCardHeader>
            <IonCardTitle>{post.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Description:</strong> {post.description}</p>
            <p><strong>Créé le:</strong> {new Date(post.created_at).toLocaleDateString()}</p>
            <p><strong>Longitude:</strong> {post.longitude}</p>
            <p><strong>Latitude:</strong> {post.latitude}</p>
            <p>
              <strong>Statut:</strong> 
              {post.status ? (
                <IonIcon icon={checkmarkCircle} className="icon-clotured" />
              ) : (
                <IonIcon icon={closeCircle} className="icon-nonClotured" />
              )}
            </p>
          </IonCardContent>
              <hr />
          <IonCardHeader>
            <IonCardTitle>Objets du Post</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {postObjectsData.map(objet => (
                <IonItem key={objet.id} className="custom-item">
                  <IonLabel>
                    <h2>{objet.name}</h2>
                    <p>{objet.description}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
        <hr />
       
        <IonSegment value={selectedTab} onIonChange={e => setSelectedTab(e.detail.value!)}>
          <IonSegmentButton value="validé">
            <IonLabel>Validé</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="non validé">
            <IonLabel>Non Validé</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonCard className="exchanges-card">
          <IonCardHeader>
            <IonCardTitle>Liste des échanges - {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonGrid>
          <IonRow>
            {filteredExchanges.map(exchange => (
              <IonCol key={exchange.id} size="12">
                <IonCard className="exchange-card">
                  <IonCardHeader>
                    <IonCardTitle>{exchange.description}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonList>
                      {exchange.objects.map(objet => (
                        <IonItem key={objet.id} className="custom-item">
                          <IonLabel>
                            <h2>{objet.name}</h2>
                            <p>{objet.description}</p>
                          </IonLabel>
                        </IonItem>
                      ))}
                    </IonList>
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

export default PostFiche;
