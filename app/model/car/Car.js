Ext.define('ExtJsTest.model.car.Car', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    
    fields: [{ 
        name: 'id', type: 'auto'
    },{ 
        name: 'carNumber', type: 'auto'
    }, {
        name: 'carModel', type: 'auto'
    }, { 
        name: 'dateIssued', type: 'auto'
    }, { 
        name: 'status', type: 'auto'
    }]

});