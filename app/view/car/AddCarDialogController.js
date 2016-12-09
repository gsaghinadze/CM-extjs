Ext.define('ExtJsTest.view.car.AddCarDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.add-car-dialog',
    addCar: function() {
    	var me = this;
        var form = me.lookupReference('addCarForm').getForm();
        var win = me.getView();
        
        AppUtil.confirm('დარწმუნებული ხართ რომ გსურთ ოპერაციის დასრულება?', function(btn) {
			if (btn === 'yes') {
				form.submit({
					waitMsg: {
					   xtype:'loadmask',
					   message:'ინფორმაცია იგზავნება...'
					 },
	                submitEmptyText: false,
	                success: function() {
	                	Ext.ComponentQuery.query('car-grid')[0].store.reload();
	                	Ext.data.StoreManager.lookup('RouteStoreId').needReload = true;
	                	win.close();
	                }
	            });
			}
		});
		
    }
});
