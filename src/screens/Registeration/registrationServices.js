export let filterCategory = (arrayValue) =>{
    const categoryArray = []
    for (let i = 0; i < arrayValue.length; i++) {
        var category = arrayValue[i].category_name
        var id = arrayValue.id
        categoryArray.push({ label: category, value: id })
    }
    return categoryArray
}