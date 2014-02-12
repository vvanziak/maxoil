
/*
 * GET home page.
 */

exports.index = function(req, res){
    var logger = req.log4js.getLogger('Requests');
    logger.debug('main request');
    res.render('index', { title: 'maxoil.com.ua' });
};