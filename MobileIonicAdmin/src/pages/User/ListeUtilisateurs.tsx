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
  IonAlert,
  IonSpinner,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/react';
import { searchOutline, createOutline, trashOutline } from 'ionicons/icons';
import axiosInstance from '../../utilitaire/axiosConfig';
import './ListeUtilisateurs.css';

const ListeUtilisateurs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchUsers(true);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers(true);
  }, []);

  const fetchUsers = async (reset: boolean = false) => {
    try {
      if (reset) {
        setPage(1);
        setUsers([]);
        setHasMore(true);
        setLoading(true);
      }
      const response = await axiosInstance.get('/users/usersbyrole', {
        params: {
          nom: searchTerm,
          role_id: 2,
          page: reset ? 1 : page,
          limit: 10
        }
      });
      const data = response.data.users;

      if (reset) {
        setUsers(data);
        setPage(2);
      } else {
        setUsers(prevUsers => [...prevUsers, ...data]);
        setPage(prevPage => prevPage + 1);
      }

      if (data.length < 10) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const loadMoreUsers = async (event: CustomEvent<void>) => {
    await fetchUsers();
    (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async () => {
    try {
      const response = await axiosInstance.put(`/users/${selectedUser.user_id}`, {
        username: selectedUser.username,
        email: selectedUser.email,
        dateNaissance: selectedUser.dateNaissance
      });
      if (response.status === 200) {
        setUsers(users.map(u => (u.user_id === selectedUser.user_id ? selectedUser : u)));
        setIsEditModalOpen(false);
      } else {
        console.error('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (user: any) => {
    setSelectedUser(user);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await axiosInstance.delete(`/users/${selectedUser.user_id}`);
      if (response.status === 200) {
        setUsers(users.filter(u => u.user_id !== selectedUser.user_id));
        setIsDeleteAlertOpen(false);
        setSelectedUser(null);
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
        {loading && (
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
            <IonSpinner name="crescent" />
          </IonRow>
        )}
        <IonGrid>
          <IonRow>
            {users.map(user => (
              <IonCol key={user.user_id} size="12" sizeMd="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="custom-card-header">
                    <IonCardTitle className="custom-card-title">{user.username}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="custom-card-content">
                    <p>Email: {user.email}</p>
                    <p>Date de Naissance: {new Date(user.dateNaissance).toLocaleDateString()}</p>
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
        <IonInfiniteScroll
          onIonInfinite={loadMoreUsers}
          threshold="100px"
          disabled={!hasMore}
        >
          <IonInfiniteScrollContent loadingText="Chargement..." />
        </IonInfiniteScroll>
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
