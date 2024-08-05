import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

    const deletePhoto = (filePath:any) => {
        const newPhotos = photos.filter(photos => photos.filepath !== filePath);
        setPhotos(newPhotos);
    }

    const takePhoto = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
      });
      const fileName = new Date().getTime() + '.jpeg';
      const newPhotos = [
        {
          filepath: fileName,
          webviewPath: photo.base64String,
        },
        ...photos,
      ];
      setPhotos(newPhotos);
    };

    const explorePhoto = async () => {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        quality: 100,
      });
      const fileName = new Date().getTime() + '.jpeg';
      const newPhotos = [
        {
          filepath: fileName,
          webviewPath: photo.base64String,
        },
        ...photos,
      ];
      setPhotos(newPhotos);
    };
  
    return {
      takePhoto,explorePhoto,photos,deletePhoto
    };
  }