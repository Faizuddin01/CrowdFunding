import { createCampaign, dashboard, logout, payment, profile, withdraw, dashboard_grey, createCampaign_grey, payment_grey, withdraw_grey, profile_grey, logout_grey } from '../assets';

export const navlinks = [
    {
        name: 'dashboard',
        imgUrl: dashboard,
        imgUrl_grey: dashboard_grey,
        link: '/',
    },
    {
        name: 'campaign',
        imgUrl: createCampaign,
        imgUrl_grey: createCampaign_grey,
        link: '/create-campaign',
    },
    {
        name: 'payment',
        imgUrl: payment,
        imgUrl_grey: payment_grey,
        link: '//ethereum.org/en/get-eth/',

    },
    {
        name: 'withdraw',
        imgUrl: withdraw,
        imgUrl_grey: withdraw_grey,
        link: '//ethereum.org/en/wallets/find-wallet/',

    },
    {
        name: 'profile',
        imgUrl: profile,
        imgUrl_grey: profile_grey,
        link: '/profile',
    },
    {
        name: 'logout',
        imgUrl: logout,
        imgUrl_grey: logout_grey,
        link: '/',
    },
];