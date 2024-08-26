import React, { useState } from 'react';
import {
  IonContent,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton
} from '@ionic/react';
import {
  arrowDown,
  arrowForward,
  homeOutline,
  createOutline,
  listOutline,
  notificationsOutline,
  peopleOutline,
  logOutOutline
} from 'ionicons/icons';
import img from './../logo/logo.png';
import './SideMenu.css';

const SideMenu: React.FC = () => {
  const [visibleSubMenu, setVisibleSubMenu] = useState<string | null>(null);
  const userInfo = JSON.parse(String(localStorage.getItem('user')));
  const username = userInfo ? userInfo.username : 'Inconnu';

  const toggleSubMenu = (e: React.MouseEvent, menuTitle: string) => {
    e.preventDefault();
    setVisibleSubMenu(prevState => (prevState === menuTitle ? null : menuTitle));
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: homeOutline,
      link: '/dashboard'
    },
    {
      title: 'Gestion post',
      icon: createOutline,
      link: '/post'
    },
    {
      title: 'Gestion objet',
      icon: listOutline,
      link: '/gestion-objet'
    },
    {
      title: 'Gestion catégorie',
      icon: notificationsOutline,
      subItems: [
        {
          title: 'Créer',
          icon: createOutline,
          link: '/creer-categorie'
        },
        {
          title: 'Liste',
          icon: listOutline,
          link: '/liste-categorie'
        }
      ]
    },
    {
      title: 'Gestion utilisateur',
      icon: peopleOutline,
      subItems: [
        {
          title: 'Créer',
          icon: createOutline,
          link: '/creer-utilisateur'
        },
        {
          title: 'Liste',
          icon: listOutline,
          link: '/liste-utilisateur'
        }
      ]
    }
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="menu-title">
            <img src={img} alt="logo" className="menu-logo" />
            {username}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subItems ? (
                <IonItem button onClick={(e) => toggleSubMenu(e, item.title)}>
                  <IonIcon slot="start" icon={item.icon} />
                  <IonLabel>{item.title}</IonLabel>
                  <IonIcon slot="end" icon={visibleSubMenu === item.title ? arrowDown : arrowForward} />
                </IonItem>
              ) : (
                <IonMenuToggle key={index} auto-hide="false">
                  <IonItem button routerLink={item.link}>
                    <IonIcon slot="start" icon={item.icon} />
                    <IonLabel>{item.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )}
              {item.subItems && visibleSubMenu === item.title && (
                <IonList className="sub-menu">
                  {item.subItems.map((subItem, subIndex) => (
                    <IonMenuToggle key={subIndex} auto-hide="false">
                      <IonItem button routerLink={subItem.link}>
                        <IonIcon slot="start" icon={subItem.icon} />
                        <IonLabel>{subItem.title}</IonLabel>
                      </IonItem>
                    </IonMenuToggle>
                  ))}
                </IonList>
              )}
            </React.Fragment>
          ))}
        </IonList>
        <IonMenuToggle auto-hide="false">
          <IonButton color="danger" expand="block" onClick={logout} className="logout-button">
            <IonIcon slot="start" icon={logOutOutline} />
            Se déconnecter
          </IonButton>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
