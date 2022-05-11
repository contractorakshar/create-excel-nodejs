const { successResponse, errorResponse } = require('../helpers/response.helper');
const User = require('../models/user.models');
const fs = require("fs");
const Excel = require('exceljs');
const moment = require('moment-timezone');

const addUser = async (req, res) => {
    try {
        const userDetails = req.body;
        let userCreated = await User.create(userDetails);

        if (userCreated) {
            return successResponse(res, userCreated, "User Added Successfully");
        }

    } catch (error) {
        return errorResponse(res, error, "Error While Adding user");
    }

}

const getAllUser = async (req, res) => {

    try {
        let userDetails = await User.find({}, { name: 1, email: 1 });

        const fileCreatedUrl = await generateReport(userDetails);

        if (fileCreatedUrl) {
            return successResponse(res, fileCreatedUrl, "Excel Sheet With User Details Created Successfully");
        }

    } catch (error) {
        return errorResponse(res, error, "Error While feting User Count")
    }

}


const generateReport = async (userDetails) => {
    try {

        let today = moment(new Date()).utc().format('DD_MM_YYYY');

        var dir = 'reports/';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet('users');

        worksheet.columns = [
            { header: 'ID', key: 'id' },
            { header: 'NAME', key: 'name' },
            { header: 'EMAIL', key: 'email' },
        ];

        worksheet.addRows(userDetails);
        
        await workbook.xlsx.writeFile('reports/export_user_details_'+today+'.xlsx');
        
        let fileUrl = 'reports/export_user_details_' + today + '.xlsx';
        
        return fileUrl;

    } catch (error) {
        return error;
    }

}

module.exports = {
    addUser,
    getAllUser
}