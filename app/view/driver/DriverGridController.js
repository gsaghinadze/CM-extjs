Ext.define('ExtJsTest.view.driver.DriverGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.driver-grid',
    
    addDriver: function() {
        var grid = this.getView();

        Ext.widget('ux-add-driver-dialog', {
            title: 'მანქანის დამატება',
            createNew: true
        });
        
    },
    
    editDriver: function() {
        console.log('driverGridController editdriver function is called');
        var grid = this.getView();
        var rec = grid.getSelection()[0];
        
        if (!rec) {
            return;
        }
        console.log(rec);

        Ext.widget('ux-add-driver-dialog', {
            title: 'მომხმარებლის რედაქტირება',
            dataRec: rec
        });
        
    },
    
    deleteDriver: function() {
        
        var grid = this.getView();
        var rec = grid.getSelection()[0];
        
        if (!rec) {
            return;
        }
        
        AppUtil.confirm('დარწმუნებული ხართ რომ გსურთ მომხმარებლის წაშლა?', function(btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'api/DriverController/removeDriver',
                    params: {
                        id: rec.get('id')
                    },
                    success: function () {
                        grid.store.reload();
                        Ext.data.StoreManager.lookup('RouteStoreId').needReload = true;
                    }
                });
            }
        });
        
    }
    
    
});