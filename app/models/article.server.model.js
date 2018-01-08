'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Validation
 */
var validateLength = function (v) {
    // a custom validation function for checking string length
    return v.length <= 15;
};


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {          // the property name
        type: Date,     // types are defined e.g. String, Date, Number - http://mongoosejs.com/docs/guide.html
        default: Date.now
    },
    description: {
        type: String,
        default: '',
        trim: true      // types have specific functions e.g. trim, lowercase, uppercase - http://mongoosejs.com/docs/api.html#schema-string-js
    },
    name: {
        type: String,
        default: '',
        trim: true,
        unique: true,
        required: 'name cannot be blank',
        validate: [validateLength, 'name must be 15 chars in length or less'], // wires into our custom validator function - http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate

    },
    user: Object,
    validLink: {
        type: String,
        default: '',
        match: [/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/, 'Please enter correct link']

    },
    upvotes: {
        type: Number,
        default: 0
    },
    unpvotes: {
        type: Number,
        default: 0
    }
});

// Expose the model to other objects (similar to a 'public' setter).
mongoose.model('Article', ArticleSchema);
