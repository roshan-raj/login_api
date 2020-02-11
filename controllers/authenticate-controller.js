var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../db/db_config');
module.exports.authenticate = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var redirect_url = req.get('origin');

    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
        res.redirect(redirect_url);
    }
    else {
        connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {

            if (Object.keys(results).length == 0) {
                res.redirect(redirect_url);
            }
            else {
                let user_id = results[0].user_id;
                console.log(" wefd ", user_id);
                if (error) {
                    res.json({
                        status: false,
                        message: 'there are some error with query'
                    })
                } else {
                    if (results.length > 0) {
                        decryptedString = cryptr.decrypt(results[0].password);
                        if (password == decryptedString) {

                            connection.query(
                                'SELECT r.rolename from roles r where r.role_id in (select ra.role_id from role_assignment ra where user_id = ?)',
                                [user_id],
                                function (roleerror, roledate, rolefields) {
                                    if (roleerror) {
                                        // res.json({
                                        //     status: false,
                                        //     message: 'Something went wrong'
                                        // })
                                        res.redirect(redirect_url);
                                    }
                                    if (roledate[0].rolename == 'student') {
                                        res.json({
                                            status: true,
                                            message: 'Hey Student'
                                        })
                                        // res.redirect('/');
                                    }
                                    else if (roledate[0].rolename == 'career coach') {
                                        // res.json({
                                        //     status: true,
                                        //     message: 'Hey Career Coach'
                                        // })
                                        res.redirect(redirect_url + '/studentList')
                                    }
                                })

                        } else {
                            res.redirect(redirect_url);
                        }

                    }
                    else {
                        // res.json({
                        //     status: false,
                        //     message: "email and password does not match"
                        // });
                        res.redirect(redirect_url);
                    }
                }
            }
        });
    }
}
