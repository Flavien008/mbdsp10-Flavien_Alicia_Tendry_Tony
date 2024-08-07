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
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Slider from '../../components/slider/Slider';
import './FicheObjet.css';

const FicheObjet: React.FC = () => {
  const { idObjet } = useParams<{ idObjet: string }>();
  const initialValue = {
    id: "",
    nom: "",
    description: "",
    categorie: "",
    utilisateurProprietaire: { id: "", nom: "" },
    historiqueProprietaires: [] as Array<{ id: string, nom: string, dateAcquisition: string }>
  };

  const imgInit = {
    idObjet: "",
    images: [],
  };

  const [objet, setObjet] = useState(initialValue);
  const [img, setImg] = useState(imgInit);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(String(localStorage.getItem('tokens')));

  const fetchObjetDetails = async () => {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }
    };

    try {
      const res = await fetch('baseURI(`/objet/${idObjet}`), options');
      if (res.status === 401) throw Error('Accès non autorisé au serveur!');
      if (res.status === 500) throw Error('Erreur interne du serveur !');
      const data = await res.json();
      setObjet(data);
    } catch (err) {
      // console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async () => {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      }
    };

    try {
      const res = await fetch(`/images/${idObjet}`);
      if (res.status === 401) throw Error('Accès non autorisé au serveur!');
      if (res.status === 500) throw Error('Erreur interne du serveur !');
      const data = await res.json();
      setImg(data);
    } catch (err) {
      // console.error(err.message);
    }
  };

  useEffect(() => {
    fetchObjetDetails();
    fetchImages();
  }, [idObjet]);

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
            <IonCard>
              <Slider data={img} />
            </IonCard>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle className="ion-text-center">
                  <b>{objet.nom}</b>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  <IonIcon icon={folderOutline} /> Catégorie: {objet.categorie}
                </IonCardSubtitle>
                <IonCardSubtitle>
                  <IonIcon icon={personOutline} /> Propriétaire: {objet.utilisateurProprietaire.nom}
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
                  {objet.historiqueProprietaires.map((proprietaire, index) => (
                    <IonItem key={index}>
                      <IonLabel>
                        <p><strong>{proprietaire.nom}</strong></p>
                        <p>Date d'acquisition: {new Date(proprietaire.dateAcquisition).toLocaleDateString()}</p>
                      </IonLabel>
                    </IonItem>
                  ))}
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
