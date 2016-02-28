module.exports = function (mongoose) {
    var schema = new mongoose.Schema({
        "name"       : {type: String, index: true}
        , "surname"  : {type: String, index: true}
        , "createdAt": {type: Date, default: Date.now}
        , "updateAt" : {type: Date, index: true}
    }, {strict: true});


    schema.options.toJSON = {
        virtuals : true,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    };

    return schema;
};