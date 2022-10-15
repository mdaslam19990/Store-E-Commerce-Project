const setItems = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
    return true;
}

const getItems = (key) => {
    const data = localStorage.getItem(key);
    if(!data){
        return [];
    }
    return JSON.parse(data)
}


const clearItem = () => {
    localStorage.clear("cart")
}