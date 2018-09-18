import { Mongo } from 'meteor/mongo';
 
export const EITS = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(data){
        EITS.insert(data);
    },

    'eits.update'(id,data){
        EITS.update(id,{$set:data});
    },
});