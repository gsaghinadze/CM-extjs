Ext.define('ExtJsTest.view.driver.DriverGrid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'ExtJsTest.view.driver.DriverGridController',
        'ExtJsTest.store.driver.DriverStore'
    ],
    xtype: 'driver-grid',
    controller: 'driver-grid',
   
    viewModel: {
        data: {
        }
    },

    viewConfig: {
        loadMask: true
    },

    listeners:{
        itemdblclick: function ( grid , record , item , index , e , eOpts ) {
           Ext.widget('ux-add-driver-dialog', {
                title: 'მძღოლის დათვალიერება',
                dataRec: record,
                onlyView: true
            });  
        }
    },

    initComponent: function() {
        var app = ExtJsTest.getApplication();
        var me = this;
        
        /*
        me.store = Ext.create('ExtJsTest.store.driver.DriverStore');
        me.store.loadData(app.drivers);
        */

        me.store = Ext.data.StoreManager.lookup('DriverStoreId');
        
        me.title = 'მძღოლები';
        me.tbar = [];
        
        if (app.user.get('role') === 'admin'){
            me.tbar.push({
                xtype: 'button',
                iconCls: 'create-icon-dark',
                //text: 'დამატება',
                tooltip: 'ახალი მძღოლის დამატება',
                listeners: {
                    click: 'addDriver'
                }           
            });
            
             me.tbar.push({
                xtype: 'button',
                iconCls: 'edit-icon-dark',
                //text: 'რედაქტირება',
                tooltip: 'არჩეული მძღოლის რედაქტირება',
                listeners: {
                    click: 'editDriver'
                }
            });
            
            me.tbar.push({
                xtype: 'button',
                iconCls: 'delete-icon-dark',
                //text: 'წაშლა',
                tooltip: 'არჩეული მძღოლის წაშლა',
                listeners: {
                    click: 'deleteDriver'
                }
            });
        }
        
        me.columns = {
            items: [{
                text: 'სახელი' , dataIndex : 'firstName'
            }, {
                text: 'გვარი' , dataIndex : 'lastName'
            },{
                text: 'პირადი ნომერი' , dataIndex : 'pid'
            },{
                text: 'მისამართი' , dataIndex : 'address'
            }, {
                text: 'ტელეფონი' , dataIndex : 'phone'
            }, {
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

        me.callParent();
    }
});
