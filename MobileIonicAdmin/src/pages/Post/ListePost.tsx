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
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonInput,
  IonButtons,
  IonMenuButton
} from '@ionic/react';
import { checkmarkCircle, closeCircle, eyeOutline } from 'ionicons/icons';
import './ListePost.css';

interface Post {
  poste_id: number;
  user_id: number;
  created_at: string;
  titre: string;
  longitude: number;
  latitude: number;
  description: string;
  status: boolean; // true: clôturé, false: non clôturé
  user_name: string; // Nom de l'utilisateur
}

const ListePost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  // Données statiques pour les posts
  const staticPosts: Post[] = [
    {
      poste_id: 1,
      user_id: 1,
      created_at: '2023-01-01T12:00:00Z',
      titre: 'Post 1',
      longitude: 10.0,
      latitude: 20.0,
      description: 'Description 1',
      status: false,
      user_name: 'User 1'
    },
    {
      poste_id: 2,
      user_id: 2,
      created_at: '2023-02-01T12:00:00Z',
      titre: 'Post 2',
      longitude: 30.0,
      latitude: 40.0,
      description: 'Description 2',
      status: true,
      user_name: 'User 2'
    },
    // Ajoutez plus de données ici
  ];

  useEffect(() => {
    // Simuler la récupération des données des posts depuis une API
    setPosts(staticPosts);
  }, []);

  const filteredPosts = posts
    .filter(post => {
      if (filterStatus === 'clotured') return post.status === true;
      if (filterStatus === 'nonClotured') return post.status === false;
      return true;
    })
    .filter(post => {
      if (!filterUser) return true;
      return post.user_name.toLowerCase().includes(filterUser.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gestion des posts</IonTitle>
          <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow>
          <IonCol size="12" sizeMd="4">
            <IonItem>
              <IonLabel>Filtrer par statut</IonLabel>
              <IonSelect value={filterStatus} onIonChange={e => setFilterStatus(e.detail.value)}>
                <IonSelectOption value="all">Tous</IonSelectOption>
                <IonSelectOption value="clotured">Clôturés</IonSelectOption>
                <IonSelectOption value="nonClotured">Non clôturés</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonItem>
              <IonInput
                value={filterUser}
                placeholder="Nom de l'utilisateur"
                onIonChange={e => setFilterUser(e.detail.value!)}
              />
            </IonItem>
          </IonCol>
          <IonCol size="12" sizeMd="4">
            <IonButton expand="block" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          {filteredPosts.map(post => (
            <IonCol key={post.poste_id} size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader className="ion-card-header">
                  <IonCardTitle className="ion-card-title">{post.titre}</IonCardTitle>
                  <IonLabel className="ion-card-subtitle">Par: {post.user_name}</IonLabel>
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
                  <IonButton routerLink={`/post-fiche/${post.poste_id}`} fill="clear">
                    <IonIcon slot="start" icon={eyeOutline} />
                    Voir la fiche
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default ListePost;
