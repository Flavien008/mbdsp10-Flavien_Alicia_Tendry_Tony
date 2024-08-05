import React from 'react';
import {useState} from 'react';
import { IonContent, IonPage,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton,IonItemDivider } from '@ionic/react';
import {  IonInput } from '@ionic/react';
import { mailOutline , lockClosedOutline , logInOutline ,closeOutline} from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import baseURI from '../../utilitaire/baseURI';
import img from '../../logo/logo.png';

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Veuillez entre votre nom d\'utilisateur'),
    password: Yup.string()
      .required('Veuillez entrer votre mot de passe')
      .max(100, 'Trop long!'),
  });



export const Login: React.FC = () => {
  const [isSubmit,setIsSubmit]=useState(false);
  const [loginError,setLoginError]=useState('');
  const logInfo=
  {   
      username:"",
      password:"",
  }
  const [ log,setLogin ] = useState(logInfo);


    async function login(data:typeof log){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'POST',
            headers
        };
        setIsSubmit(true);
        
        await fetch(baseURI('/LoginServ?username='+data.username+'&password='+data.password),options).then(res => {
            
            if (res.ok) return res.json();
            else{
                if (res.status === 401) throw Error('Acces non autoriser au serveur');
                else if(res.status === 500) throw Error('Internal Serveur Error ');
                else if (res.status === 400) throw Error('Verifiez vos informations ');
            }
        }).then(data => {
            console.log(data);
            setIsSubmit(false);
            localStorage.setItem('token',JSON.stringify(data.token));
            localStorage.setItem('user',JSON.stringify({"id":data.data.id,"username":data.data.nomuser}));
            window.location.href = "/ajouter";
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                setIsSubmit(false);
                setLoginError(err.message);
                console.log(err.message);
            }
        })
    }

const closeError = () => {
    setLoginError("");
}

  return (
      <IonContent>
          <div className='bordure'>
          <IonCard className='loginCard' >
            <IonCardHeader>
                <IonCardTitle className='ion-text-center'><h3 className="mb-1">Login</h3></IonCardTitle>
            </IonCardHeader>
            <img src={img} className='logo' />
            { loginError.length > 0 &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <span id='error'>{loginError}</span> 
                <button type="button" style={{"float":"right"}} className="close" data-dismiss="alert" aria-label="Close" onClick={closeError}>
                    <span aria-hidden="true"><IonIcon  icon={closeOutline}/></span>
                </button>
                </div>
            }

            <IonCardContent>
                <Formik initialValues={{username:'',password:'',}}
                    validationSchema={loginSchema}
                    onSubmit={values => {
                        login(values);
                    }}
                >
                {({ errors, touched }) => (
                    <Form  className="ion-padding">
                    <IonItem>
                        <IonLabel position="stacked" mode='ios'><IonIcon icon={mailOutline}/> Nom d'utilisateur</IonLabel>
                        <div className="input-effect">
                            <Field className="effect-18" name="username" />
                            <span className="focus-border"></span>
                        </div>

                    </IonItem>
                    {/* username error */}
                        {errors.username && touched.username ? (
                                <span id="error">{errors.username}</span>
                            ) : null}
                    {/* -------------- */}
                    
                    <IonItem>
                        <IonLabel position="stacked" mode='ios'><IonIcon icon={lockClosedOutline} /> Mot de passe</IonLabel>
                        <div className="input-effect">
                            <Field className="effect-18" type="password" name='password' />
                            <span className="focus-border"></span>
                        </div>
                    </IonItem>
                        {errors.password && touched.password ? (
                            <span id="error">{errors.password}</span>
                        ) : null}
                  
                    <br/>
                    <br/>


             
                    <IonButton color="secondary" type="submit" expand="block" disabled={isSubmit}>
                        Se connecter
                    </IonButton>

                    <Link to="/dashboard" id='lien'>
                        <IonCardSubtitle className='ion-text-center' style={{"margin":"10px 0px 10px 0"}} >Nouveau ? S'inscrire</IonCardSubtitle>
                    </Link>
                    
                    </Form>
                )}

                </Formik>

          </IonCardContent>

          </IonCard>
          </div>
      </IonContent>
  );
};

export default Login;