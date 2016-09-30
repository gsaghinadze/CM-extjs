Ext.define('ExtJsTest.view.driver.AddDriverDialog',{
    extend: 'Ext.window.Window',
    requires: [
        
        'ExtJsTest.view.driver.AddDriverDialogController'
    ],
    xtype: 'ux-add-driver-dialog',
    controller: 'add-driver-dialog',
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
                me.lookupReference('addDriverForm').loadRecord(me.dataRec);
            }

            if (me.onlyView) {
                AppUtil.makeFormReadOnly(me.lookupReference('addDriverForm'));
            }
    	}
    },
    
    initComponent: function() {
    	var me = this;
    	
    	var form = {
            jsonSubmit: true,
            xtype: 'form',
            layout: 'anchor',
            reference: 'addDriverForm',
            url: 'api/DriverController/editDriver',
            bodyPadding: 10,

            defaults: {
                anchor: '100%',
                labelAlign: 'left',
                labelWidth: 100
            },

            items: [{
                xtype: 'hiddenfield',
                name: 'id',
                reference: 'id'
            }, {
                xtype: 'hiddenfield',
                name: 'status',
                reference: 'status'
            },{
                //fieldLabel: 'სახელი',
                emptyText: 'სახელი',
                xtype: 'textfield',
                name: 'firstName',
                reference: 'firstName',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            },{
                //fieldLabel: 'გვარი',
                emptyText: 'გვარი',
                xtype: 'textfield',
                name: 'lastName',
                reference: 'lastName',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            },{
                //fieldLabel: 'პირადი ნომერი',
                emptyText: 'პირადი ნომერი',
                xtype: 'textfield',
                name: 'pid',
                reference: 'pid',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            },{
                //fieldLabel: 'მისამართი',
                emptyText: 'მისამართი',
                xtype: 'textfield',
                name: 'address',
                reference: 'address',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            },{
                //fieldLabel: 'ტელეფონი',
                emptyText: 'ტელეფონი',
                xtype: 'textfield',
                name: 'phone',
                reference: 'phone',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
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
                    click: 'addDriver'
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
