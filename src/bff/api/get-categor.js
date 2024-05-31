export const getCategor = () => fetch(`http://localhost:3005/categories`).then((loadedCateg) => loadedCateg.json());
