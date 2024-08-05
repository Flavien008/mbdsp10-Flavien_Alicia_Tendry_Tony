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
import './SaisieCategorie.css';

const SaisieCategorie: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    // Logique pour soumettre le formulaire
    const newCategory = { id: Date.now(), name, description };
    console.log('Nouvelle catégorie:', newCategory);
    setShowToast(true);
    setName('');
    setDescription('');
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
          message="Catégorie ajoutée avec succès"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default SaisieCategorie;
