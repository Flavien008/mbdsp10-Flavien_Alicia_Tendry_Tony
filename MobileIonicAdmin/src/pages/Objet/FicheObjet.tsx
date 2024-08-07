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
  const [historique, setHistorique] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchObjetDetails();
    fetchHistorique();
  }, [id]);

  const fetchObjetDetails = async () => {
    try {
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

  const fetchHistorique = async () => {
    try {
      const response = await axiosInstance.get(`/historique/objet/${id}`);
      const data = response.data;
      setHistorique(data);
    } catch (error) {
      console.error('Error fetching historique:', error);
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
          <IonButtons slot="end">
            <IonButton onClick={() => window.history.back()}>Retour</IonButton>
          </IonButtons>
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
                {historique.length > 0 ? (
                  <IonList>
                    {historique.map((entry, index) => (
                      <IonItem key={index}>
                        <IonLabel>
                          <p><strong>Ancien Propriétaire:</strong> {entry.AncienProprietaire.username}</p>
                          <p><strong>Nouveau Propriétaire:</strong> {entry.NouveauProprietaire.username}</p>
                          <p><strong>Date de changement:</strong> {new Date(entry.date_changement).toLocaleDateString()}</p>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <IonText color="medium">
                    <p>Aucun historique de propriétaires trouvé.</p>
                  </IonText>
                )}
              </IonCardContent>
            </IonCard>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FicheObjet;
