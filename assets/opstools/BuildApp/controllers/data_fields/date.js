steal(function () {
	var componentIds = {
		editView: 'ab-new-date',
		includeTime: 'ab-new-date-include-time',
		includeDay : 'ab-new-date-include-day',
		includeMonth : 'ab-new-date-include-month',
		includeYear : 'ab-new-date-include-year',
		typeDate : 'ab-new-date-typeDate',
	};

	// General settings
	var dateDataField = {
		name: 'date',
		type: ['datetime', 'date'], // http://sailsjs.org/documentation/concepts/models-and-orm/attributes#?attribute-options
		icon: 'calendar',
		menuName: 'Date',
		includeHeader: true,
		description: ''
	};

	// Edit definition
	dateDataField.editDefinition = {
		id: componentIds.editView,
		rows: [
			{
				view: "label",
				label: "Pick one from a calendar."
			},
			{
				view: "checkbox",
				id: componentIds.includeTime,
				labelRight: "Include time",
				labelWidth: 0
			},
		]
	};

	// Populate settings (when Edit field)
	dateDataField.populateSettings = function (application, data) {
		if (!data.type) return;

		$$(componentIds.includeTime).setValue(data.type == 'datetime');
		$$(componentIds.includeTime).disable();
	};

	// For save field
	dateDataField.getSettings = function () {
		var type = 'date',
			editor = 'date'
			//format = 'dateFormatStr';

		if ($$(componentIds.includeTime).getValue()) {
			type = 'datetime';
			editor = 'datetime';
			//format = 'fullDateFormatStr';
		}

		return {
			fieldName: dateDataField.name,
			type: type,
			setting: {
				icon: dateDataField.icon,
				editor: editor, // http://docs.webix.com/desktop__editing.html
				filter_type: 'date', // DataTableFilterPopup - filter type
				template:'<div class="ab-date-data-field"></div>'
				//dateformat: "M D, YYYY"
			}
		};
	};
	
	dateDataField.customDisplay = function (application, object, fieldData, rowId, data, itemNode, options) {
		
		var $container = $(itemNode).find('.ab-date-data-field');
		$container.html('');

        	var imgDiv = null; 

		 if ( !data || data == '') {
            		dateDiv = "no data";
        	} else {
            	// else display the image:

			var date = new Date(data);
			var formattedDate = moment(date).format("M D, YYYY");
	    		
			dateDiv = formattedDate;
        	}

	        // insert the image to display
        	$container.html(dateDiv);
		
		
		return true;
	};
	

	dateDataField.resetState = function () {
		$$(componentIds.includeTime).setValue(false);
		$$(componentIds.includeTime).enable();
	};

	return dateDataField;

});
