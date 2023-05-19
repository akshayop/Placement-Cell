

module.exports.home = (req, res) => {
    
    return res.render('home', {
        title: "Placement Cell | Home",
    });
}