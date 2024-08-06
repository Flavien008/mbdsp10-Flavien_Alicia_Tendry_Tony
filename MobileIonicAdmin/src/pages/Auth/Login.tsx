import React, { useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { mailOutline, lockClosedOutline, closeOutline } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import baseURI from '../../utilitaire/baseURI';
import img from '../../logo/logo.png';

const loginSchema = Yup.object().shape({
    username: Yup.string().required("Veuillez entrer votre nom d'utilisateur"),
    password: Yup.string().required('Veuillez entrer votre mot de passe').max(100, 'Trop long!'),
});

const Login: React.FC = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginError, setLoginError] = useState('');
    const history = useHistory();

    const login = async (data: { username: string; password: string }) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        };

        setIsSubmit(true);

        try {
            const res = await fetch(baseURI('/users/login'), options);
            const resData = await res.json();

            if (!res.ok) {
                throw new Error(resData.message || 'Erreur inconnue');
            }

            setIsSubmit(false);
            localStorage.setItem('token', JSON.stringify(resData.token));
            localStorage.setItem('user', JSON.stringify({ id: resData.user.id, username: resData.user.name }));
            history.push("/dashboard");
        } catch (err: unknown) {
            setIsSubmit(false);
            if (err instanceof Error) {
                setLoginError(err.message);
                console.error(err.message);
            } else {
                setLoginError('Une erreur est survenue');
                console.error('Une erreur est survenue');
            }
        }
    };

    const closeError = () => {
        setLoginError("");
    };

    return (
        <IonContent>
            <div className='bordure'>
                <IonCard className='loginCard'>
                    <IonCardHeader>
                        <IonCardTitle className='ion-text-center'><h3 className="mb-1">Login</h3></IonCardTitle>
                    </IonCardHeader>
                    <img src={img} className='logo' alt="Logo" />
                    {loginError && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <span id='error'>{loginError}</span>
                            <button type="button" style={{ float: "right" }} className="close" data-dismiss="alert" aria-label="Close" onClick={closeError}>
                                <span aria-hidden="true"><IonIcon icon={closeOutline} /></span>
                            </button>
                        </div>
                    )}
                    <IonCardContent>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={loginSchema}
                            onSubmit={(values) => {
                                login(values);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="ion-padding">
                                    <IonItem>
                                        <IonLabel position="stacked" mode='ios'><IonIcon icon={mailOutline} /> Nom d'utilisateur</IonLabel>
                                        <div className="input-effect">
                                            <Field className="effect-18" name="username" />
                                            <span className="focus-border"></span>
                                        </div>
                                        {errors.username && touched.username ? (
                                            <span id="error">{errors.username}</span>
                                        ) : null}
                                    </IonItem>

                                    <IonItem>
                                        <IonLabel position="stacked" mode='ios'><IonIcon icon={lockClosedOutline} /> Mot de passe</IonLabel>
                                        <div className="input-effect">
                                            <Field className="effect-18" type="password" name='password' />
                                            <span className="focus-border"></span>
                                        </div>
                                        {errors.password && touched.password ? (
                                            <span id="error">{errors.password}</span>
                                        ) : null}
                                    </IonItem>

                                    <br /><br />

                                    <IonButton color="secondary" type="submit" expand="block" disabled={isSubmit}>
                                        Se connecter
                                    </IonButton>

                                    {/* <Link to="/dashboard" id='lien'>
                                        <IonCardSubtitle className='ion-text-center' style={{ margin: "10px 0px 10px 0" }}>Nouveau ? S'inscrire</IonCardSubtitle>
                                    </Link> */}
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
