Ext.define('ExtJsTest.view.car.GarageGrid',{
    extend: 'Ext.grid.Panel',
    requires: [
        //'ExtJsTest.store.car.CarStore'
    ],

    xtype: 'garage-grid',
    viewModel: {
        data: {
        }
    },

    viewConfig: {
        loadMask: true
    },
    hideHeaders: true,

    listeners:{
        itemdblclick: function ( grid , record , item , index , e , eOpts ) {
           console.log('double tapped'); 
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
        me.store = Ext.create('ExtJsTest.store.garage.GarageStore' , {storeId : 'GarageStoreId'});
        me.store.load();

        me.title = 'ავტოსადგომი';
        me.tbar = [];
        
        

        me.columns = {

            items: [{
                text: 'ნომერი' , dataIndex : 'carNumber',
                renderer: function(value, metaData, record) {
                    return record.get('carNumber') + ' (' + record.get('carModel') + ')';
                }
            }],
            /*
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
            */
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
