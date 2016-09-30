Ext.define('ExtJsTest.model.driver.Driver', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    
    fields: [{ 
        name: 'id', type: 'auto'
    },{ 
        name: 'firstName', type: 'auto'
    },{ 
        name: 'lastName', type: 'auto'
    },{ 
        name: 'pid', type: 'auto'
    }, {
        name: 'address', type: 'auto'
    }, { 
        name: 'phone', type: 'auto'
    }, { 
        name: 'status', type: 'auto'
    }]

});