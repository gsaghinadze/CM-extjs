Ext.define('ExtJsTest.model.user.User', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    
    fields: [{ 
        name: 'id', type: 'auto'
    },{ 
        name: 'userName', type: 'auto'
    },{ 
        name: 'password', type: 'auto'
    },{ 
        name: 'role', type: 'auto'
    }]

});