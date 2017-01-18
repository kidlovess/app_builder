
steal(
	// List your Controller's dependencies here:
	'opstools/BuildApp/controllers/utils/DataHelper.js',
	'opstools/BuildApp/controllers/utils/ModelCreator.js',

	function (dataHelper, modelCreator) {
		System.import('appdev').then(function () {
			System.import('opstools/BuildApp').then(function () {
				steal.import('appdev/ad',
					'appdev/control/control',
					'opstools/BuildApp/models/ABApplication'
				).then(function () {

					// Namespacing conventions:
					// AD.Control.extend('[application].[controller]', [{ static },] {instance} );
					AD.Control.extend('opstools.BuildApp.ABLiveTool', {

						init: function (element, options) {
							var self = this;

							options = AD.defaults({
								app: -1,
								page: -1
							}, options);
							self.options = options;

							// Call parent init
							self._super(element, options);

							// Validate
							if (options.app == null || options.app < 0) {
								self.invalidApp();
								return;
							}

							if (options.page == null || options.page < 0) {
								self.invalidPage();
								return;
							}

							self.containerDomID = self.unique('ab_live_tool', self.options.app, self.options.page);

							self.initDOM();
							self.initModels();

							self.getData().then(function () {

								self.initEvents();

								// Store the root page
								self.rootPage = self.data.pages.filter(function (page) { return page.id == self.options.page })[0];

								self.renderPageContainer();

								webix.ready(function () {
									self.showPage();
								});
							});
						},

						invalidApp: function () {
							AD.error.log('Application id is invalid.');
						},

						invalidPage: function () {
							AD.error.log('Page id is invalid.');
						},

						initDOM: function () {
							console.log('... creating ABLiveTool <div> ');
							this.element.html('<div id="#domID#"></div>'.replace('#domID#', this.containerDomID));
						},

						initModels: function () {
							this.Models = {};
							this.Models.ABApplication = AD.Model.get('opstools.BuildApp.ABApplication');
						},

						getData: function () {
							var self = this,
								q = $.Deferred();

							self.data = {};
							async.series([
								// Get application data
								function (next) {
									self.Models.ABApplication.findOne({ id: self.options.app })
										.then(function (result) {
											self.data.application = result;

											next();
										}, next);
								},
								// Get objects data
								function (next) {
									self.data.application.getObjects()
										.then(function (result) {
											result.forEach(function (page) {
												if (page.translate) page.translate();
											});

											self.data.application.objects = result;

											next();
										}, next);
								},
								// Get pages data
								function (next) {
									self.data.application.getPages({
										or: [
											{ id: self.options.page },
											{ parent: self.options.page }
										]
									}).then(function (result) {
										result.forEach(function (page) {
											if (page.translate) page.translate();

											page.attr('domID', self.unique('ab_live_page', self.options.app, page.id));
										});

										self.data.pages = result;

										next();
									}, next);
								}
							], function (err) {
								if (err) q.reject(err);
								else q.resolve();
							});

							return q;
						},

						initEvents: function () {
							var self = this;

							AD.comm.hub.subscribe('ab.interface.add', function (msg, data) {
								if (data.app == self.options.app
									&& (data.page == self.options.page || data.parent == self.options.page)) {

									// Get the new page data
									self.data.application.getPage(data.page)
										.then(function (newPage) {
											if (newPage.translate) newPage.translate();

											newPage.attr('domID', self.unique('ab_live_page', self.options.app, newPage.id));

											var exists = false;

											self.data.pages.forEach(function (page, index) {
												// Update exists page
												if (page.id == data.page) {
													self.data.pages.attr(index, newPage.attr());
													exists = true;
												}
											});

											// Add new page to list
											if (!exists) self.data.pages.push(newPage);

											// Render the new page
											self.renderPage(newPage);

											// Set root page
											if (data.page == self.options.page) {
												self.rootPage = newPage;

												// Refresh components of root page
												if (self.activePage && data.page == self.activePage.id)
													self.showPage(newPage.attr());
											}
										});
								}
							});


							AD.comm.hub.subscribe('ab.interface.update', function (msg, data) {

								var page = self.data.pages.filter(function (p) { return p.id == data.page });

								if ((data.app == self.options.app) && (page.length > 0)) {

									// Get the new page data
									self.data.application.getPage(data.page)
										.then(function (updatePage) {
											if (updatePage.translate) updatePage.translate();

											updatePage.attr('domID', self.unique('ab_live_page', self.options.app, updatePage.id));

											// Update page in list
											self.data.pages.forEach(function (page, index) {
												if (page.id == updatePage.id)
													self.data.pages.attr(index, updatePage.attr());
											});

											// rebuild our display
											self.renderPage(updatePage);

											// Update the active page
											if (self.activePage.id == updatePage.id)
												self.activePage = updatePage;

											// Refresh components
											self.showPage(self.activePage);

										});
								}
							});


							AD.comm.hub.subscribe('ab.interface.remove', function (msg, data) {

								if ((data.app == self.options.app) && (self.data.pages.filter(function (p) { return p.id == data.page }).length > 0)) {

									// If the deleted page is showing, then switch to previous page.
									if (self.activePage && self.activePage.id == data.page && self.previousPage)
										self.showPage(self.previousPage);

									self.data.pages.slice(0).forEach(function (page, index) {
										if (data.page != page.id) return;

										// Remove sub-page
										if ($$(page.domID)) {
											// View type
											if ($$(self.containerDomID).getChildViews().filter(function (view) { return view.config.id == page.domID }).length > 0) {
												$$(self.containerDomID).removeView(page.domID);
											}
											// Popup type
											else {
												$$(page.domID).destructor();
											}
										}

										// Remove from self.data.pages
										self.data.pages.splice(index, 1);

										// TODO: Update menu and link components
									});


								}
							});

							AD.comm.hub.subscribe('opsportal.tool.show', function (message, data) {
								self.resize(self.height);
							});

							AD.comm.hub.subscribe('opsportal.resize', function (message, data) {
								self.height = data.height;
								self.resize(data.height);
							});

						},

						renderPageContainer: function () {
							var self = this,
								pages = self.data.pages;

							// Clear UI content
							if ($$(self.rootPage.domID))
								webix.ui({}, $$(self.rootPage.domID));

							// Create sub pages
							webix.ui({
								view: "multiview",
								container: self.containerDomID,
								css: "ab-main-container ab-generated-page",
								id: self.containerDomID,
								cells: [{}],
								on: {
									onViewChange: function (prevId, nextId) {
										self.resize();
									}
								}
							});

							// Sort pages
							if (pages.sort) {
								pages.sort(function (a, b) {
									if (a.parent)
										return 1;
									else if (b.parent)
										return -1;
									else
										return a.weight - b.weight;
								});
							}

							// Render pages
							pages.forEach(function (page) {
								self.renderPage(page);
							});

						},

						renderPage: function (page) {
							var self = this;

							switch (page.type) {
								case 'modal':
									var popupTemplate = {
										view: "window",
										id: page.domID,
										modal: true,
										position: "center",
										resize: true,
										width: 700,
										height: 450,
										css: 'ab-main-container',
										head: {
											view: "toolbar",
											cols: [
												{ view: "label", label: page.label },
												{
													view: "button", label: "Close", width: 100, align: "right",
													click: function () {
														if (self.previousPage.type === 'modal')
															self.showPage();
														else
															self.showPage(self.previousPage);
													}
												}
											]
										},
										body: {
											scroll: true,
											template: page.getItemTemplate()
										}
									};

									if ($$(page.domID)) {
										// Destroy old popup
										if ($$(page.domID).config.view == 'window') {
											$$(page.domID).destructor();
										}
										// Change page type (Page -> Popup)
										else if ($$(self.containerDomID)) {
											$$(self.containerDomID).removeView(page.domID);
										}
									}

									// Create popup
									webix.ui(popupTemplate).hide();

									break;
								case 'tab':
									// don't render tabs.  The component will do that.

									// refresh tab view when update
									var parentPage = self.data.pages.filter(function (p) { return p.id == page.parent.id })[0];
									if (parentPage == null) break;

									parentPage.components.forEach(function (com) {
										if (parentPage.comInstances == null ||
											parentPage.comInstances[com.id] == null ||
											com.component !== 'tab' ||
											com.setting.tabs == null ||
											com.setting.tabs.filter(function (t) { return t.uuid == page.name; }).length < 1)
											return;

										var tabViewId = self.unique('ab_live_item', parentPage.id, com.id);
										if ($$(tabViewId) == null) return;

										// Get index of selected tab view
										var selectedIndex = $$(tabViewId).getTabbar().optionIndex($$(tabViewId).getValue());

										// force a refresh on component
										parentPage.comInstances[com.id] = null;

										// Rerender the tab component
										parentPage.renderComponent(self.data.application, com)
											.done(function () {
												var selectedTabView = $$(tabViewId).getTabbar().config.options[selectedIndex];

												// Switch to selected tab
												$$(tabViewId).setValue(selectedTabView.id);
											});
									});
									break;
								case 'page':
								default:
									var pageTemplate = {
										view: "template",
										id: page.domID,
										template: page.getItemTemplate(),
										minWidth: 700,
										autoheight: true,
										scroll: true
									};

									if ($$(page.domID)) {
										// Change page type (Popup -> Page)
										if ($$(page.domID).config.view == 'window') {
											$$(page.domID).destructor();

											$$(self.containerDomID).addView(pageTemplate);
										}
										// Rebuild
										else {
											webix.ui(pageTemplate, $$(page.domID));
										}
									}
									// Add to multi-view
									else if ($$(self.containerDomID))
										$$(self.containerDomID).addView(pageTemplate);
							}
						},

						/**
						* @param ABPage page
						*      Optional page. Default is to show
						*      the root page.
						*/
						showPage: function (page) {
							var self = this;

							page = page || self.rootPage;

							// Hide page popup
							if (self.activePage && $$(self.activePage.domID).hide)
								$$(self.activePage.domID).hide();

							$$(page.domID).show();
							self.previousPage = self.activePage;
							self.activePage = page;

							self.activePage.components.forEach(function (item) {

								self.activePage.renderComponent(self.data.application, item).done(function (isNew) {
									self.bindComponentEvents(page.comInstances[item.id], item);
									self.bindComponentEventsInTab(item);
								});

							});

							self.resize();
						},

						bindComponentEvents: function (comInstance, itemInfo) {
							var self = this;

							// Listen component events
							$(comInstance).on('renderComplete', function (event, data) {
								$$(self.rootPage.domID).adjust();
								$$(itemInfo.domID).adjust();
							});

							$(comInstance).on('changePage', function (event, data) {
								// Redirect to another page
								if (data.previousPage)
									self.showPage(self.previousPage);
								else if (self.activePage.id != data.pageId && data.pageId) {

									var redirectPage = self.data.pages.filter(function (p) { return p.id == data.pageId; });

									if (redirectPage && redirectPage.length > 0)
										self.showPage(redirectPage[0]);
								}
							});

							if (itemInfo.component === 'tab') {
								$(comInstance).on('changeTab', function (event, data) {
									self.bindComponentEventsInTab(itemInfo);
								});
							}
						},

						bindComponentEventsInTab: function (item) {
							var self = this;

							// Bind events of components in tab
							if (item.component == 'tab' && item.setting && item.setting.tabs) {
								item.setting.tabs.forEach(function (tab) {
									var tabPage = self.data.pages.filter(function (p) { return p.name == tab.uuid; })[0];

									if (tabPage == null || tabPage.components == null || tabPage.comInstances == null) return;

									tabPage.components.forEach(function (itemInTab) {
										self.bindComponentEvents(tabPage.comInstances[itemInTab.id], itemInTab);
									});

								});
							}
						},

						resize: function (height) {

							// NOTE: resize() calls from the OpsPortal OPView element 
							// .resize({ height:value });
							if (height) height = height.height || height;

							if (!$$(this.rootPage.domID) || !$(this.element).is(":visible")) return;

							var width = this.element.width();
							if (!width) {
								this.element.parents().each(function (index, elm) {
									if ($(elm).width() > width)
										width = $(elm).width();
								});
							}

							if (height == null) height = self.height;

							if (width > 0)
								$$(this.rootPage.domID).define('width', width);

							if (height > 0)
								$$(this.rootPage.domID).define('height', height);

							$$(this.rootPage.domID).adjust();
							$$(this.activePage.domID).adjust();

							// Resize components
							if (this.activePage && this.activePage.comInstances) {
								for (var key in this.activePage.comInstances) {
									if (this.activePage.comInstances[key].resize)
										this.activePage.comInstances[key].resize(width, height);
								}
							}
						},

						unique: function () {
							var args = Array.prototype.slice.call(arguments); // Convert to Array
							return args.join('_');
						}

					}); // end AD.Control.extend
				}); // end steal.import
			});

		}); // end System.import
	}
); // end steal