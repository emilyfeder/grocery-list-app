import { useEffect, useState } from 'react';
import { listCategories, listItems, postItem } from './serverActions';

async function getInitialData() {
    const [categories_result, list_items_result] = await Promise.all([
        listCategories(),
        listItems()
    ]);
    return {
        categories: categories_result.categories,
        listItems: list_items_result.items
    };
}

export function useRootStore() {
    const [initialized, setInitialized] = useState(false);
    const [categories, setCategories] = useState([]);
    const [listItems, setListItems] = useState([]);
    const [defaultCategory, setDefaultCategory] = useState(null);

    useEffect(() => {
        getInitialData().then(result => {
            setCategories(result.categories);
            setDefaultCategory(result.categories.find((cat) => cat.name === 'other'));
            setListItems(result.listItems);
            setInitialized(true);
        });
    }, []);

    const addItem = async (text, categoryId) => {
        let quantity;
        const quantityMatch = text.match(/^([\d]{1,5})\s*\b(.*)/);
        if (quantityMatch) {
            quantity = parseInt(quantityMatch[1]);
            text = quantityMatch[2]
        }
        const name = text.trim();
        const result = await postItem({name, categoryId, quantity});
        if (result.newItem) {
            setListItems([...listItems, result.newItem]);
        } else {
            //replace existing item
            setListItems(listItems.map((item) => {
                if (result.existingItem && result.existingItem.id === item.id) {
                    return result.existingItem;
                } else {
                    return item;
                }
            }));
        }
    }

    const getCategoryById = (categoryId) => {
        return categories.find((cat) => cat.id === categoryId);
    }

    return {
        initialized,
        categories,
        listItems,
        defaultCategory,
        addItem,
        getCategoryById
    }
}

/*
const Category = types.model({
    id: types.identifierNumber,
    name: types.string
});

const ListItem = types
    .model({
        id: types.identifierNumber,
        categoryId: types.reference(Category),
        name: types.string,
        completed: false,
        quantity: types.maybe(types.number)
    })
    .actions((self) => ({
        toggle() {
            self.completed = !self.completed;
        }
    }));


export const RootStore = types
    .model({
        listItems: types.array(ListItem),
        categories: types.array(Category)
    })
    .views((self) => ({
        get defaultCategory() {
            return self.categories.find((cat) => cat.name === 'other');
        },
        getCategoryById(categoryId) {
            return self.categories.find((cat) => cat.id === categoryId);
        }
    })
    )
    .actions((self) => ({
        initialize: flow(function* () {
            const items_result = yield listItems();
            const categories_result = yield listCategories();
            applySnapshot(self, preProcessSnapshot({
                listItems: items_result.items || self.items,
                categories: categories_result.categories || self.categories
            }));
        }),
        addItem: flow(function* (text, categoryId) {
            let quantity;
            const quantityMatch = text.match(/^([\d]{1,5})\s*\b(.*)/);
            if (quantityMatch) {
                quantity = parseInt(quantityMatch[1]);
                text = quantityMatch[2]
            }
            const name = text.trim();
            const result = yield postItem({name, categoryId, quantity});
            self.listItems.unshift(result.newItem);
        })
    }));

export function preProcessSnapshot(snapshot) {
    const modifiedSnapshot = {
        listItems: snapshot.listItems.map((item) => {
            return {
                ...item,
                completed: Boolean(item.completed),
                quantity: item.quantity === null ? undefined : item.quantity
            };
        })
    }
    return modifiedSnapshot;
}*/
