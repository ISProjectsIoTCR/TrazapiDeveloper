export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "uil-chart-line",
        badge: {
            variant: "info",
            text: "menuitems.dashboard.badge"
        },
        link: "/"
    },

    {
        id: 3,
        label: "menuitems.tables.text",
        icon: "uil-edit",
        subItems: [
            {
                id: 7,
                label: "menuitems.tables.list.check",
                link: "/inspection",
                parentId: 6
            },
            {
                id: 8,
                label: "menuitems.tables.list.composition",
                link: "/composition",
                parentId: 6
            },
            {
                id: 9,
                label: "menuitems.tables.list.rainyseason",
                link: "/rainyseason",
                parentId: 6
            },

            {
                id: 10,
                label: "menuitems.tables.list.harvest",
                link: "/harvest",
                parentId: 6
            },

        ]
    },
    {
        id: 4,
        label: "menuitems.medication.text",
        icon: "uil-ambulance",
        badge: {
            variant: "info",
            text: "menuitems.dashboard.badge"
        },
        link: "/medication"
    },

    {
        id: 5,
        label: "menuitems.stock.text",
        icon: "uil-shovel",
        badge: {
            variant: "info",
            text: "menuitems.dashboard.badge"
        },
        link: "/stock"
    },

 

];

