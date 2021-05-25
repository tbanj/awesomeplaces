/* eslint-disable prettier/prettier */
// for bottom tabs with sideMenu
const mainRoot = {
    root: {
        sideMenu: {
            id: 'sideMenu',
            options: {
                sideMenu: {
                    left: {
                        width: 200,
                        shouldStretchDrawer: false,
                    },
                },
            },
            left: {
                component: {
                    id: 'Drawer',
                    name: 'awesome-places.MenuScreen',
                },

            },
            center: {

                bottomTabs: {
                    id: 'BOTTOM_TABS_MAJAPLACE',
                    children: [
                        {
                            stack: {
                                id: 'tab-1',
                                children: [
                                    {
                                        component: {
                                            id: 'findPlace',
                                            name: 'awesome-places.Find Place',
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            stack: {
                                id: 'tab-2',
                                children: [
                                    {
                                        component: {
                                            id: 'sharePlace',
                                            name: 'awesome-places.Share Place',
                                        },
                                    },
                                ],
                            },
                        },
                    ],

                },
            },
        },
        options: { width: 100 },
    },
};
export default mainRoot;
