"use strict";

module.exports = {
    before: ({ event }, next) => {
        const allow = [
            'name',
            'cpf',
            'email',
            'amount',
            'income',
            'birthdate',
            'maritalStatus',
            'address'
        ];

        Object.keys(event.body).map(k => {
            if (!allow.includes(k)) {
                delete event.body[k];
            }
        });
    
        next();
    }
}