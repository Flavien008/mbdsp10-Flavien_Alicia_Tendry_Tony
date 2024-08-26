import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonToast
} from '@ionic/react';
import axiosInstance from '../../utilitaire/axiosConfig';
import './SaisieCategorie.css';

const SaisieCategorie: React.FC = () => {
  const [name, setName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/categories', { nom: name });
      if (response.status === 201) {
        setToastMessage('Catégorie ajoutée avec succès');
        setShowToast(true);
        setName('');
      } else {
        setToastMessage('Erreur lors de l\'ajout de la catégorie');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setToastMessage('Erreur lors de l\'ajout de la catégorie');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Saisie Catégorie</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nom de la Catégorie</IonLabel>
          <IonInput
            value={name}
            onIonChange={e => setName(e.detail.value!)}
            required
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSubmit}>
          Enregistrer
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default SaisieCategorie;
