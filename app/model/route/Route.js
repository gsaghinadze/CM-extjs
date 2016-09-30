Ext.define('ExtJsTest.model.route.Route', {
    extend: 'Ext.data.Model',
    
    idProperty: 'id',
    
    fields: [{ 
        name: 'id', type: 'auto'
    },{ 
        name: 'carId', type: 'auto'
    }, {
        name: 'driverId', type: 'auto'
    }, { 
        name: 'startTime',
        convert: function(val, rec) {
            return new Date(val);
        }
    }, { 
        name: 'finishTime', type: 'auto',
        convert: function(val, rec) {
            return new Date(val);
        }
    },{ 
        name: 'routeDescription', type: 'auto'
    },
    { 
        name: 'status', type: 'auto'
    }]

});