import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const EITS = new Mongo.Collection('eits');

Meteor.methods({
    'eits.insert'(data){
        check(firstname, String);
        check(surname, String);
        check(gender, String);
        check(dob, String);
        EITS.insert(data);
    },

    'eits.update'(id,data){
        check(firstname, String);
        check(surname, String);
        check(gender, String);
        check(dob, String);
        EITS.update(id,{$set:data});
    },

    'eits.remove'(id){
        EITS.remove(id);
    }
});