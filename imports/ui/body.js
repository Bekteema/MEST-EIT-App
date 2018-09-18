import { Template } from 'meteor/templating';
 
import { EITS } from '../api/EITs.js';
import './eitRecords';
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

    EITS.insert({
      firstname, 
      surname, 
      gender, 
      dob, 
      createdAt: new Date() // current time
    });
    
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
    
  'click .deleteButton':function(event){        
      for(var i = 0; i<eitId.length; i++){
        EITS.remove(eitId[i]);
       }
   },
});