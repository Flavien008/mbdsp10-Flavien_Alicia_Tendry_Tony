import { Geolocation } from '@capacitor/geolocation';

export const printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    // console.log('Current position:', coordinates.coords);
    return coordinates.coords;
}