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
  IonToast,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import './SaisieUtilisateur.css';

// Données statiques pour les rôles (à remplacer par des données réelles si nécessaire)
const rolesData = [
  { role_id: 1, role_name: 'Admin' },
  { role_id: 2, role_name: 'User' }
];

const SaisieUtilisateur: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [role, setRole] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    // Logique pour soumettre le formulaire
    const newUser = {
      user_id: Date.now(),
      username,
      email,
      dateNaissance,
      role_id: role,
      password_hash: password // Pour des raisons de sécurité, un hachage doit être appliqué côté serveur
    };
    console.log('Nouvel utilisateur:', newUser);
    setShowToast(true);
    setUsername('');
    setEmail('');
    setDateNaissance('');
    setRole(undefined);
    setPassword('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Créer Utilisateur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nom d'utilisateur</IonLabel>
          <IonInput
            value={username}
            onIonChange={e => setUsername(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date de Naissance</IonLabel>
          <IonInput
            type="date"
            value={dateNaissance}
            onIonChange={e => setDateNaissance(e.detail.value!)}
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Rôle</IonLabel>
          <IonSelect
            value={role}
            placeholder="Sélectionner un rôle"
            onIonChange={e => setRole(e.detail.value)}
          >
            {rolesData.map(role => (
              <IonSelectOption key={role.role_id} value={role.role_id}>
                {role.role_name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Mot de Passe</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            required
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSubmit}>
          Enregistrer
        </IonButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Utilisateur ajouté avec succès"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default SaisieUtilisateur;
