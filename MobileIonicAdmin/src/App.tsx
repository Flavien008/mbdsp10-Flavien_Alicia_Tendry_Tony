import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SideMenu from './components/SideMenu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import FicheObjet from './pages/Objet/FicheObjet';
import Dashboard from './pages/Dashboard/Dashboard';
import ListePost from './pages/Post/ListePost';
import PostFiche from './pages/Post/PostFiche';
import ListeObjets from './pages/Objet/ListeObjets';
import ListeCategories from './pages/Category/ListeCategories';
import SaisieCategorie from './pages/Category/SaisieCategorie';
import ListeUtilisateurs from './pages/User/ListeUtilisateurs';
import SaisieUtilisateur from './pages/User/SaisieUtilisateur';

setupIonicReact();

const MainContent: React.FC = () => {
  const location = useLocation();

  return (
    <IonSplitPane contentId="main">
      {location.pathname !== '/' && <SideMenu />}
      <IonRouterOutlet id="main">
        <Route path="/" exact={true}>
          <Login />
        </Route>
        <Route path="/dashboard" exact={true}>
          <Dashboard />
        </Route>
        <Route path="/post" exact={true}>
          <ListePost />
        </Route>
        <Route path="/post-fiche/:id" component={PostFiche} exact />
        <Route path="/gestion-objet" component={ListeObjets} exact />
        <Route path="/fiche-objet/:id" component={FicheObjet} exact />
        <Route path="/liste-categorie" component={ListeCategories} exact />
        <Route path="/creer-categorie" component={SaisieCategorie} exact />
        <Route path="/creer-utilisateur" component={SaisieUtilisateur} exact />
        <Route path="/liste-utilisateur" component={ListeUtilisateurs} exact />
        <Route path="/fiche/:idSig" exact={true}>
          <FicheObjet />
        </Route>
        
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

const App: React.FC = () => {
  defineCustomElements(window);
  
  return (
    <IonApp>
      <IonReactRouter>
        <MainContent />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
