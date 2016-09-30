Ext.define('ExtJsTest.view.car.AddCarDialog',{
    extend: 'Ext.window.Window',
    requires: [
        
        'ExtJsTest.view.car.AddCarDialogController'
    ],
    xtype: 'ux-add-car-dialog',
    controller: 'add-car-dialog',
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
                me.lookupReference('addCarForm').loadRecord(me.dataRec);
            }

            if (me.onlyView) {
                AppUtil.makeFormReadOnly(me.lookupReference('addCarForm'));
            }
    	}
    },
    
    initComponent: function() {
    	var me = this;
    	
    	var form = {
            jsonSubmit: true,
            xtype: 'form',
            layout: 'anchor',
            reference: 'addCarForm',
            url: 'api/CarController/editCar',
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
                //fieldLabel: 'მანქანის ნომერი',
                emptyText: 'მანქანის ნომერი',
                xtype: 'textfield',
                name: 'carNumber',
                reference: 'carNumber',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            },{
                //fieldLabel: 'მანქანის მოდელი',
                emptyText: 'მანქანის მოდელი',
                xtype: 'textfield',
                name: 'carModel',
                reference: 'carModel',
                allowBlank: false,
                blankText: 'აუცილებელი ველი',
                maxLength: 100,
                maxLengthText: 'შეყვანილი ტექტის ზომა აღემატება დასაშვებს'
            },{
                //fieldLabel: 'გამოშვების წელი',
                emptyText: 'გამოშვების წელი',
                xtype: 'textfield',
                name: 'dateIssued',
                reference: 'dateIssued',
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
                    click: 'addCar'
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
