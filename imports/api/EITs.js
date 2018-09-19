import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const EITS = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(data){
        EITS.insert(data);
    },

    'eits.update'(id,data){
        EITS.update(id,{$set:data});
    },

    'eits.remove'(id){
        EITS.remove(id);
    }
});