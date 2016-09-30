Ext.define('ExtJsTest.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'ExtJsTest.view.main.MainController',
        'ExtJsTest.view.main.MainModel',
        'ExtJsTest.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',
    plugins: 'viewport',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: 'TVRcenter Georgia'
            },
            flex: 0
        },
        //iconCls: 'fa-th-list',
        items: [{
            xtype: 'button',
            text: 'გასვლა',
            margin: '10 0',
            handler: 'onLogoutClick'
        }]
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    defaults: {
        bodyPadding: 5,
        
        listeners: {
            activate: function(tab, eOpts) {
                if(tab.tab.tabIndex === 0) {
                    var routeStore = Ext.data.StoreManager.lookup('RouteStoreId');
                    if(routeStore.needReload) {
                        routeStore.needReload = false;
                        routeStore.reload();
                        Ext.data.StoreManager.lookup('GarageStoreId').reload();
                        Ext.data.StoreManager.lookup('CarStoreId').reload();

                    }
                }
            }
        }
    },

    items: [{


        title: 'მარშუტები',
        iconCls: 'fa-road',

        layout: 'border',
        bodyBorder: true,
        defaults: {
            collapsible: false,
            split: true,
            layout: 'fit'
        },
        items: [{
            region:'east',
            floatable: false,
            width: 250,
            minWidth: 100,
            maxWidth: 400,
            items:[{xtype: 'garage-grid', flex:1}]

        },{
            collapsible: false,
            region: 'center',
            items:[{xtype: 'route-grid', flex:1}]
        }]
        /*
        layout: {
            type: 'hbox',
            pack: 'start',
            align: 'stretch'
        },
        items: [
            {xtype: 'route-grid', flex:1}
        ]
        */
        
    }, {
        layout: 'fit',
        title: 'მძღოლები',
        iconCls: 'fa-user',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'driver-grid'
        }]
    }, {
        layout: 'fit',
        title: 'ავტომობილები',
        iconCls: 'fa-automobile',
        items: [{
            xtype: 'car-grid'
        }]
    }]
});