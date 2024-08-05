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
  IonButton,
  IonModal,
  IonAlert
} from '@ionic/react';
import { searchOutline, createOutline, trashOutline } from 'ionicons/icons';
import './ListeUtilisateurs.css';

// Données statiques pour les exemples
const initialUsersData = [
  { user_id: 1, username: 'Utilisateur1', email: 'utilisateur1@example.com', dateNaissance: '1990-01-01', role_id: 1, role: 'Admin' },
  { user_id: 2, username: 'Utilisateur2', email: 'utilisateur2@example.com', dateNaissance: '1992-05-12', role_id: 2, role: 'User' },
  { user_id: 3, username: 'Utilisateur3', email: 'utilisateur3@example.com', dateNaissance: '1988-03-23', role_id: 2, role: 'User' },
  { user_id: 4, username: 'Utilisateur4', email: 'utilisateur4@example.com', dateNaissance: '1995-07-30', role_id: 1, role: 'Admin' },
];

const ListeUtilisateurs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState(initialUsersData);
  const [filteredUsers, setFilteredUsers] = useState(initialUsersData);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    const results = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = () => {
    setUsers(users.map(u => (u.user_id === selectedUser.user_id ? selectedUser : u)));
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(u => u.user_id !== selectedUser.user_id));
    setIsDeleteAlertOpen(false);
    setSelectedUser(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Liste des Utilisateurs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">
            <IonIcon icon={searchOutline} />
            Rechercher des utilisateurs
          </IonLabel>
          <IonInput
            value={searchTerm}
            onIonChange={e => setSearchTerm(e.detail.value!)}
          />
        </IonItem>
        <IonGrid>
          <IonRow>
            {filteredUsers.map(user => (
              <IonCol key={user.user_id} size="12" sizeMd="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="custom-card-header">
                    <IonCardTitle className="custom-card-title">{user.username}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="custom-card-content">
                    <p>Email: {user.email}</p>
                    <p>Date de Naissance: {user.dateNaissance}</p>
                    <p>Rôle: {user.role}</p>
                    <IonButton fill="outline" color="primary" onClick={() => handleEditUser(user)}>
                      <IonIcon slot="start" icon={createOutline} />
                      Modifier
                    </IonButton>
                    <IonButton fill="outline" color="danger" onClick={() => handleDeleteUser(user)}>
                      <IonIcon slot="start" icon={trashOutline} />
                      Supprimer
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {selectedUser && (
          <IonModal isOpen={isEditModalOpen} onDidDismiss={() => setIsEditModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Modifier Utilisateur</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsEditModalOpen(false)}>Fermer</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Nom d'utilisateur</IonLabel>
                <IonInput
                  value={selectedUser.username}
                  onIonChange={e => setSelectedUser({ ...selectedUser, username: e.detail.value! })}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  value={selectedUser.email}
                  onIonChange={e => setSelectedUser({ ...selectedUser, email: e.detail.value! })}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Date de Naissance</IonLabel>
                <IonInput
                  type="date"
                  value={selectedUser.dateNaissance}
                  onIonChange={e => setSelectedUser({ ...selectedUser, dateNaissance: e.detail.value! })}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Rôle</IonLabel>
                <IonInput
                  value={selectedUser.role}
                  onIonChange={e => setSelectedUser({ ...selectedUser, role: e.detail.value! })}
                />
              </IonItem>
              <IonButton expand="block" onClick={handleSaveUser}>Sauvegarder</IonButton>
            </IonContent>
          </IonModal>
        )}
        <IonAlert
          isOpen={isDeleteAlertOpen}
          onDidDismiss={() => setIsDeleteAlertOpen(false)}
          header={'Confirmer la suppression'}
          message={'Êtes-vous sûr de vouloir supprimer cet utilisateur?'}
          buttons={[
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {
                setIsDeleteAlertOpen(false);
              }
            },
            {
              text: 'Supprimer',
              handler: confirmDeleteUser
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ListeUtilisateurs;
