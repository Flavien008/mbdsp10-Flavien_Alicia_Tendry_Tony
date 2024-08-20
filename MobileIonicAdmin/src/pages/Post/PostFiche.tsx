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
  IonList,
  IonSpinner,
  IonToast,
  IonAlert // Importer IonAlert pour le modal de confirmation
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { checkmarkCircle, closeCircle, trashBin } from 'ionicons/icons';
import axiosInstance from '../../utilitaire/axiosConfig';
import './PostFiche.css';

const PostFiche: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState<string>('validé');
  const [post, setPost] = useState<any>(null);
  const [filteredExchanges, setFilteredExchanges] = useState<any[]>([]);
  const [allExchanges, setAllExchanges] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // État pour afficher ou masquer l'alerte

  useEffect(() => {
    fetchPost();
    fetchExchanges();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (allExchanges) {
      setFilteredExchanges(
        allExchanges.filter((exchange: any) => exchange.status === selectedTab)
      );
    }
  }, [allExchanges, selectedTab]);

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get(`/postes/${id}`);
      const data = response.data;
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post:', error);
      setLoading(false);
    }
  };

  const fetchExchanges = async () => {
    try {
      const response = await axiosInstance.get(`/echanges/post/${id}`);
      const data = response.data;
      setAllExchanges(data);
      setFilteredExchanges(data.filter((exchange: any) => exchange.status === selectedTab));
    } catch (error) {
      console.error('Error fetching exchanges:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axiosInstance.get(`/commentaires/poste/${id}`);
      const data = response.data;
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/postes/${id}`);
      setShowToast(true);
      setTimeout(() => {
        history.push('/post'); // Rediriger vers la liste des posts après la suppression
      }, 2000); // Attendre 2 secondes avant la redirection pour montrer le toast
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const confirmDelete = () => {
    setShowAlert(true);
  };

  if (loading) {
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
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
            <IonSpinner name="crescent" />
          </IonRow>
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
            <IonLabel className="ion-card-subtitle">Par: {post.Utilisateur.username}</IonLabel>
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
            <IonButton color="danger" expand="block" onClick={confirmDelete}>
              <IonIcon slot="start" icon={trashBin} />
              Supprimer ce Post
            </IonButton>
          </IonCardContent>
          <hr />
          <IonCardHeader>
            <IonCardTitle>Objets du Post</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {post.Postedetails.map((detail: any) => (
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
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {filteredExchanges.map(exchange => (
                  <IonCol key={exchange.id} size="12">
                    <IonCard className="exchange-card">
                      <IonCardHeader>
                        <IonCardTitle>{exchange.description}</IonCardTitle>
                        <IonLabel className="ion-card-subtitle">Proposé par: {exchange.Proposer.username}</IonLabel>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonList>
                          {exchange.EchangeDetails.map((detail: any) => (
                            <IonItem key={detail.id} className="custom-item">
                              <IonLabel>
                                <h2>{detail.Objet.name}</h2>
                                <p>{detail.Objet.description}</p>
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
          </IonCardContent>
        </IonCard>
        <hr />
        <IonCard className="comments-card">
          <IonCardHeader>
            <IonCardTitle>Commentaires</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {comments.length > 0 ? (
                comments.map((comment: any) => (
                  <IonItem key={comment._id} className="custom-item">
                    <IonLabel>
                      <h2>{comment.utilisateur.username}</h2>
                      <p>{comment.description}</p>
                      <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
                    </IonLabel>
                  </IonItem>
                ))
              ) : (
                <IonItem>
                  <IonLabel>Aucun commentaire trouvé.</IonLabel>
                </IonItem>
              )}
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Le post a été supprimé avec succès."
          duration={2000}
          color="success"
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Confirmation'}
          message={'Êtes-vous sûr de vouloir supprimer ce post ?'}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                setShowAlert(false);
              }
            },
            {
              text: 'Supprimer',
              handler: () => {
                handleDelete();
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default PostFiche;
