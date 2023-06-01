const Students = require('../models/students');
const fs = require('fs');
const path = require('path');

module.exports.download = async (req, res) => {
    try{

        const students = await Students.find({})
            .populate('interview');

        let report = "Student Name, Email, DSA Marks, FE Marks, BE Marks, Status ,Company Name, Interview Date, Interview Result";

        let type1 = "";

        for(let student of students) {
            type1 = student.name + ',' + student.email + ',' + student.courseMarks[0] + ',' + student.courseMarks[1] + ',' + student.courseMarks[2] + ',' + student.status;

            if(student.interview.length > 0) {
                for(let interview of student.interview) {
                    let type2 = "";

                    type2 += "," + interview.date.toString() + ',' + interview.company_name + ',' + interview.students[0].result;

                    report += "\n" + type1 + type2;
                }
            }

            else {
                report += '\n' + type1
            }
        }

        // const csvFile = fs.writeFile("./uploads/report.csv", report, function(err, data) {
        //     if(err) {
        //         console.log(err);
        //         return res.redirect('back');
        //     }
        //     return res.download("./uploads/report.csv", (err) => {
        //         if(err) {
        //             res.send({
        //                 error: err,
        //                 msg: "Something went wrong"
        //             })
        //         }
        //     });
        // });

        fs.writeFileSync("./uploads/report.csv", report);

        req.flash("success", "Downloaded CSV report!");
        return res.download("./uploads/report.csv");
        
    }catch(err) {
        console.log('error', err);
        return res.redirect('back');
    }
}