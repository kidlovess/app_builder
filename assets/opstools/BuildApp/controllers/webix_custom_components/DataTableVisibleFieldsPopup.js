steal(
    // List your Controller's dependencies here:
    function () {
        System.import('appdev').then(function () {
            steal.import('appdev/ad',
                'appdev/control/control').then(function () {

                    // Namespacing conventions:
                    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
                    AD.Control.extend('opstools.BuildApp.DataTableVisibleFieldsPopup', {


                        init: function (element, options) {
                            var self = this;
                            options = AD.defaults({
                            }, options);
                            this.options = options;

                            // Call parent init
                            this._super(element, options);

                            this.componentIds = {
                                fieldsList: 'ab-visible-fields-list'
                            };

                            this.initWebixControls();
                        },

                        initWebixControls: function () {
                            var self = this;

                            webix.protoUI({
                                name: "visible_fields_popup",
                                $init: function (config) {
                                },
                                defaults: {
                                    body: {
                                        rows: [
                                            {
                                                cols: [
                                                    {
                                                        view: 'button',
                                                        value: 'Show all',
                                                        click: function () {
                                                            $$(self.componentIds.fieldsList).data.each(function (d) {
                                                                self.dataTable.showColumn(d.id);
                                                            });
                                                        }
                                                    },
                                                    {
                                                        view: 'button',
                                                        value: 'Hide all',
                                                        click: function () {
                                                            var columns = [];

                                                            self.dataTable.config.columns.forEach(function (c) {
                                                                columns.push(c.id);
                                                            });

                                                            for (key in columns) {
                                                                self.dataTable.hideColumn(columns[key]);
                                                            }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                view: 'list',
                                                id: self.componentIds.fieldsList,
                                                autoheight: true,
                                                select: false,
                                                template: '<span style="min-width: 18px; display: inline-block;"><i class="fa fa-circle ab-visible-field-icon"></i>&nbsp;</span> #value#',
                                                on: {
                                                    onItemClick: function (id, e, node) {
                                                        var item = this.getItem(id),
                                                            dataTable = self.dataTable;

                                                        if (dataTable.isColumnVisible(id))
                                                            dataTable.hideColumn(id);
                                                        else
                                                            dataTable.showColumn(id);

                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    on: {
                                        onShow: function () {
                                            // Initial show/hide icon
                                            $('.ab-visible-field-icon').hide();

                                            for (key in self.dataTable.config.columns) {
                                                var c = self.dataTable.config.columns[key];
                                                $($$(self.componentIds.fieldsList).getItemNode(c.id)).find('.ab-visible-field-icon').show();
                                            };
                                        }
                                    }
                                },
                                registerDataTable: function (dataTable) {
                                    self.dataTable = dataTable;
                                    $$(self.componentIds.fieldsList).clearAll();
                                    $$(self.componentIds.fieldsList).parse(this.getFieldList());
                                },
                                getFieldList: function () {
                                    var fieldList = [];

                                    self.dataTable.eachColumn(function (id) {
                                        var columnConfig = self.dataTable.getColumnConfig(id);

                                        fieldList.push({
                                            id: id,
                                            value: $(columnConfig.header[0].text).text().trim()
                                        });
                                    });

                                    return fieldList;
                                },

                                showField: function (id) {
                                    $($$(self.componentIds.fieldsList).getItemNode(id)).find('.ab-visible-field-icon').show();
                                },

                                hideField: function (id) {
                                    $($$(self.componentIds.fieldsList).getItemNode(id)).find('.ab-visible-field-icon').hide();
                                }

                            }, webix.ui.popup);

                        },

                    });
                });
        });
    }
);