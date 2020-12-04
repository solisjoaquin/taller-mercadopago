
const mercadopago = require("mercadopago")

mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
})

module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },
    callback: (req, res) => {
        console.log(req.query)

        if (req.query.status.includes("success")) {
            return res.render('success',
                {
                    payment_type: req.query.payment_type,
                    external_reference: req.query.external_reference,
                    collection_id: req.query.collection_id,
                }
            )
        }

        if (req.query.status.includes("pending")) {
            return res.render('pending')
        }

        if (req.query.status.includes("failure")) {
            return res.render('failure')
        }
    }
    ,
    notification: (req, res) => {
        console.log('webhook', req.body)


        res.status(200).end('ok')
    }
    ,
    comprar: (req, res) => {
        const host = "https://joaquinsolis-mercadopago.herokuapp.com/"
        const url = host + "callback?status="


        let preference = {
            back_urls: {
                success: url + "success",
                pending: url + "pending",
                failure: url + "failure"
            },
            notification_url: url + "notifications",

            auto_url: 'approved'
            ,

            payer: {
                name: 'Lalo',
                surname: 'Landa',
                email: 'test_user_63274575@testuser.com',
                phone: {
                    area_code: '11',
                    number: 22223333
                },
                address: {
                    zip_code: '1111',
                    street_name: 'False',
                    street_number: 123,
                }
            },

            payment_methods: {
                excluded_payment_types: [
                    { id: 'atm' }
                ],
                excluded_payment_methods: [{
                    id: 'amex'
                }],
                installments: 6
            },
            items: [
                {
                    id: 1234,
                    picture_url: 'https://github.com/solisjoaquin/taller-mercadopago/blob/main/public/images/products/jordan.jpg',
                    title: 'Nombre del producto seleccionado del carrito del ejercicio',
                    description: 'Dispositivo móvil de Tienda e-commerce',
                    unit_price: 200,
                    quantity: 1
                }
            ],
            external_reference: 'joaquin_15_93@hotmail.com'
        }

        mercadopago.preferences.create(preference).then(response => {
            global.init_point = response.body.init_point
            res.render('confirm')
        }).catch(error => {
            console.log(error)
            res.send('error')
        })
    }
}