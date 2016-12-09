Ext.define('ExtJsTest.view.car.CarGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.car-grid',
    
    addCar: function() {

    	var grid = this.getView();

    	Ext.widget('ux-add-car-dialog', {
            title: 'ავტომობილის დამატება',
            createNew: true
        });
        
    },
    
    editCar: function() {
        var grid = this.getView();
        var rec = grid.getSelection()[0];

        window.ttt = rec;
        window.ttt1 = grid;
        
        if (!rec) {
            return;
        }


        Ext.widget('ux-add-car-dialog', {
            title: 'ავტომობილის რედაქტირება',
            dataRec: rec
        });
        
    },
    
    deleteCar: function() {
        
        var grid = this.getView();
        var rec = grid.getSelection()[0];
        
        if (!rec) {
            return;
        }
        
        AppUtil.confirm('დარწმუნებული ხართ რომ გსურთ მომხმარებლის წაშლა?', function(btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'api/CarController/removeCar',
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