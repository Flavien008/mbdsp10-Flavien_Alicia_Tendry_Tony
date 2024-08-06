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
import baseURI from '../../utilitaire/baseURI';

const PostFiche: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedTab, setSelectedTab] = useState<string>('validé');
  const [post, setPost] = useState<any>(null);
  const [filteredExchanges, setFilteredExchanges] = useState<any[]>([]);

  useEffect(() => {
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post) {
      setFilteredExchanges(
        post.details.filter((exchange: any) => exchange.status === selectedTab)
      );
    }
  }, [post, selectedTab]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`${baseURI('/postes')}/${id}`);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  if (!post) {
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
          <p>Chargement...</p>
        </IonContent>
      </IonPage>
    );
  }

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
            <IonCardTitle>{post.titre}</IonCardTitle>
            <IonLabel className="ion-card-subtitle">Par: {post.utilisateur.username}</IonLabel>
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
              {post.details.map((detail: any) => (
                <IonItem key={detail.poste_details_id} className="custom-item">
                  <IonLabel>
                    <h2>{detail.Objet.name}</h2>
                    <p>{detail.Objet.description}</p>
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
                      {exchange.objects.map((objet: any) => (
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
