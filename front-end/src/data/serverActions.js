const server_url = 'http://localhost:80';

export async function postItem({name, categoryId, quantity}) {
    const response = await fetch(`${server_url}/items`, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, categoryId, quantity}),
    });

    const result = await response.json();
    console.log('addItem result', result);
    return result;
}

export async function listCategories() {
    const response = await fetch(`${server_url}/categories`);
    const result = await response.json();
    return result;
}

export async function listItems() {
    const response = await fetch(`${server_url}/items`);
    const result = await response.json();
    return result;
}