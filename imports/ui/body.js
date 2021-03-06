import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { EITS } from '../api/EITs.js';
import './eitRecords.js';
import './body.html';

var eitId = [];

Template.body.helpers({
  eits() {
      // Show newest EIT's at the top of the list
      return EITS.find({}, { sort: { createdAt: -1 } });
  },
  
  categories: function(){
    return ["Female", "Male", "Other"]
}
});
 
Template.body.events({
  'submit .newEit':function(event) {
    // Prevent default browser form submit
    event.preventDefault();
    
    const target = event.target;
    const firstname = target.firstname.value;
    const surname = target.surname.value;
    const gender = target.genderSelect.value;
    const dob = target.dob.value;

    const id = target.id.value;

    if(id){
      // update EIT record
        Meteor.call('eits.update',id,{
          firstname, 
          surname, 
          gender, 
          dob, 
          createdAt: new Date(), // current time
          owner: Meteor.userId(),
          username: Meteor.user().username,
        });
    }else{
      // insert new EIT
      Meteor.call('eits.insert',{
          firstname, 
          surname, 
          gender, 
          dob, 
          createdAt: new Date(), // current time
          owner: Meteor.userId(),
          username: Meteor.user().username,
        });
    }

    //Clear the all the input forms
    target.firstname.value="";
    target.surname.value="";
    target.genderSelect.value="";
    target.dob.value="";

  },

  'click .toggle-checked' (event){
    var target = event.target;
    var eitEntryId = target.value;
    if (target.checked === true){
      eitId.push(eitEntryId);
    }
    else {
      var index = eitId.indexOf(eitEntryId);
      eitId.splice(index,1);
    }
  },
    
  'click .deleteButton'(event){        
      for(var i = 0; i<eitId.length; i++){
        Meteor.call('eits.remove',eitId[i]);
      }
   },

   'click .updateButton'(event){
    var target = event.target;
    var selectedEit = EITS.findOne({_id:this._id});
    eitForm = document.querySelector('form');

    eitForm.firstname.value = selectedEit.firstname;
    eitForm.surname.value = selectedEit.surname;
    eitForm.genderSelect.value = selectedEit.gender;
    eitForm.dob.value = selectedEit.dob;

    eitForm.id.value = this._id;
  },
});