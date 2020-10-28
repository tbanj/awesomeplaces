/* eslint-disable prettier/prettier */
// for tabs only without sideMenu
// const checkRoot = {
//     root: {
//         id: 'root',
//         bottomTabs: {
//             children: [
//                 {
//                     stack: {
//                         id: 'tab-1',
//                         children: [
//                             {
//                                 component: {
//                                     name: 'awesome-places.Find Place',
//                                 },
//                             },
//                         ],
//                         options: {

//                             bottomTab: {
//                                 iconColor: '#FF1493',
//                                 textColor: '#000',
//                             },
//                             bottomTabs: {
//                                 animate: true,
//                             },
//                         },
//                     },
//                 },
//                 {
//                     stack: {
//                         id: 'tab-2',
//                         children: [
//                             {
//                                 component: {
//                                     name: 'awesome-places.Share Place',
//                                 },
//                             },
//                         ],
//                         options: {
//                             bottomTab: {
//                                 iconColor: '#FF1493',
//                                 textColor: '#000',
//                             },
//                             bottomTabs: {
//                                 animate: true,
//                             },
//                             // bottomTab: {
//                             //     animateBadge: true,
//                             //     dotIndicator: {
//                             //         animate: true, visible: true,
//                             //     },
//                             // },
//                             // bottomTabs: {
//                             //     animate: true,
//                             // },
//                         },
//                     },
//                 },
//             ],

//         },

//     },
// };

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
                                // options: {
                                //     bottomTab: {
                                //         iconColor: '#FF1493',
                                //         textColor: '#000',
                                //     },
                                //     bottomTabs: {
                                //         animate: true,
                                //     },
                                // },
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
                                // options: {
                                //     bottomTab: {
                                //         iconColor: '#FF1493',
                                //         textColor: '#000',
                                //     },
                                //     bottomTabs: {
                                //         animate: true,
                                //     },
                                //     bottomTab: {
                                //         animateBadge: true,
                                //         dotIndicator: {
                                //             animate: true, visible: true,
                                //         },
                                //     },
                                //     bottomTabs: {
                                //         animate: true,
                                //     },
                                // },
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
