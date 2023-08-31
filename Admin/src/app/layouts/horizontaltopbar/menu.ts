import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 84,
        icon: 'bx-collection',
        label: 'MENUITEMS.COMPONENTS.TEXT',
        subItems: [
            {
                id: 85,
                label: 'MENUITEMS.FORMS.TEXT',
                subItems: [
                    {
                        id: 86,
                        label: 'MENUITEMS.FORMS.LIST.NEWBUSINESS',
                        link: '/form/new',
                        parentId: 85
                    }
                ]
            }
        ]
    },

];

