import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Home',
        isTitle: true
    },
    {
        id: 11,
        label: 'Compte',
        subItems: [
            {
                id: 12,
                label: 'Parametre du profil',
                link: '/setting',
                parentId: 11
            },
            {
                id: 13,
                label: 'Mes Objets',
                link: '/myitem',
                parentId: 11
            },
            {
                id: 14,
                label: 'Mes publications',
                link: '/mycollection',
                parentId: 11
            },
            
            {
                id: 16,
                label: 'Notifications',
                link: '/notification',
                parentId: 11
            },
        ]
    },
    
]