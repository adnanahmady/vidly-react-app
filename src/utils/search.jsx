const search = (list, word) => {
    return list.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1);
}

export default search;