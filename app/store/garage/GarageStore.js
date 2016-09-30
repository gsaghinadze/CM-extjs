Ext.define('ExtJsTest.store.garage.GarageStore', {
    extend: 'Ext.data.Store',
    requires: [
        'ExtJsTest.model.car.Car'
    ],
    
    model: 'ExtJsTest.model.car.Car',
    
    proxy: {
        type: 'ajax',
        actionMethods:  { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
        url: 'api/CarController/getGarageCars',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});