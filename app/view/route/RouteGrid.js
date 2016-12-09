Ext.define('ExtJsTest.view.route.RouteGrid',{
    extend: 'Ext.grid.Panel',
    requires: [
        'ExtJsTest.view.route.RouteGridController',
        'ExtJsTest.store.route.RouteStore'
    ],

    xtype: 'route-grid',
    controller: 'route-grid',
   
    viewModel: {
        data: {
            params: {}
        }
    },

    viewConfig: {
        loadMask: true
    },

    listeners:{
        itemdblclick: function ( grid , record , item , index , e , eOpts ) {
           Ext.widget('ux-add-route-dialog', {
                title: 'მარშუტის დათვალიერება',
                dataRec: record,
                onlyView: true
            });  
        }
    },

    initComponent: function() {
        var app = ExtJsTest.getApplication();
        var me = this;
        var viewModel = me.getViewModel();
        
        me.store = Ext.create('ExtJsTest.store.route.RouteStore' ,{ 
            pageSize: 15,
            listeners: {
                beforeload: function(store, operation) {
                        var params = viewModel.get('params');

                        if (params) {
                            operation.setParams(params);    
                        }
                    }
                }
            });

        me.store.load();
        
        
        me.title = 'მარშუტები';
        me.tbar = [];
        

        if (app.user.get('role') === 'admin'){
            me.tbar.push({
                xtype: 'button',
                iconCls: 'create-icon-dark',
                //text: 'დამატება',
                tooltip: 'ახალი მარშუტის დამატება',
                listeners: {
                    click: 'addRoute'
                }           
            });
            
             me.tbar.push({
                xtype: 'button',
                iconCls: 'edit-icon-dark',
                //text: 'რედაქტირება',
                tooltip: 'არჩეული მარშუტის რედაქტირება',
                listeners: {
                    click: 'editRoute'
                }
            });
            
            me.tbar.push({
                xtype: 'button',
                iconCls: 'delete-icon-dark',
                //text: 'წაშლა',
                tooltip: 'არჩეული მარშუტის წაშლა',
                listeners: {
                    click: 'deleteRoute'
                }
            });
        }
        
        
         me.tbar.push({
            xtype:'combo',
            name:'filterCarId',
            reference: 'filterCarId',
            emptyText: 'ავტომობილი',
            store:Ext.data.StoreManager.lookup('CarStoreId'),
            allowBlank: true,
            autoSelect:true,
            forceSelection:false,
            valueField: 'id',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                            '<div class="x-boundlist-item">{carNumber} ({carModel})</div>',
                '</tpl>'
            ),
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                                   '{carNumber} ({carModel})',
                '</tpl>'
            ),
            enableKeyEvents: true,
            listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var button = me.lookupReference('searchButton');
                        button.fireEvent('click', button);
                    }
                },
                change: 'search'
            }
        });

        me.tbar.push({
                xtype: 'datefield',
                name: 'filterDate',
                reference: 'filterDate',
                allowBlank: true,
                emptyText: 'თარიღით ძებნა',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            var button = me.lookupReference('searchButton');
                            button.fireEvent('click', button);
                        }
                    },
                    change: 'search'
                }
        });

        me.tbar.push({
            xtype: 'textfield',
            name: 'filterRouteDesc',
            reference: 'filterRouteDesc',
            emptyText: 'აღწერილობა',
            enableKeyEvents: true,
            listeners: {
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        var button = me.lookupReference('searchButton');
                        button.fireEvent('click', button);
                    }
                },
                    change: 'search'
            }
            }
        );
        
        me.tbar.push({
            xtype: 'button',
            iconCls: 'replace-black-icon-dark',
            reference: 'cleanButton',
            text: 'გასუფთავება',
            listeners: {
                click: 'cleanFilters'
            }
        });


        
        me.columns = {
            items: [{
                text: 'ავტომობილის ნომერი' ,
                renderer: function(value, metaData, record) {
                    var carId = record.get('carId');
                    var carStore = Ext.data.StoreManager.lookup('CarStoreId');
                    var carRecord = carStore.getById(carId);
                    if (carRecord === null){
                        return 'წაშლილია';
                    }
                    return carRecord.get('carNumber') + ' (' + carRecord.get('carModel') + ')';
                }
            }, {
                text: 'მძღოლი' ,
                renderer: function(value, metaData, record) {
                    var driverId = record.get('driverId');
                    var driverStore = Ext.data.StoreManager.lookup('DriverStoreId');
                    var driverRecord = driverStore.getById(driverId);
                    if (driverRecord === null){
                        return 'წაშლილია';
                    }
                    return driverRecord.get('firstName') + ' ' + driverRecord.get('lastName');
                }
            }, {
                text: 'მარშუტის აღწერა' , dataIndex : 'routeDescription'
            },{
                text: 'მარშუტის დაწყება' , dataIndex : 'startTime',
                renderer: Ext.util.Format.dateRenderer('d-M-Y')
            }, {
                text: 'მარშუტის დასრულება' , dataIndex : 'finishTime',
                renderer: Ext.util.Format.dateRenderer('d-M-Y')
            },{
                xtype: 'actioncolumn',
                flex: 0,
                width: 30,
                align: 'center'
            }],
            defaults: {
                flex: 1,
                cellWrap: 'true'
            }
        };

        
        me.pagingToolbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'სულ {2} მარშუტი'
        });

        
        me.bbar = me.pagingToolbar;
        
        me.callParent();
    }
});
