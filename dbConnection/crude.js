const mongoose = require('mongoose');
const insertquery = async(query_params) => {
    const {
        modelName,
        data,
        queryType = 'default'
    } = query_params;
    const groupModel = mongoose.model(modelName);

    let insert = '';
    switch (queryType) {
        case "1":
            insert = await groupModel.insertMany(data);
            break;
        default:
            insert = await groupModel.create(data);
            break;
    }

    return insert;
};
const find_all = async(query_params) => {

    const {
        modelName,
        where = {},
        select = {},
        sort = {},
        limit = 0,
        skip = 0
    } = query_params;

    const groupModel = mongoose.model(modelName);

    return await groupModel.find(where, select).sort(sort).limit(limit).skip(skip);
};

const find_one = async(query_params) => {
    const {
        modelName,
        where = {},
        select = {},
        sort = {},
        limit = 0,
        skip = 0
    } = query_params;

    const groupModel = mongoose.model(modelName);
    return await groupModel.findOne(where, select).sort(sort).limit(limit).skip(skip);
};


const update = async(query_params) => {
    const {
        modelName,
        where,
        updateData,
        queryType
    } = query_params;

    const groupModel = mongoose.model(modelName);
    let update = '';
    switch (queryType) {
        case 'updateOne':
            update = await groupModel.updateOne(where, updateData);
            break;
        case 'updateMany':
            update = await groupModel.updateMany(where, updateData);
            break;
        default:
            update = await groupModel.findOneAndUpdate(where, updateData, {
                upsert: true,
                new: true
            });
            break;
    }
    return update;
};

const deleteQuery = async(query_params) => {
    const {
        modelName,
        condition,
        query_type = "default"
    } = query_params;
    const groupModel = mongoose.model(modelName);
    let delete_data = '';
    switch (query_type) {
        case "deleteOne":
            delete_data = await groupModel.deleteOne(condition);
            break;
        default:
            delete_data = await groupModel.deleteMany(condition);
            break;
    }
    return delete_data;
};

module.exports = { insertquery, find_all, find_one, deleteQuery, update }