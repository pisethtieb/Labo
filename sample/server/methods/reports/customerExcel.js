Meteor.methods({
    sample_customerExcel: function (params) {
        var Future = Npm.require('fibers/future');
        var futureResponse = new Future();

        var excel = new Excel('xlsx'); // Create an excel object  for the file you want (xlsx or xls)
        var workbook = excel.createWorkbook(); // Create a workbook (equivalent of an excel file)
        var worksheet = excel.createWorksheet(); // Create a worksheet to be added to the workbook
        worksheet.writeToCell(0, 0, 'Customer Report'); // Example : writing to a cell
        worksheet.mergeCells(0, 0, 0, 1); // Example : merging files
        worksheet.writeToCell(1, 0, 'Name');
        worksheet.writeToCell(1, 1, 'Gender');

        worksheet.setColumnProperties([ // Example : setting the width of columns in the file
            {wch: 20},
            {wch: 30}
        ]);

        // Example : writing multiple rows to file
        var row = 2;
        Sample.Collection.Customer.find({}).forEach(function (obj) {
            worksheet.writeToCell(row, 0, obj.name);
            worksheet.writeToCell(row, 1, obj.gender);

            row++;
        });

        workbook.addSheet('MySheet', worksheet); // Add the worksheet to the workbook

        mkdirp('tmp', Meteor.bindEnvironment(function (err) {
            if (err) {
                console.log('Error creating tmp dir', err);
                futureResponse.throw(err);
            }
            else {
                var uuid = UUID.v4();
                var filePath = './tmp/' + uuid;
                workbook.writeToFile(filePath);

                temporaryFiles.importFile(filePath, {
                    filename: uuid,
                    contentType: 'application/octet-stream'
                }, function (err, file) {
                    if (err) {
                        futureResponse.throw(err);
                    }
                    else {
                        futureResponse.return('/gridfs/temporaryFiles/' + file._id);
                    }
                });
            }
        }));

        return futureResponse.wait();
    }
    //downloadExcelFile: function () {
    //    var Future = Npm.require('fibers/future');
    //    var futureResponse = new Future();
    //
    //    var fs = Npm.require('fs');
    //    var path = Npm.require('path');
    //    var basepath = path.resolve('.').split('.meteor')[0];
    //    var yourFile = basepath + 'sample/server/test.xlsx';
    //
    //    var Excel = Meteor.npmRequire('xlsx');
    //
    //    var rOpts = {cellStyles: true, cellNF: true};
    //    var workbook = Excel.readFile(yourFile, rOpts);
    //
    //    var worksheetName = workbook.SheetNames[0];
    //    var worksheet = workbook.Sheets[worksheetName];
    //
    //    var A3 = worksheet['A3'];
    //
    //    A3.v = 'Hello World';
    //    A3.s.fill = A3.s;
    //
    //
    //    mkdirp('tmp', Meteor.bindEnvironment(function (err) {
    //        if (err) {
    //            console.log('Error creating tmp dir', err);
    //            futureResponse.throw(err);
    //        }
    //        else {
    //            var uuid = UUID.v4();
    //            var filePath = './tmp/' + uuid;
    //            var wOpts = {cellStyles: true};
    //            Excel.writeFile(workbook, filePath, wOpts);
    //
    //            temporaryFiles.importFile(filePath, {
    //                filename: uuid,
    //                contentType: 'application/octet-stream'
    //            }, function (err, file) {
    //                if (err) {
    //                    futureResponse.throw(err);
    //                }
    //                else {
    //                    futureResponse.return('/gridfs/temporaryFiles/' + file._id);
    //                }
    //            });
    //        }
    //    }));
    //
    //    return futureResponse.wait();
    //}
});