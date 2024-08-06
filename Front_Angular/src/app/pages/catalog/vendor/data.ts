//created
const created = [
    {
        id: '1',
        image: 'assets/img/nft/catalog/02.jpg',
        title: 'Ocean and sky',
        currentbid: '0.5 ETH',
        bid: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'foxnet_creator',
        time: '12/31/2022 09:00:00 PM'
    },
    {
        id: '2',
        image: 'assets/img/nft/catalog/04.jpg',
        title: 'Astronaut surrounded by lights',
        currentbid: '0.1 ETH',
        bid: '(≈ $ 400.19)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'foxnet_creator'
    },
    {
        id: '3',
        image: 'assets/img/nft/catalog/03.jpg',
        title: 'Aesthetic art collage',
        currentbid: '0.6 ETH',
        bid: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'foxnet_creator'
    },
    {
        id: '4',
        image: 'assets/img/nft/catalog/09.jpg',
        title: '3d aesthetics with shapes',
        currentbid: '0.156 ETH',
        bid: '(≈ $ 595.76)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'foxnet_creator'
    },
    {
        id: '5',
        image: 'assets/img/nft/catalog/10.jpg',
        title: 'Ocean and sky',
        currentbid: '0.5 ETH',
        bid: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'foxnet_creator',
        time: '12/31/2022 12:00:00 PM'
    },
    {
        id: '6',
        image: 'assets/img/nft/catalog/11.jpg',
        title: 'Aesthetic art collage',
        currentbid: '0.6 ETH',
        bid: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'foxnet_creator'
    },
]

//collection
const collections = [
    {
        id: '1',
        image: ['assets/img/nft/collections/1-1.jpg', 'assets/img/nft/collections/1-2.jpg', 'assets/img/nft/collections/1-3.jpg'],
        title: 'Contemporary art collage',
        price: '12180.95',
        profile: 'assets/img/nft/thumbnails/01.png',
        name: 'Sharan_Pagadala'
    },
    {
        id: '2',
        image: ['assets/img/nft/collections/3-1.jpg', 'assets/img/nft/collections/3-2.jpg', 'assets/img/nft/collections/3-3.jpg'],
        title: 'Clone X Mini Monsters',
        price: '1520.18',
        profile: 'assets/img/nft/thumbnails/03.png',
        name: 'Annet_creator'
    }
]

// Liked
const like = [
    {
        id: '1',
        image: 'assets/img/nft/catalog/05.jpg',
        title: 'Aesthetic art collage',
        price: '0.6 ETH',
        dollorprice: '(≈ $ 2,400.65)',
        profile: 'assets/img/nft/catalog/avatars/05.png',
        name: 'Sharan_Pagadala'
    },
    {
        id: '2',
        image: 'assets/img/nft/catalog/06.jpg',
        title: 'Ocean and sky',
        price: '0.5 ETH',
        dollorprice: '(≈ $ 2,000.55)',
        profile: 'assets/img/nft/catalog/avatars/06.png',
        name: 'Simonlee',
        time: '12/31/2022 12:00:00 PM'
    },
    {
        id: '3',
        image: 'assets/img/nft/catalog/07.jpg',
        title: '3d aesthetics with shapes',
        price: '0.156 ETH',
        dollorprice: '(≈ $ 595.76)',
        profile: 'assets/img/nft/catalog/avatars/07.png',
        name: 'Shubham_Dhage',
        time: '12/31/2022 12:00:00 PM'
    },
]

// Activity

const activity = [
    {
        id: '1',
        image: 'assets/img/nft/thumbnails/04.jpg',
        title: '3d aesthetics with...',
        type: 'Sales',
        price: '0.1 ETH',
        dollorprice: '(≈ $ 400.19)',
        from: 'freeross',
        to: 'foxnet_creator',
        date: '4 hours ago',
        color: 'success'
    },
    {
        id: '2',
        image: 'assets/img/nft/thumbnails/05.jpg',
        title: 'Aesthetic art collage',
        type: 'Listings',
        price: '0.4 ETH',
        dollorprice: '(≈ $ 649.82)',
        from: 'foxnet_creator',
        to: '-',
        date: '1 hours ago',
        color: 'info'
    },
    {
        id: '3',
        image: 'assets/img/nft/thumbnails/06.jpg',
        title: 'Contemporary art...',
        type: 'Bids',
        price: '0.25 ETH',
        dollorprice: '(≈ $ 493.24)',
        from: 'foxnet_creator',
        to: 'lulucollages',
        date: 'Dec 22 at 3:41 pm',
        color: 'danger'
    },
    {
        id: '4',
        image: 'assets/img/nft/thumbnails/07.jpg',
        title: 'Ocean and sky',
        type: 'Bids',
        price: '0.1 ETH',
        dollorprice: '(≈ $ 400.19)',
        from: 'foxnet_creator',
        to: 'lulucollages',
        date: 'Nov 15 at 11:20 am',
        color: 'danger'
    },
    {
        id: '5',
        image: 'assets/img/nft/thumbnails/08.jpg',
        title: 'Astronaut & lights',
        type: 'Transfers',
        price: '-',
        from: 'foxnet_creator',
        to: 'DistroKid',
        date: 'Nov 4 at 5:16 pm',
        color: 'warning'
    },
    {
        id: '6',
        image: 'assets/img/nft/thumbnails/09.jpg',
        title: 'Clone Mini Monsters',
        type: 'Sales',
        price: '2.8 ETH',
        dollorprice: '(≈ $ 1360.75)',
        from: 'MihailGreen',
        to: 'foxnet_creator',
        date: 'Oct 29 at 6:29 pm',
        color: 'success'
    }
]

export { created, collections, like, activity }