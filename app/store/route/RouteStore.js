Ext.define('ExtJsTest.store.route.RouteStore', {
    extend: 'Ext.data.Store',
    storeId: 'RouteStoreId',
    requires: [
        'ExtJsTest.model.route.Route'
    ],
    
    model: 'ExtJsTest.model.route.Route',
    
    proxy: {
        type: 'ajax',
        actionMethods:  { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
        url: 'api/RouteController/getRoutes',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'totalCount'
        }/*,
        extraParams: {
            'routeDescription': 'რ'
        }
        */
    }
});