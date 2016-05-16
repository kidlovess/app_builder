steal(
'opstools/BuildApp/models/base/ABObject.js',
function() {
    System.import('appdev').then(function() {
		steal.import('appdev/model/model').then(function() {

			// Namespacing conventions:
			// AD.Model.extend('[application].[Model]', {static}, {instance} );  --> Object
			AD.Model.extend('opstools.BuildApp.ABObject', {
				/*
					findAll: 'GET /app_builder/abobject',
					findOne: 'GET /app_builder/abobject/{id}',
					create:  'POST /app_builder/abobject',
					update:  'PUT /app_builder/abobject/{id}',
					destroy: 'DELETE /app_builder/abobject/{id}',
					describe: function() {},   // returns an object describing the Model definition
					fieldId: 'id',             // which field is the ID
					fieldLabel:'label'      // which field is considered the Label
				*/
			}, {
				/*
					// Already Defined:
					model: function() {},   // returns the Model Class for an instance
					getID: function() {},   // returns the unique ID of this row
					getLabel: function() {} // returns the defined label value
				*/
			});
		});
	});
});