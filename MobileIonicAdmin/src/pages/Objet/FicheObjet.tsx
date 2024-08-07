import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonCardSubtitle,
  IonRow,
  IonCol,
  IonSpinner,
  IonText
} from '@ionic/react';
import { readerOutline, personOutline, folderOutline, timeOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import axiosInstance from '../../utilitaire/axiosConfig';
import Slider from '../../components/slider/Slider';
import './FicheObjet.css';

const FicheObjet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialValue = {
    item_id: "",
    name: "",
    description: "",
    Categorie: { nom: "" },
    Utilisateur: { username: "" },
    historiqueProprietaires: [] as Array<{ id: string, nom: string, dateAcquisition: string }>
  };

  const [objet, setObjet] = useState(initialValue);
  const [images, setImages] = useState<Array<{ _id: string, item_id: number, img: string }> | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObjetDetails();
  }, [id]);

  const fetchObjetDetails = async () => {
    try {
      console.log('idddd objettt'+id);
      
      const response = await axiosInstance.get(`/objets/${id}`);
      const data = response.data;
      setObjet(data.objet);
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching object details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Fiche Objet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
            <IonSpinner name="crescent" />
          </IonRow>
        ) : (
          <>
           {images && images.length > 0 && (
              <IonCard>
                <Slider data={images} />
              </IonCard>
            )}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">
                  <b>{objet.name}</b>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  <IonIcon icon={folderOutline} /> Catégorie: {objet.Categorie.nom}
                </IonCardSubtitle>
                <IonCardSubtitle>
                  <IonIcon icon={personOutline} /> Propriétaire: {objet.Utilisateur.username}
                </IonCardSubtitle>
                <hr />
                <IonCardSubtitle>
                  <IonIcon icon={readerOutline} /> Description
                </IonCardSubtitle>
                <p>{objet.description}</p>
                <hr />
                <IonCardSubtitle>
                  <IonIcon icon={timeOutline} /> Historique des propriétaires
                </IonCardSubtitle>
                <IonList>
                  {/* {objet.historiqueProprietaires.map((proprietaire, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <p><strong>{proprietaire.nom}</strong></p>
                        <p>Date d'acquisition: {new Date(proprietaire.dateAcquisition).toLocaleDateString()}</p>
                      </IonLabel>
                    </IonItem>
                  ))} */}
                </IonList>
              </IonCardContent>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FicheObjet;
