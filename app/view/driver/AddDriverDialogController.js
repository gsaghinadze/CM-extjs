Ext.define('ExtJsTest.view.driver.AddDriverDialogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.add-driver-dialog',
    addDriver: function() {
        var me = this;
        var form = me.lookupReference('addDriverForm').getForm();
        var win = me.getView();
        
        AppUtil.confirm('დარწმუნებული ხართ რომ გსურთ ოპერაციის დასრულება?', function(btn) {
            if (btn === 'yes') {
                console.log((new Date()) + '  starting to call form');
                form.submit({
                    waitMsg: {
                       xtype:'loadmask',
                       message:'ინფორმაცია იგზავნება...'
                     },
                    submitEmptyText: false,
                    success: function() {
                        console.log((new Date()) + '  success function');
                        Ext.ComponentQuery.query('driver-grid')[0].store.reload();
                        console.log((new Date()) + '  driver grid reloaded');
                        Ext.data.StoreManager.lookup('RouteStoreId').needReload = true;
                        console.log((new Date()) + '  route grid reloaded');
                        win.close();
                        console.log((new Date()) + '  window closed');
                    }
                });
            }
        });
        
    }
});
