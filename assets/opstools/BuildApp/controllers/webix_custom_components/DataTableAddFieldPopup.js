steal(
    // List your Controller's dependencies here:
    function () {
        System.import('appdev').then(function () {
            steal.import('appdev/ad',
                'appdev/control/control').then(function () {

                    // Namespacing conventions:
                    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
                    AD.Control.extend('opstools.BuildApp.DataTableAddFieldPopup', {


                        init: function (element, options) {
                            var self = this;
                            options = AD.defaults({
                            }, options);
                            this.options = options;

                            // Call parent init
                            this._super(element, options);

                            this.data = {};
                            this.componentIds = {
                                chooseTypeMenu: 'ab-new-type-menu',
                                chooseTypeView: 'ab-new-none',

                                connectObjectIcon: 'external-link',
                                connectObjectView: 'ab-new-connectObject',
                                connectObjectList: 'ab-new-connectObject-list-item',
                                connectObjectCreateNew: 'ab-new-connectObject-create-new',
                                connectObjectIsMultipleRecords: 'ab-new-connectObject-multiple-records',

                                singleTextIcon: 'font',
                                singleTextView: 'ab-new-singleText',
                                singleTextDefault: 'ab-new-singleText-default',
                                singleSupportMultilingual: 'ab-new-singleText-support-multilingual',

                                longTextIcon: 'align-right',
                                longTextView: 'ab-new-longText',
                                longSupportMultilingual: 'ab-new-longText-support-multilingual',

                                numberIcon: 'slack',
                                numberView: 'ab-new-number',
                                numberAllowDecimal: 'ab-new-number-allow-decimal',
                                numberFormat: 'ab-new-number-format',
                                numberDefault: 'ab-new-number-default',

                                dateIcon: 'calendar',
                                dateView: 'ab-new-date',
                                dateIncludeTime: 'ab-new-date-include-time',

                                booleanIcon: 'check-square-o',
                                booleanView: 'ab-new-boolean',

                                selectListIcon: 'th-list',
                                selectListView: 'ab-new-select-list',
                                selectListOptions: 'ab-new-select-option',
                                selectListNewOption: 'ab-new-select-new',

                                attachmentIcon: 'file',
                                attachmentView: 'ab-new-attachment',

                                headerNameText: 'ab-new-field-name',

                                saveButton: 'ab-new-save-button'
                            };

                            this.initMultilingualLabels();
                            this.initWebixControls();
                        },

                        initMultilingualLabels: function () {
                            var self = this;
                            self.labels = {};
                            self.labels.common = {};
                            self.labels.add_fields = {};

                            self.labels.common.name = AD.lang.label.getLabel('ab.common.form.name') || 'Name';
                            self.labels.common.headerName = AD.lang.label.getLabel('ab.common.headerName') || 'Header name';
                            self.labels.common.ok = AD.lang.label.getLabel('ab.common.ok') || "Ok";
                            self.labels.common.cancel = AD.lang.label.getLabel('ab.common.cancel') || "Cancel";
                            self.labels.common.save = AD.lang.label.getLabel('ab.common.save') || "Save";


                            self.labels.add_fields.chooseType = AD.lang.label.getLabel('ab.add_fields.chooseType') || "Choose field type...";

                            self.labels.add_fields.connectField = AD.lang.label.getLabel('ab.add_fields.connectField') || "Connect to another record";
                            self.labels.add_fields.stringField = AD.lang.label.getLabel('ab.add_fields.stringField') || "Single line text";
                            self.labels.add_fields.textField = AD.lang.label.getLabel('ab.add_fields.textField') || "Long text";
                            self.labels.add_fields.numberField = AD.lang.label.getLabel('ab.add_fields.numberField') || "Number";
                            self.labels.add_fields.dateField = AD.lang.label.getLabel('ab.add_fields.dateField') || "Date";
                            self.labels.add_fields.booleanField = AD.lang.label.getLabel('ab.add_fields.booleanField') || "Checkbox";
                            self.labels.add_fields.listField = AD.lang.label.getLabel('ab.add_fields.listField') || "Select list";
                            self.labels.add_fields.attachmentField = AD.lang.label.getLabel('ab.add_fields.attachmentField') || "Attachment";

                            self.labels.add_fields.defaultText = AD.lang.label.getLabel('ab.add_fields.defaultText') || 'Default text';
                            self.labels.add_fields.defaultNumber = AD.lang.label.getLabel('ab.add_fields.defaultNumber') || 'Default number';

                            self.labels.add_fields.supportMultilingual = AD.lang.label.getLabel('ab.add_fields.supportMultilingual') || "Support multilingual";

                            self.labels.add_fields.connectToObject = AD.lang.label.getLabel('ab.add_fields.connectToObject') || "Connect to Object";
                            self.labels.add_fields.connectToNewObject = AD.lang.label.getLabel('ab.add_fields.connectToNewObject') || "Connect to new Object";
                            self.labels.add_fields.allowConnectMultipleValue = AD.lang.label.getLabel('ab.add_fields.allowConnectMultipleValue') || "Allow connecting to multiple records";
                            self.labels.add_fields.requireConnectedObjectTitle = AD.lang.label.getLabel('ab.add_fields.requireConnectedObjectTitle') || "Object required";
                            self.labels.add_fields.requireConnectedObjectDescription = AD.lang.label.getLabel('ab.add_fields.requireConnectedObjectDescription') || "Please select object to connect.";

                            self.labels.add_fields.textDescription = AD.lang.label.getLabel('ab.add_fields.textDescription') || "A long text field that can span multiple lines.";

                            self.labels.add_fields.format = AD.lang.label.getLabel('ab.add_fields.format') || "Format";
                            self.labels.add_fields.numberFormat = AD.lang.label.getLabel('ab.add_fields.numberFormat') || "Number";
                            self.labels.add_fields.priceFormat = AD.lang.label.getLabel('ab.add_fields.priceFormat') || "Price";
                            self.labels.add_fields.allowDecimalNumbers = AD.lang.label.getLabel('ab.add_fields.allowDecimalNumbers') || "Allow decimal numbers";

                            self.labels.add_fields.pickDate = AD.lang.label.getLabel('ab.add_fields.pickDate') || "Pick one from a calendar.";
                            self.labels.add_fields.includeTime = AD.lang.label.getLabel('ab.add_fields.includeTime') || "Include time";

                            self.labels.add_fields.booleanDescription = AD.lang.label.getLabel('ab.add_fields.booleanDescription') || "A single checkbox that can be checked or unchecked.";

                            self.labels.add_fields.listDescription = AD.lang.label.getLabel('ab.add_fields.listDescription') || "Single select allows you to select a single predefined options below from a dropdown.";
                            self.labels.add_fields.listOption = AD.lang.label.getLabel('ab.add_fields.listOption') || "Options";
                            self.labels.add_fields.listAddNewOption = AD.lang.label.getLabel('ab.add_fields.listAddNewOption') || "Add new option";
                            self.labels.add_fields.requireListOptionTitle = AD.lang.label.getLabel('ab.add_fields.requireListOptionTitle') || "Option required";
                            self.labels.add_fields.requireListOptionDescription = AD.lang.label.getLabel('ab.add_fields.requireListOptionDescription') || "Enter at least one option.";

                            self.labels.add_fields.addNewField = AD.lang.label.getLabel('ab.add_fields.addNewField') || "Add Column";

                            self.labels.add_fields.registerTableWarning = AD.lang.label.getLabel('ab.add_fields.registerTableWarning') || "Please register the datatable to add.";

                            self.labels.add_fields.duplicateFieldTitle = AD.lang.label.getLabel('ab.add_fields.duplicateFieldTitle') || "Your field name is duplicate";
                            self.labels.add_fields.duplicateFieldDescription = AD.lang.label.getLabel('ab.add_fields.duplicateFieldDescription') || "Please change your field name";

                            self.labels.add_fields.cannotUpdateFields = AD.lang.label.getLabel('ab.add_fields.cannotUpdateFields') || "Could not update columns";
                            self.labels.add_fields.waitRestructureObjects = AD.lang.label.getLabel('ab.add_fields.waitRestructureObjects') || "Please wait until restructure objects is complete";
                        },

                        initWebixControls: function () {
                            var self = this;

                            webix.protoUI({
                                name: 'add_fields_popup',
                                $init: function (config) {
                                },
                                defaults: {
                                    modal: true,
                                    ready: function () {
                                        this.resetState();
                                    },
                                    body: {
                                        width: 380,
                                        rows: [
                                            {
                                                view: "menu",
                                                id: self.componentIds.chooseTypeMenu,
                                                minWidth: 500,
                                                autowidth: true,
                                                data: [
                                                    {
                                                        value: self.labels.add_fields.chooseType,
                                                        submenu: [
                                                            { view: 'button', value: self.labels.add_fields.connectField, fieldType: 'json', icon: self.componentIds.connectObjectIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.stringField, fieldType: 'string', icon: self.componentIds.singleTextIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.textField, fieldType: 'text', icon: self.componentIds.longTextIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.numberField, fieldType: ['float', 'integer'], icon: self.componentIds.numberIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.dateField, fieldType: ['datetime', 'date'], icon: self.componentIds.dateIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.booleanField, fieldType: 'boolean', icon: self.componentIds.booleanIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.listField, fieldType: 'list', icon: self.componentIds.selectListIcon, type: 'icon' },
                                                            { view: 'button', value: self.labels.add_fields.attachmentField, fieldType: 'attachment', icon: self.componentIds.attachmentIcon, type: 'icon' },
                                                        ]
                                                    }
                                                ],
                                                on: {
                                                    onMenuItemClick: function (id) {
                                                        var base = this.getTopParentView(),
                                                            selectedMenuItem = this.getMenuItem(id),
                                                            viewName = base.getViewName(selectedMenuItem.fieldType);

                                                        if (viewName) {
                                                            $$(viewName).show();

                                                            var headerNameClass = '.' + self.componentIds.headerNameText;

                                                            // Set default header name
                                                            if ($(headerNameClass) && $(headerNameClass).length > 0) {
                                                                $(headerNameClass).each(function (index, txtName) {
                                                                    var headerName = $(txtName).webix_text().getValue();
                                                                    if (!headerName || headerName.indexOf('Field ') > -1) {
                                                                        var defaultName = base.getDefaultFieldName();
                                                                        $(txtName).webix_text().setValue(defaultName);
                                                                    }
                                                                });
                                                            }

                                                            this.getTopParentView().selectedType = selectedMenuItem.value;
                                                        }
                                                    }
                                                }
                                            },
                                            { height: 10 },
                                            {
                                                cells: [
                                                    {
                                                        id: self.componentIds.chooseTypeView,
                                                        rows: [
                                                            { view: "label", label: self.labels.add_fields.chooseType }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.connectObjectView,
                                                        rows: [
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 50 },
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.connectObjectIcon).replace('{1}', self.labels.add_fields.connectToObject) },
                                                            {
                                                                view: "list",
                                                                id: self.componentIds.connectObjectList,
                                                                select: true,
                                                                height: 180,
                                                                template: "<div class='ab-new-connectObject-list-item'>#label#</div>"
                                                            },
                                                            {
                                                                view: 'button',
                                                                id: self.componentIds.connectObjectCreateNew,
                                                                value: self.labels.add_fields.connectToNewObject,
                                                                click: function () {
                                                                    if (this.getTopParentView().createNewObjectEvent)
                                                                        this.getTopParentView().createNewObjectEvent();
                                                                }
                                                            },
                                                            {
                                                                view: "checkbox",
                                                                id: self.componentIds.connectObjectIsMultipleRecords,
                                                                labelWidth: 0,
                                                                labelRight: self.labels.add_fields.allowConnectMultipleValue,
                                                                value: false
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.singleTextView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.singleTextIcon).replace('{1}', self.labels.add_fields.stringField) },
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 50 },
                                                            { view: "text", id: self.componentIds.singleTextDefault, placeholder: self.labels.add_fields.defaultText },
                                                            { view: "checkbox", id: self.componentIds.singleSupportMultilingual, labelRight: self.labels.add_fields.supportMultilingual, labelWidth: 0, value: true }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.longTextView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.longTextIcon).replace('{1}', self.labels.add_fields.textField) },
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 50 },
                                                            { view: "label", label: self.labels.add_fields.textDescription },
                                                            { view: "checkbox", id: self.componentIds.longSupportMultilingual, labelRight: self.labels.add_fields.supportMultilingual, labelWidth: 0, value: true }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.numberView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.numberIcon).replace('{1}', self.labels.add_fields.numberField) },
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 60 },
                                                            {
                                                                view: "combo", id: self.componentIds.numberFormat, value: self.labels.add_fields.numberFormat, label: self.labels.add_fields.format, labelWidth: 60, options: [
                                                                    { format: 'numberFormat', value: self.labels.add_fields.numberFormat },
                                                                    { format: 'priceFormat', value: self.labels.add_fields.priceFormat },
                                                                ]
                                                            },
                                                            { view: "checkbox", id: self.componentIds.numberAllowDecimal, labelRight: self.labels.add_fields.allowDecimalNumbers, labelWidth: 0 },
                                                            { view: "text", id: self.componentIds.numberDefault, placeholder: self.labels.add_fields.defaultNumber }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.dateView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.dateIcon).replace('{1}', self.labels.add_fields.dateField) },
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 50 },
                                                            { view: "label", label: self.labels.add_fields.pickDate },
                                                            { view: "checkbox", id: self.componentIds.dateIncludeTime, labelRight: self.labels.add_fields.includeTime, labelWidth: 0 },
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.booleanView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.booleanIcon).replace('{1}', self.labels.add_fields.booleanField) },
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 50 },
                                                            { view: "label", label: self.labels.add_fields.booleanDescription }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.selectListView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.selectListIcon).replace('{1}', self.labels.add_fields.listField) },
                                                            { view: "text", label: self.labels.common.name, placeholder: self.labels.common.headerName, css: self.componentIds.headerNameText, labelWidth: 50 },
                                                            { view: "template", template: self.labels.add_fields.listDescription, autoheight: true, borderless: true },
                                                            { view: "label", label: "<b>{0}</b>".replace('{0}', self.labels.add_fields.listOption) },
                                                            {
                                                                view: "editlist",
                                                                id: self.componentIds.selectListOptions,
                                                                template: "<div style='position: relative;'>#label#<i class='ab-new-field-remove fa fa-remove' style='position: absolute; top: 7px; right: 7px;'></i></div>",
                                                                autoheight: true,
                                                                drag: true,
                                                                editable: true,
                                                                editor: "text",
                                                                editValue: "label",
                                                                onClick: {
                                                                    "ab-new-field-remove": function (e, id, trg) {
                                                                        // Store removed id to array
                                                                        if (!id.startsWith('temp_id')) {
                                                                            if (!self.data.removedListIds) self.data.removedListIds = [];

                                                                            self.data.removedListIds.push(id);
                                                                        }

                                                                        $$(self.componentIds.selectListOptions).remove(id);
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                view: "button", value: self.labels.add_fields.listAddNewOption, click: function () {
                                                                    var itemId = $$(self.componentIds.selectListOptions).add({ id: 'temp_id_' + webix.uid(), label: '' }, $$(self.componentIds.selectListOptions).count());
                                                                    $$(self.componentIds.selectListOptions).edit(itemId);
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        id: self.componentIds.attachmentView,
                                                        rows: [
                                                            { view: "label", label: "<span class='webix_icon fa-{0}'></span>{1}".replace('{0}', self.componentIds.attachmentIcon).replace('{1}', self.labels.add_fields.attachmentField) },
                                                            { view: "label", label: "Under construction..." }
                                                        ]
                                                    }
                                                ]
                                            },
                                            { height: 10 },
                                            {
                                                cols: [
                                                    {
                                                        view: "button", id: self.componentIds.saveButton, label: self.labels.add_fields.addNewField, type: "form", width: 120, click: function () {
                                                            var base = this.getTopParentView();
                                                            var dataTable = base.dataTable;

                                                            if (!dataTable) {
                                                                webix.message({ type: "error", text: self.labels.add_fields.registerTableWarning });
                                                                return;
                                                            }

                                                            var fieldName = '',
                                                                fieldType = '',
                                                                linkToObject = null,
                                                                isMultipleRecords = null,
                                                                options = [],
                                                                supportMultilingual = null,
                                                                fieldSettings = {};

                                                            switch (base.selectedType) {
                                                                case self.labels.add_fields.connectField:
                                                                    var linkObject = $$(self.componentIds.connectObjectList).getSelectedItem();
                                                                    if (!linkObject) {
                                                                        webix.alert({
                                                                            title: self.labels.add_fields.requireConnectedObjectTitle,
                                                                            ok: self.labels.common.ok,
                                                                            text: self.labels.add_fields.requireConnectedObjectDescription
                                                                        })
                                                                        return false;
                                                                    }

                                                                    fieldName = base.getFieldName(self.componentIds.connectObjectView);
                                                                    fieldType = 'json';
                                                                    linkToObject = linkObject.id;
                                                                    isMultipleRecords = $$(self.componentIds.connectObjectIsMultipleRecords).getValue();
                                                                    fieldSettings.icon = self.componentIds.connectObjectIcon;
                                                                    fieldSettings.editor = 'selectivity';
                                                                    fieldSettings.template = '<div class="connect-data-values"></div>';
                                                                    fieldSettings.filter_type = 'multiselect';
                                                                    break;
                                                                case self.labels.add_fields.stringField:
                                                                    fieldName = base.getFieldName(self.componentIds.singleTextView);
                                                                    fieldType = 'string';
                                                                    supportMultilingual = $$(self.componentIds.singleSupportMultilingual).getValue();
                                                                    fieldSettings.icon = self.componentIds.singleTextIcon;
                                                                    fieldSettings.editor = 'text';
                                                                    fieldSettings.filter_type = 'text';
                                                                    fieldSettings.value = $$(self.componentIds.singleTextDefault).getValue();
                                                                    break;
                                                                case self.labels.add_fields.textField:
                                                                    fieldName = base.getFieldName(self.componentIds.longTextView);
                                                                    fieldType = 'text';
                                                                    supportMultilingual = $$(self.componentIds.longSupportMultilingual).getValue();
                                                                    fieldSettings.icon = self.componentIds.longTextIcon;
                                                                    fieldSettings.editor = 'popup';
                                                                    fieldSettings.filter_type = 'text';
                                                                    break;
                                                                case self.labels.add_fields.numberField:
                                                                    fieldName = base.getFieldName(self.componentIds.numberView);

                                                                    if ($$(self.componentIds.numberAllowDecimal).getValue())
                                                                        fieldType = 'float';
                                                                    else
                                                                        fieldType = 'integer';

                                                                    fieldSettings.icon = self.componentIds.numberIcon;
                                                                    fieldSettings.editor = 'number';
                                                                    fieldSettings.filter_type = 'number';

                                                                    var selectedFormat = $$(self.componentIds.numberFormat).getList().find(function (format) {
                                                                        return format.value == $$(self.componentIds.numberFormat).getValue();
                                                                    })[0];
                                                                    fieldSettings.format = selectedFormat.format;
                                                                    fieldSettings.value = $$(self.componentIds.numberDefault).getValue();
                                                                    break;
                                                                case self.labels.add_fields.dateField:
                                                                    fieldName = base.getFieldName(self.componentIds.dateView);
                                                                    fieldSettings.icon = self.componentIds.dateIcon;

                                                                    fieldSettings.filter_type = 'date';
                                                                    if ($$(self.componentIds.dateIncludeTime).getValue()) {
                                                                        fieldType = 'datetime';
                                                                        fieldSettings.editor = 'datetime';
                                                                    }
                                                                    else {
                                                                        fieldType = 'date';
                                                                        fieldSettings.editor = 'date';
                                                                    }
                                                                    break;
                                                                case self.labels.add_fields.booleanField:
                                                                    fieldName = base.getFieldName(self.componentIds.booleanView);
                                                                    fieldType = 'boolean';
                                                                    fieldSettings.icon = self.componentIds.booleanIcon;
                                                                    // editor = 'checkbox';
                                                                    fieldSettings.filter_type = 'boolean';
                                                                    fieldSettings.template = "{common.checkbox()}";
                                                                    break;
                                                                case self.labels.add_fields.listField:
                                                                    $$(self.componentIds.selectListOptions).editStop(); // Close edit mode

                                                                    fieldName = base.getFieldName(self.componentIds.selectListView);
                                                                    fieldType = 'string';
                                                                    fieldSettings.icon = self.componentIds.selectListIcon;

                                                                    fieldSettings.filter_type = 'list';
                                                                    fieldSettings.editor = 'richselect';
                                                                    fieldSettings.filter_options = [];

                                                                    $$(self.componentIds.selectListOptions).data.each(function (opt) {
                                                                        fieldSettings.filter_options.push(opt.label);
                                                                        var optId = typeof opt.id == 'string' && opt.id.startsWith('temp_id') ? null : opt.id;
                                                                        options.push({ id: optId, value: opt.label });
                                                                    });

                                                                    // Filter value is not empty
                                                                    fieldSettings.filter_options = $.grep(fieldSettings.filter_options, function (name) { return name && name.length > 0; });
                                                                    options = $.grep(options, function (opt) { return opt && opt.value && opt.value.length > 0; });

                                                                    if (options.length < 1) {
                                                                        webix.alert({
                                                                            title: self.labels.add_fields.requireListOptionTitle,
                                                                            ok: self.labels.common.ok,
                                                                            text: self.labels.add_fields.requireListOptionDescription
                                                                        })

                                                                        return;
                                                                    }

                                                                    break;
                                                                case self.labels.add_fields.attachmentField:
                                                                    fieldName = base.getFieldName(self.componentIds.attachmentView);
                                                                    fieldSettings.icon = self.componentIds.attachmentIcon;
                                                                    alert('Under construction !!');
                                                                    return; // TODO;
                                                            }

                                                            // Validate field name
                                                            var existsColumn = $.grep(dataTable.config.columns, function (c) {
                                                                return c.id == fieldName || c.label == fieldName;
                                                            });

                                                            if (existsColumn && existsColumn.length > 0 && !self.data.editFieldId) {
                                                                webix.alert({
                                                                    title: self.labels.add_fields.duplicateFieldTitle,
                                                                    ok: self.labels.common.ok,
                                                                    text: self.labels.add_fields.duplicateFieldDescription
                                                                });
                                                                return;
                                                            }

                                                            var newFieldInfo = {
                                                                name: fieldName,
                                                                type: fieldType,
                                                                setting: fieldSettings
                                                            };

                                                            newFieldInfo.weight = dataTable.config.columns.length;

                                                            if (linkToObject != null)
                                                                newFieldInfo.linkToObject = linkToObject;

                                                            if (isMultipleRecords != null)
                                                                newFieldInfo.isMultipleRecords = isMultipleRecords;

                                                            if (options != null && options.length > 0)
                                                                newFieldInfo.options = options;

                                                            if (supportMultilingual != null)
                                                                newFieldInfo.supportMultilingual = supportMultilingual;

                                                            if (self.data.editFieldId)
                                                                newFieldInfo.id = self.data.editFieldId;

                                                            // Call callback function
                                                            if (base.saveFieldCallback && base.selectedType) {
                                                                base.saveFieldCallback(newFieldInfo, self.data.removedListIds)
                                                                    .then(function () {
                                                                        base.resetState();
                                                                        base.hide();
                                                                    });
                                                            }

                                                        }
                                                    },
                                                    {
                                                        view: "button", value: self.labels.common.cancel, width: 100, click: function () {
                                                            this.getTopParentView().resetState();
                                                            this.getTopParentView().hide();
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    on: {
                                        onBeforeShow: function () {
                                            this.resetState();
                                        },
                                        onShow: function () {
                                            if (!AD.comm.isServerReady()) {
                                                this.getTopParentView().hide();

                                                webix.alert({
                                                    title: self.labels.add_fields.cannotUpdateFields,
                                                    text: self.labels.add_fields.waitRestructureObjects,
                                                    ok: self.labels.common.ok
                                                });
                                            }
                                        },
                                        onHide: function () {
                                            this.resetState();
                                        }
                                    }
                                },

                                registerDataTable: function (dataTable) {
                                    this.dataTable = dataTable;
                                },

                                registerSaveFieldEvent: function (saveFieldCallback) {
                                    this.saveFieldCallback = saveFieldCallback;
                                },

                                registerCreateNewObjectEvent: function (createNewObjectEvent) {
                                    this.createNewObjectEvent = createNewObjectEvent;
                                },

                                editMode: function (data, fieldName) {
                                    $$(self.componentIds.chooseTypeMenu).hide();

                                    $$(self.componentIds.saveButton).define('label', self.labels.common.save);
                                    $$(self.componentIds.saveButton).refresh();

                                    self.data.editFieldId = data.id;

                                    // Check and Change type to list
                                    if (data.type === 'string' && data.setting.options && data.setting.options.length > 0) {
                                        data.type = 'list';
                                    }

                                    // Get view name
                                    var viewName = this.getViewName(data.type);

                                    // Populate data
                                    switch (data.type) {
                                        case 'json':
                                            this.selectedType = self.labels.add_fields.connectField;

                                            var selectedObject = $$(self.componentIds.connectObjectList).data.find(function (obj) { return obj.id == data.linkToObject; })[0];

                                            $$(self.componentIds.connectObjectList).disable();
                                            $$(self.componentIds.connectObjectList).select(selectedObject.id);
                                            $$(self.componentIds.connectObjectCreateNew).disable();
                                            $$(self.componentIds.connectObjectIsMultipleRecords).disable();
                                            $$(self.componentIds.connectObjectIsMultipleRecords).setValue(data.isMultipleRecords);
                                            break;
                                        case 'string':
                                            this.selectedType = self.labels.add_fields.stringField;
                                            $$(self.componentIds.singleTextDefault).setValue(data.default);
                                            $$(self.componentIds.singleSupportMultilingual).setValue(data.supportMultilingual);
                                            break;
                                        case 'text':
                                            this.selectedType = self.labels.add_fields.textField;
                                            $$(self.componentIds.longSupportMultilingual).setValue(data.supportMultilingual);
                                            break;
                                        case 'float': // Number
                                        case 'integer':
                                            this.selectedType = self.labels.add_fields.numberField;

                                            $$(self.componentIds.numberAllowDecimal).setValue(data.type == 'float');
                                            $$(self.componentIds.numberAllowDecimal).disable();

                                            var selectedFormat = $$(self.componentIds.numberFormat).getList().find(function (format) {
                                                return format.format == data.setting.format;
                                            });

                                            if (selectedFormat && selectedFormat.length > 0)
                                                $$(self.componentIds.numberFormat).setValue(selectedFormat[0].value);

                                            $$(self.componentIds.numberDefault).setValue(data.default);
                                            break;
                                        case 'datetime': // Date
                                        case 'data':
                                            this.selectedType = self.labels.add_fields.dateField;

                                            $$(self.componentIds.dateIncludeTime).setValue(data.type == 'datetime');
                                            $$(self.componentIds.dateIncludeTime).disable();
                                            break;
                                        case 'boolean':
                                            this.selectedType = self.labels.add_fields.booleanField;
                                            break;
                                        case 'list':
                                            this.selectedType = self.labels.add_fields.listField;
                                            var options = [];
                                            data.setting.options.forEach(function (opt) {
                                                options.push({ id: opt.id, label: opt.label });
                                            });
                                            $$(self.componentIds.selectListOptions).parse(options);
                                            $$(self.componentIds.selectListOptions).refresh();
                                            break;
                                    }

                                    $$(viewName).show();

                                    // Set header name
                                    $('.' + self.componentIds.headerNameText).each(function (index, txtName) {
                                        $(txtName).webix_text().setValue(fieldName);
                                    });
                                },

                                setObjectList: function (objectList) {
                                    $$(self.componentIds.connectObjectList).clearAll();
                                    $$(self.componentIds.connectObjectList).parse(objectList.attr ? objectList.attr() : objectList);
                                    $$(self.componentIds.connectObjectList).refresh();
                                },

                                resetState: function () {
                                    self.data.editFieldId = null;

                                    self.data.removedListIds = [];

                                    $$(self.componentIds.saveButton).define('label', self.labels.add_fields.addNewField);
                                    $$(self.componentIds.saveButton).refresh();
                                    $$(self.componentIds.chooseTypeView).show();
                                    $$(self.componentIds.chooseTypeMenu).show();
                                    $$(self.componentIds.connectObjectList).enable();
                                    $$(self.componentIds.connectObjectCreateNew).enable();
                                    $$(self.componentIds.connectObjectIsMultipleRecords).enable();
                                    $$(self.componentIds.selectListOptions).editCancel();
                                    $$(self.componentIds.selectListOptions).unselectAll();
                                    $$(self.componentIds.selectListOptions).clearAll();
                                    $$(self.componentIds.connectObjectList).unselectAll();
                                    $$(self.componentIds.connectObjectIsMultipleRecords).setValue(false);
                                    $$(self.componentIds.connectObjectIsMultipleRecords).refresh();
                                    $$(self.componentIds.numberFormat).setValue(self.labels.add_fields.numberFormat);
                                    $$(self.componentIds.numberAllowDecimal).setValue(false);
                                    $$(self.componentIds.numberAllowDecimal).enable();
                                    $$(self.componentIds.dateIncludeTime).setValue(false);
                                    $$(self.componentIds.dateIncludeTime).enable();
                                    $('.' + self.componentIds.headerNameText).each(function (index, txtName) {
                                        $(txtName).webix_text().setValue('');
                                    });
                                },

                                getDefaultFieldName: function () {
                                    var runningNumber = 1;

                                    if (this.dataTable)
                                        runningNumber = this.dataTable.config.columns.length;

                                    return 'Field ' + runningNumber;
                                },

                                getFieldName: function (viewName) {
                                    var fieldName = $.grep($$(viewName).getChildViews(), function (element, i) {
                                        return $(element.$view).hasClass('ab-new-field-name');
                                    });

                                    if (fieldName && fieldName.length > 0)
                                        return fieldName[0].getValue();
                                    else
                                        return '';
                                },

                                getViewName: function (fieldType) {
                                    if ($.isArray(fieldType)) fieldType = fieldType[0];

                                    switch (fieldType) {
                                        case 'json':
                                            return self.componentIds.connectObjectView;
                                        case 'string':
                                            return self.componentIds.singleTextView;
                                        case 'text':
                                            return self.componentIds.longTextView;
                                        case 'float':
                                        case 'integer':
                                            return self.componentIds.numberView;
                                        case 'datetime':
                                        case 'date':
                                            return self.componentIds.dateView;
                                        case 'boolean':
                                            return self.componentIds.booleanView;
                                        case 'list':
                                            return self.componentIds.selectListView;
                                        case 'attachment':
                                            return self.componentIds.attachmentView;
                                    }
                                }

                            }, webix.ui.popup);
                        }
                    });
                });
        });
    }
);