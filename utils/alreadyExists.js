const alreadyExists = (field, id) => field.filter(i => i.toString() === id).length > 0;

module.exports = alreadyExists;