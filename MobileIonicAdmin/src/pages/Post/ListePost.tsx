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
  IonMenuButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/react';
import { checkmarkCircle, closeCircle, eyeOutline } from 'ionicons/icons';
import './ListePost.css';
import axiosInstance from '../../utilitaire/axiosConfig';

interface Post {
  poste_id: number;
  user_id: number;
  created_at: string;
  titre: string;
  longitude: number;
  latitude: number;
  description: string;
  status: boolean; // true: clôturé, false: non clôturé
  utilisateur: { username: string }; // Nom de l'utilisateur
}

const ListePost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts(true);
  }, [filterStatus, filterUser, filterText, sortOrder]);

  const fetchPosts = async (reset: boolean = false) => {
    try {
      if (reset) {
        setPage(1);
        setPosts([]);
      }
      const statusFilter = filterStatus === 'all' ? '' : filterStatus === 'clotured' ? '1' : '0';

      const response = await axiosInstance.get('/postes', {
        params: {
          page: reset ? 1 : page,
          limit: 10,
          status: statusFilter,
          sortByDate: sortOrder.toUpperCase(),
          nomUtilisateur: filterUser,
          texte: filterText,
        },
      });

      const data = response.data;
      if (data.data.length < 10) setHasMore(false);
      else setHasMore(true);
      setPosts(prevPosts => [...prevPosts, ...data.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

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
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Recherche</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
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
                <IonItem>
                  <IonInput
                    value={filterText}
                    placeholder="Rechercher par texte"
                    onIonChange={e => setFilterText(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="12" sizeMd="4">
                <IonButton expand="block" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant'})
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
        <IonRow>
          {posts.map(post => (
            <IonCol key={post.poste_id} size="12" sizeMd="6">
              <IonCard>
                <IonCardHeader className="ion-card-header">
                  <div>
                    <IonCardTitle className="ion-card-title">{post.titre}</IonCardTitle>
                    <IonLabel className="ion-card-subtitle" style={{ display: 'block', marginTop: '8px' }}>
                      Par : {post.utilisateur.username}
                    </IonLabel>
                  </div>
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
        <IonInfiniteScroll
          onIonInfinite={async (event) => {
            await fetchPosts();
            (event.target as HTMLIonInfiniteScrollElement).complete();
          }}
          threshold="100px"
          disabled={!hasMore}
        >
          <IonInfiniteScrollContent loadingText="Chargement...">
          </IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default ListePost;
