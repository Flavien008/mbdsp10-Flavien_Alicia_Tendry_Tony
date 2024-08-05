import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonItem,
  IonAvatar,
  IonLabel,
  IonSkeletonText,
  IonListHeader,
  IonIcon,
  IonThumbnail,
  IonList
} from '@ionic/react';
import { call } from 'ionicons/icons';
import './Liste.css';
import baseURI from '../utilitaire/baseURI';

export const Liste: React.FC = () => {
  const initialValue = {heading:"",para1:"",para2:""};
  const [data, setData] = useState(initialValue);
  const token = JSON.parse(String(localStorage.getItem('tokens')));
  const userInfo = JSON.parse(String(localStorage.getItem('userInfo')));
  const idUser = JSON.parse(userInfo.id);
  const [notification, setNotification ] = useState(
    [
        {
            signalement : {dateSignalement:""},
            region:{id:"",nom:""}
        }
    ]
  ) 
  useEffect(() => {
    const abortCont = new AbortController();
            fetch(baseURI("/notification/"+idUser),
                {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json'
                    }
                }
            )
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                // setInfiniteDisabled(false);
                // console.log(data);
                setNotification(data);
                console.log(notification);
                
                // setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                console.log('fetch aborted')
                } else {
                // auto catches network / connection error
                  // setInfiniteDisabled(false);
                // setError(err.message);
                }
            })
        // abort the fetch
        return () => abortCont.abort();
    }, [])

  setTimeout(() => {
    setData({
      heading: 'Normal text',
      para1: 'Lorem ipsum dolor sit amet, consectetur',
      para2: 'adipiscing elit.'
    });
  }, 5000);

  return (
    <IonContent>
      {notification && notification.length > 0 ? (
        <>
          <IonList>
                    { notification && notification.map((notif,index:any) =>{
                            <IonItem key={index}>
                                {/* {notif.signalement.dateSignalement} */}
                                {/* <p>Votre signalement le {notif.signalement.dateSignalement} dans la region de {notif.region.nom} est terminé</p> */}
                            </IonItem>
                        } ) 
                }
          </IonList>
        </>
      ) : (
        <>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>

          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
                <IonItem>
                <IonThumbnail slot="start">
                    <IonSkeletonText animated />
                </IonThumbnail>
                <IonLabel>
                    <h3>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                    </h3>
                    <p>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                    </p>
                    <p>
                    <IonSkeletonText animated style={{ width: '60%' }} />
                    </p>
                </IonLabel>
            </IonItem>
          </IonList>
          
        </>
      )}
    </IonContent>
  );
};

export default Liste;