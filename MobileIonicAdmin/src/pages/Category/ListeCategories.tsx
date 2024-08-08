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
  IonToast
} from '@ionic/react';
import { searchOutline, createOutline, trashOutline } from 'ionicons/icons';
import axiosInstance from '../../utilitaire/axiosConfig';
import './ListeCategories.css';

const ListeCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`/categories`, {
        params: { nom: searchTerm }
      });
      const data = response.data;
      setCategories(data);
      setFilteredCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleSaveCategory = async () => {
    try {
      const response = await axiosInstance.put(`/categories/${selectedCategory.categorie_id}`, {
        nom: selectedCategory.nom,
        description: selectedCategory.description
      });
      if (response.status === 200) {
        setCategories(categories.map(cat => (cat.categorie_id === selectedCategory.categorie_id ? selectedCategory : cat)));
        setIsEditModalOpen(false);
        fetchCategories();
        setToastMessage('Catégorie modifiée avec succès');
        setShowToast(true);
      } else {
        setToastMessage('Erreur lors de la modification de la catégorie');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      setToastMessage('Erreur lors de la modification de la catégorie');
      setShowToast(true);
    }
  };

  const handleDeleteCategory = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteCategory = async () => {
    try {
      const response = await axiosInstance.delete(`/categories/${selectedCategory.categorie_id}`);
      if (response.status === 200) {
        setCategories(categories.filter(cat => cat.categorie_id !== selectedCategory.categorie_id));
        setIsDeleteAlertOpen(false);
        setSelectedCategory(null);
        fetchCategories();
        setToastMessage('Catégorie supprimée avec succès');
        setShowToast(true);
      } else {
        setToastMessage('Erreur lors de la suppression de la catégorie');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setToastMessage('Erreur lors de la suppression de la catégorie');
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
          <IonTitle>Liste des Catégories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">
            <IonIcon icon={searchOutline} />
            Rechercher des catégories
          </IonLabel>
          <IonInput
            value={searchTerm}
            onIonChange={e => setSearchTerm(e.detail.value!)}
          />
        </IonItem>
        {loading ? (
          <IonRow className="ion-justify-content-center ion-align-items-center" style={{ height: '100%' }}>
            <IonSpinner name="crescent" />
          </IonRow>
        ) : (
          <IonGrid>
            <IonRow>
              {filteredCategories.map(category => (
                <IonCol key={category.categorie_id} size="12" sizeMd="6">
                  <IonCard className="custom-card">
                    <IonCardHeader className="custom-card-header">
                      <IonCardTitle className="custom-card-title">{category.nom}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent className="custom-card-content">
                      <IonButton fill="outline" color="primary" onClick={() => handleEditCategory(category)}>
                        <IonIcon slot="start" icon={createOutline} />
                        Modifier
                      </IonButton>
                      <IonButton fill="outline" color="danger" onClick={() => handleDeleteCategory(category)}>
                        <IonIcon slot="start" icon={trashOutline} />
                        Supprimer
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
        {selectedCategory && (
          <IonModal isOpen={isEditModalOpen} onDidDismiss={() => setIsEditModalOpen(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Modifier Catégorie</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setIsEditModalOpen(false)}>Fermer</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Nom</IonLabel>
                <IonInput
                  value={selectedCategory.nom}
                  onIonChange={e => setSelectedCategory({ ...selectedCategory, nom: e.detail.value! })}
                />
              </IonItem>
              <IonButton expand="block" onClick={handleSaveCategory}>Sauvegarder</IonButton>
            </IonContent>
          </IonModal>
        )}
        <IonAlert
          isOpen={isDeleteAlertOpen}
          onDidDismiss={() => setIsDeleteAlertOpen(false)}
          header={'Confirmer la suppression'}
          message={'Êtes-vous sûr de vouloir supprimer cette catégorie?'}
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
              handler: confirmDeleteCategory
            }
          ]}
        />
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

export default ListeCategories;
