Ext.define('ExtJsTest.view.car.CarGrid',{
    extend: 'Ext.grid.Panel',
    requires: [
        'ExtJsTest.view.car.CarGridController',
        'ExtJsTest.store.car.CarStore'
    ],

    xtype: 'car-grid',
    controller: 'car-grid',
   
    viewModel: {
        data: {
        }
    },

    viewConfig: {
        loadMask: true
    },

    listeners:{
        itemdblclick: function ( grid , record , item , index , e , eOpts ) {
           Ext.widget('ux-add-car-dialog', {
                title: 'ავტომობილის დათვალიერება',
                dataRec: record,
                onlyView: true
            });  
        }
    },

    initComponent: function() {
        var app = ExtJsTest.getApplication();
        var me = this;
        /*
        me.store = Ext.create('ExtJsTest.store.car.CarStore');
        me.store.load();
        */
        //console.log(app.cars);
        me.store = Ext.data.StoreManager.lookup('CarStoreId');
        
        me.title = 'ავტომობილები';
        me.tbar = [];
        
        if (app.user.get('role') === 'admin'){
            me.tbar.push({
                xtype: 'button',
                iconCls: 'create-icon-dark',
                //text: 'დამატება',
                tooltip: 'ახალი ავტომობილის დამატება',
                listeners: {
                    click: 'addCar'
                }           
            });
            
             me.tbar.push({
                xtype: 'button',
                iconCls: 'edit-icon-dark',
                //text: 'რედაქტირება',
                tooltip: 'არჩეული ავტომობილის რედაქტირება',
                listeners: {
                    click: 'editCar'
                }
            });
            
            me.tbar.push({
                xtype: 'button',
                iconCls: 'delete-icon-dark',
                //text: 'წაშლა',
                tooltip: 'არჩეული ავტომობილის წაშლა',
                listeners: {
                    click: 'deleteCar'
                }
            });
        }
        me.columns = {
            items: [{
                text: 'ნომერი' , dataIndex : 'carNumber'
            }, {
                text: 'მარკა' , dataIndex : 'carModel'
            }, {
                text: 'გამოშვების წელი' , dataIndex : 'dateIssued'
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

        /*
        me.pagingToolbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'სულ {2} ავტომობილი'
        });

        
        me.bbar = me.pagingToolbar;
        */
        me.callParent();
    }
});
