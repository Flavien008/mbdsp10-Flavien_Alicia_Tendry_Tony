import React, { useState, useEffect } from 'react';
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
  IonSelectOption,
  IonSpinner,
  IonRow
} from '@ionic/react';
import axiosInstance from '../../utilitaire/axiosConfig';
import './SaisieUtilisateur.css';

const SaisieUtilisateur: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [role, setRole] = useState<number | undefined>(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/roles');
      setRoles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setToastMessage('Les mots de passe ne correspondent pas');
      setShowToast(true);
      return;
    }

    const newUser = {
      username,
      email,
      dateNaissance,
      role_id: role,
      password
    };
    
    try {
      const response = await axiosInstance.post('/users/signup', newUser);
      if (response.status === 201) {
        setToastMessage('Utilisateur ajouté avec succès');
        setShowToast(true);
        setUsername('');
        setEmail('');
        setDateNaissance('');
        setRole(undefined);
        setPassword('');
        setConfirmPassword('');
      } else {
        setToastMessage('Erreur lors de l\'ajout de l\'utilisateur');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setToastMessage('Erreur lors de l\'ajout de l\'utilisateur');
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
          <IonTitle>Créer Utilisateur</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading ? (
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
            <IonSpinner name="crescent" />
          </IonRow>
        ) : (
          <>
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
                {roles.map(role => (
                  <IonSelectOption key={role.role_id} value={role.role_id}>
                    {role.nom}
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
            <IonItem>
              <IonLabel position="stacked">Confirmer Mot de Passe</IonLabel>
              <IonInput
                type="password"
                value={confirmPassword}
                onIonChange={e => setConfirmPassword(e.detail.value!)}
                required
              />
            </IonItem>
            <IonButton expand="block" onClick={handleSubmit}>
              Enregistrer
            </IonButton>
          </>
        )}
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

export default SaisieUtilisateur;
