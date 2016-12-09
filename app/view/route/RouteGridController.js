Ext.define('ExtJsTest.view.route.RouteGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.route-grid',

    
    
    addRoute: function() {
    	var grid = this.getView();

    	Ext.widget('ux-add-route-dialog', {
            title: 'მარშუტის დამატება',
            createNew: true
        });
        
        
    },
    
    editRoute: function() {
        var grid = this.getView();
        var rec = grid.getSelection()[0];
        
        if (!rec) {
            return;
        }


        Ext.widget('ux-add-route-dialog', {
            title: 'მარშუტის რედაქტირება',
            dataRec: rec
        });
        
    },
    
    deleteRoute: function() {
        
        var grid = this.getView();
        var rec = grid.getSelection()[0];
        
        if (!rec) {
            return;
        }
        
        AppUtil.confirm('დარწმუნებული ხართ რომ გსურთ მარშუტის წაშლა?', function(btn) {
            if (btn === 'yes') {
                Ext.Ajax.request({
                    url: 'api/RouteController/removeRoute',
                    params: {
                        id: rec.get('id')
                    },
                    success: function () {
                        grid.store.reload();
                        Ext.ComponentQuery.query('garage-grid')[0].store.reload();
                    }
                });
            }
        });
        
        
    },

    search: function(){
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();

        var descValue = me.lookupReference('filterRouteDesc').getValue();
        var carComboValue = me.lookupReference('filterCarId').getValue();
        var filterDateValue = me.lookupReference('filterDate').getValue();
        var params = {
            'filterRouteDesc': descValue , 
            'filterCarId' : carComboValue , 
            'filterDate' : filterDateValue
        };
        viewModel.set('params', params);
        view.getStore().loadPage(1);
    },

    cleanFilters: function(){
        var me = this;
        var view = me.getView();
        var viewModel = me.getViewModel();

        me.lookupReference('filterRouteDesc').setValue('');
        me.lookupReference('filterCarId').clearValue();
        me.lookupReference('filterDate').setValue('');
        
    }

    
});