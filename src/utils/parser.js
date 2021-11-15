export const getArrayCollection = (snapshot) => {
    const collection = [];
    snapshot.array.forEach((element) => {
      collection.push({
        id: element.id,
        ...element.data(),
      });
    });
    return collection;
  };
  
  export const getFirstElementArrayCollection = (snapshot) => {
    const collection = getArrayCollection(snapshot);
    return collection[0];
  };