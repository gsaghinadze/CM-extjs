Ext.define('ExtJsTest.view.driver.AddDriverDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.add-driver-dialog',
    addDriver: function() {
        var me = this;
        var form = me.lookupReference('addDriverForm').getForm();
        var win = me.getView();
        
        AppUtil.confirm('დარწმუნებული ხართ რომ გსურთ ოპერაციის დასრულება?', function(btn) {
            if (btn === 'yes') {
                form.submit({
                    submitEmptyText: false,
                    success: function() {
                        Ext.ComponentQuery.query('driver-grid')[0].store.reload();
                        Ext.data.StoreManager.lookup('RouteStoreId').needReload = true;
                        win.close();
                    }
                });
            }
        });
        
    }
});
