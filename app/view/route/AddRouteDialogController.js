Ext.define('ExtJsTest.view.route.AddRouteDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.add-route-dialog',
    addRoute: function() {
    	var me = this;
        var form = me.lookupReference('addRouteForm').getForm();
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
	                	Ext.ComponentQuery.query('route-grid')[0].store.reload();
	                	Ext.ComponentQuery.query('garage-grid')[0].store.reload();
	                	win.close();
	                }
	            });
			}
		});
    }
});
