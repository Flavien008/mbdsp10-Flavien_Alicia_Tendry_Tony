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
import './ListeCategories.css';

// Données statiques pour les exemples
const initialCategoriesData = [
  { id: 1, name: 'Catégorie 1', description: 'Description de la catégorie 1' },
  { id: 2, name: 'Catégorie 2', description: 'Description de la catégorie 2' },
  { id: 3, name: 'Catégorie 3', description: 'Description de la catégorie 3' },
  { id: 4, name: 'Catégorie 4', description: 'Description de la catégorie 4' },
];

const ListeCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState(initialCategoriesData);
  const [filteredCategories, setFilteredCategories] = useState(initialCategoriesData);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  useEffect(() => {
    const results = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(results);
  }, [searchTerm, categories]);

  const handleEditCategory = (category: any) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleSaveCategory = () => {
    setCategories(categories.map(cat => (cat.id === selectedCategory.id ? selectedCategory : cat)));
    setIsEditModalOpen(false);
  };

  const handleDeleteCategory = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteAlertOpen(true);
  };

  const confirmDeleteCategory = () => {
    setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
    setIsDeleteAlertOpen(false);
    setSelectedCategory(null);
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
        <IonGrid>
          <IonRow>
            {filteredCategories.map(category => (
              <IonCol key={category.id} size="12" sizeMd="6">
                <IonCard className="custom-card">
                  <IonCardHeader className="custom-card-header">
                    <IonCardTitle className="custom-card-title">{category.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent className="custom-card-content">
                    <p>{category.description}</p>
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
                  value={selectedCategory.name}
                  onIonChange={e => setSelectedCategory({ ...selectedCategory, name: e.detail.value! })}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Description</IonLabel>
                <IonInput
                  value={selectedCategory.description}
                  onIonChange={e => setSelectedCategory({ ...selectedCategory, description: e.detail.value! })}
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
      </IonContent>
    </IonPage>
  );
};

export default ListeCategories;
