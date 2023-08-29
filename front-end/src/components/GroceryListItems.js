import React, { useMemo } from 'react';
import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { capitalize } from '@mui/material/utils'
import { useRootStoreContext } from '../data';

export function GroceryListItems() {
    const store = useRootStoreContext();

    const groupedListItems = useMemo(() => {
        const grouped = store.listItems.reduce((memo, item) => {
            if (!memo[item.categoryId]) {
                memo[item.categoryId] = [];
            }
            memo[item.categoryId].push(item);
            return memo;
        }, {});
        for (const [category, items] of Object.entries(grouped)) {
            grouped[category] = items.sort((itemA, itemB) => {
                return itemA.name < itemB.name ? -1 : 1;
            });
        }
        return grouped;
    }, [store.listItems]);

    const renderListItems = () => {
        if (!store.listItems.length) {
            return (
                <ListItem><ListItemText primary="List is Empty"/></ListItem>
            );
        } else {
            const renderedItems = [];
            for (const [categoryId, items] of Object.entries(groupedListItems)) {
                const category = store.getCategoryById(parseInt(categoryId));
                renderedItems.push(
                    <li key={categoryId}>
                        <ul>
                            <ListSubheader>{capitalize(category.name)}</ListSubheader>
                        {
                            items.map((item) => (
                                <ListItem key={`item-${categoryId}-${item.id}`}>
                                    <ListItemText primary={`${item.quantity ? `${item.quantity} ` : ''}${item.name}`} />
                                </ListItem>
                            ))
                        }
                        </ul>
                    </li>
                )
            }
            return renderedItems;
        }
    }
    return (
        <List>
            {
                renderListItems()
            }
        </List>
    )
}