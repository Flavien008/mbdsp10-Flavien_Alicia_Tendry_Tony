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
  IonText,
  IonSelect,
  IonSelectOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonThumbnail
} from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../utilitaire/axiosConfig';
import './ListeObjets.css';

const ListeObjets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredObjets, setFilteredObjets] = useState<any[]>([]);
  const [nomUtilisateur, setNomUtilisateur] = useState<string>('');
  const [categorieId, setCategorieId] = useState<number | undefined>(undefined);
  const [categories, setCategories] = useState<any[]>([]);
  const [nomObjet, setNomObjet] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    fetchObjets(true);
  }, [nomUtilisateur, categorieId, nomObjet]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchObjets = async (reset: boolean = false) => {
    try {
      if (reset) {
        setPage(1);
        setFilteredObjets([]);
      }
      const response = await axiosInstance.get('/objets', {
        params: {
          page: reset ? 1 : page,
          limit: 10,
          nomUtilisateur: nomUtilisateur,
          categorie: categorieId,
          nomObjet: nomObjet,
          description: '',
        },
      });
      const newObjects = response.data.data;
      setFilteredObjets(prevObjets => [...prevObjets, ...newObjects]);
      setHasMore(newObjects.length === 10);
      if (!reset) {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching objets:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCardClick = (id: number) => {
    history.push(`/fiche-objet/${id}`);
  };

  const handleInfiniteScroll = async (event: CustomEvent<void>) => {
    await fetchObjets();
    (event.target as HTMLIonInfiniteScrollElement).complete();
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
            value={nomObjet}
            placeholder="Nom de l'objet"
            onIonChange={e => setNomObjet(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">
            Nom de l'utilisateur
          </IonLabel>
          <IonInput
            value={nomUtilisateur}
            placeholder="Nom de l'utilisateur"
            onIonChange={e => setNomUtilisateur(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">
            Catégorie
          </IonLabel>
          <IonSelect
            value={categorieId}
            placeholder="Sélectionner une catégorie"
            onIonChange={e => setCategorieId(e.detail.value)}
          >
            <IonSelectOption value={''}>Toutes</IonSelectOption>
            {categories.map(categorie => (
              <IonSelectOption key={categorie.categorie_id} value={categorie.categorie_id}>
                {categorie.nom}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonGrid>
          <IonRow>
            {filteredObjets.map(objet => (
              <IonCol key={objet.item_id} size="12" sizeMd="6">
                <IonCard className="custom-card" button onClick={() => handleCardClick(objet.item_id)}>
                  <IonCardHeader className="custom-card-header">
                    <IonCardTitle className="custom-card-title">{objet.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="custom-card-content">
                    <IonText className="custom-description">{objet.description}</IonText>
                    <IonText className="custom-proprietaire"><strong>Propriétaire:</strong> {objet.Utilisateur.username}</IonText>
                    <IonText className="custom-categorie"><strong>Catégorie:</strong> {objet.Categorie.nom}</IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          onIonInfinite={handleInfiniteScroll}
          threshold="100px"
          disabled={!hasMore}
        >
          <IonInfiniteScrollContent loadingText="Chargement..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default ListeObjets;
