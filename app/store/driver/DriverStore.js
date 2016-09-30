Ext.define('ExtJsTest.store.driver.DriverStore', {
    extend: 'Ext.data.Store',
    storeId: 'DriverStoreId',
    requires: [
        'ExtJsTest.model.driver.Driver'
    ],
    
    model: 'ExtJsTest.model.driver.Driver',
    
    proxy: {
        type: 'ajax',
        actionMethods:  { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
        url: 'api/DriverController/getDrivers',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});