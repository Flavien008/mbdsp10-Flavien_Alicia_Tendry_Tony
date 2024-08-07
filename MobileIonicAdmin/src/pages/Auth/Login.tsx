import React, { useState } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { mailOutline, lockClosedOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../utilitaire/axiosConfig';
import './Login.css';
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
        setIsSubmit(true);

        try {
            const response = await axiosInstance.post('/users/login', data);
            const resData = response.data;

            setIsSubmit(false);

            localStorage.setItem('token', resData.token);
            localStorage.setItem('user', JSON.stringify({ id: resData.user.id, username: resData.user.name }));
            history.push("/dashboard");
        } catch (err: any) {
            setIsSubmit(false);
            setLoginError(err.response?.data?.message || 'Une erreur est survenue');
            console.error(err.response?.data?.message || err.message);
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
