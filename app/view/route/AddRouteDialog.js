Ext.define('ExtJsTest.view.route.AddRouteDialog',{
    extend: 'Ext.window.Window',
    requires: [
        
        'ExtJsTest.view.route.AddRouteDialogController'
    ],
    xtype: 'ux-add-route-dialog',
    controller: 'add-route-dialog',
    width: 500,
    height: 400,
    modal: true,
    closable: false,
    draggable: false,
    resizable: false,
    maximizable: false,
    autoShow: true,
    layout: 'fit',
    listeners: {
    	afterrender: function(panel, eOpts) {
            var me = this;
            
            if (me.dataRec) {
                me.lookupReference('addRouteForm').loadRecord(me.dataRec);
            }

            if (me.onlyView) {
                AppUtil.makeFormReadOnly(me.lookupReference('addRouteForm'));
            }
    	}
    },
    
    initComponent: function() {
    	var me = this;
    	
    	var form = {
            jsonSubmit: true,
            xtype: 'form',
            layout: 'anchor',
            reference: 'addRouteForm',
            url: 'api/RouteController/editRoute',
            bodyPadding: 10,

            defaults: {
                anchor: '100%',
                labelAlign: 'left',
                labelWidth: 100
            },

            items: [
            {
                xtype: 'hiddenfield',
                name: 'id',
                reference: 'id'
            },{
                xtype: 'hiddenfield',
                name: 'status',
                reference: 'status'
            },{
                xtype:'combo',
                //fieldLabel:'მანქანა',
                emptyText: 'მანქანა',
                name:'carId',
                store:Ext.data.StoreManager.lookup('CarStoreId'),
                allowBlank: false,
                autoSelect:true,
                forceSelection:true,
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
                )
            },
            {
                xtype:'combo',
                //fieldLabel:'მძღოლი',
                emptyText: 'მძღოლი',
                name:'driverId',
                store:Ext.data.StoreManager.lookup('DriverStoreId'),
                allowBlank: false,
                autoSelect:true,
                forceSelection:true,
                valueField: 'id',
                tpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                                '<div class="x-boundlist-item">{firstName} {lastName}</div>',
                    '</tpl>'
                ),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                                       '{firstName} {lastName}',
                    '</tpl>'
                )
            },{
                //fieldLabel: 'მარშუტის დაწყება',
                emptyText: 'მარშუტის დაწყება',
                xtype: 'datefield',
                name: 'startTime',
                reference: 'startTime',
                allowBlank: false,
                blankText: 'აუცილებელი ველი'
            },{
                //fieldLabel: 'მარშუტის დასრულება',
                emptyText: 'მარშუტის დასრულება',
                xtype: 'datefield',
                name: 'finishTime',
                reference: 'finishTime',
                allowBlank: false,
                blankText: 'აუცილებელი ველი'
            },{
                //fieldLabel: 'მარშუტის აღწერა',
                emptyText: 'მარშუტის აღწერა',
                xtype: 'textarea',
                name: 'routeDescription',
                reference: 'routeDescription',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 1000,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            }


            ]
    	};
    	
    	form.buttons = [];
    	
    	if (!me.onlyView) {
            form.buttons.push({
                text: 'ჩაწერა',
                iconCls: 'check-icon-light',
                formBind: true,
                listeners: {
                    click: 'addRoute'
                }
            });
    	}
    	
    	form.buttons.push({
            text: 'დახურვა',
            iconCls: 'close-icon-light',
            handler: function() {
                this.up('window').close();
            }
        });
    	
    	me.items = [form];
    	
    	me.callParent();
    }
});
