const products = [
    {
        id: '1',
        image: 'assets/img/nft/catalog/01.jpg',
        title: '3d aesthetics with shapes',
        currentbid: '0.156 ETH',
        bid: '(≈ $ 595.76)',
        profile: 'assets/img/nft/catalog/avatars/01.png',
        name: 'foxnet_creator',
        time: '12/31/2022 12:00:00 PM',
        collection: '3D digital abstract art',
        type: 'live auction'
    },
    {
        id: '2',
        image: 'assets/img/nft/catalog/02.jpg',
        title: 'Ocean and sky',
        currentbid: '0.5 ETH',
        bid: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/02.png',
        name: 'YunusKullebi',
        time: '12/31/2022 09:00:00 PM',
        collection: 'Ocean and sky',
        type: 'live auction'
    },
    {
        id: '3',
        image: 'assets/img/nft/catalog/03.jpg',
        title: 'Aesthetic art collage',
        price: '0.6 ETH',
        dollorprice: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/03.png',
        name: 'lulucollages',
        collection: 'Aesthetic art collage',
        type: 'fixed price'
    },
    {
        id: '4',
        image: 'assets/img/nft/catalog/04.jpg',
        title: 'Astronaut surrounded by lights',
        price: '0.1 ETH',
        dollorprice: '(≈ $ 400.19)',
        profile: 'assets/img/nft/catalog/avatars/04.png',
        name: 'DistroKid',
        collection: 'Contemporary art collage',
        type: 'fixed price'
    },
    {
        id: '5',
        image: 'assets/img/nft/catalog/05.jpg',
        title: 'Aesthetic art collage',
        price: '0.6 ETH',
        dollorprice: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/05.png',
        name: 'Sharan_Pagadala',
        collection: 'Aesthetic art collage',
        type: 'fixed price'
    },
    {
        id: '6',
        image: 'assets/img/nft/catalog/06.jpg',
        title: 'Ocean and sky',
        currentbid: '0.5 ETH',
        bid: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/06.png',
        name: 'Simonlee',
        time: '12/31/2022 12:00:00 PM',
        collection: 'Ocean and sky',
        type: 'live auction'
    },
    {
        id: '7',
        image: 'assets/img/nft/catalog/07.jpg',
        title: '3d aesthetics with shapes',
        currentbid: '0.156 ETH',
        bid: '(≈ $ 595.76)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'Shubham_Dhage',
        time: '12/31/2022 12:00:00 PM',
        collection: '3D digital abstract art',
        type: 'live auction'
    },
    {
        id: '8',
        image: 'assets/img/nft/catalog/08.jpg',
        title: 'Astronaut surrounded by lights',
        price: '0.1 ETH',
        dollorprice: '(≈ $ 400.19)',
        profile: 'assets/img/nft/catalog/avatars/08.png',
        name: 'DistroKid',
        collection: 'Contemporary art collage',
        type: 'fixed price'
    },
    {
        id: '9',
        image: 'assets/img/nft/catalog/09.jpg',
        title: '3d aesthetics with shapes',
        currentbid: '0.156 ETH',
        bid: '(≈ $ 595.76)',
        profile: 'assets/img/nft/catalog/avatars/09.png',
        name: 'shubham_dhage',
        collection: '3D digital abstract art',
        type: 'live auction'
    },
    {
        id: '10',
        image: 'assets/img/nft/catalog/10.jpg',
        title: 'Ocean and sky',
        currentbid: '0.5 ETH',
        bid: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/10.png',
        name: 'MihailGreen',
        time: '12/31/2022 12:00:00 PM',
        collection: 'Ocean and sky',
        type: 'live auction'
    },
    {
        id: '11',
        image: 'assets/img/nft/catalog/11.jpg',
        title: 'Aesthetic art collage',
        price: '0.6 ETH',
        dollorprice: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/11.png',
        name: 'lulucollages',
        collection: 'Aesthetic art collage',
        type: 'fixed price'
    },
    {
        id: '12',
        image: 'assets/img/nft/catalog/12.jpg',
        title: 'Astronaut surrounded by lights',
        price: '0.1 ETH',
        dollorprice: '(≈ $ 400.19)',
        profile: 'assets/img/nft/catalog/avatars/12.png',
        name: 'Sharan_Pagadala',
        time: '12/31/2022 09:00:00 PM',
        type: 'fixed price',
        collection: 'Contemporary art collage'
    },
    {
        id: '13',
        image: 'assets/img/nft/catalog/13.jpg',
        title: '3d aesthetics with shapes',
        currentbid: '0.156 ETH',
        bid: '(≈ $ 595.76)',
        profile: 'assets/img/nft/catalog/avatars/13.png',
        name: 'ZeniconStudio',
        collection: '3D digital abstract art',
        type: 'live auction'
    },
    {
        id: '14',
        image: 'assets/img/nft/catalog/14.jpg',
        title: 'Ocean and sky',
        currentbid: '0.5 ETH',
        bid: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/14.png',
        name: '42Labs',
        collection: 'Ocean and sky',
        type: 'live auction'
    },
    {
        id: '15',
        image: 'assets/img/nft/catalog/15.jpg',
        title: 'Aesthetic art collage',
        price: '0.6 ETH',
        dollorprice: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/15.png',
        name: 'Simonlee',
        time: '12/31/2022 09:00:00 PM',
        type: 'fixed price',
        collection: 'Aesthetic art collage'
    },
    {
        id: '16',
        image: 'assets/img/nft/catalog/16.jpg',
        title: 'Astronaut surrounded by lights',
        price: '0.1 ETH',
        dollorprice: '(≈ $ 400.19)',
        profile: 'assets/img/nft/catalog/avatars/16.png',
        name: 'distrokid',
        collection: 'Contemporary art collage',
        type: 'fixed price'
    }
]

export { products }