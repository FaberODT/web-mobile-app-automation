require('dotenv').config();
var DataServices = function() {

    let email = "fabertester+iqx_e6_midwives_mobileweb_chrome@gmail.com",
        env = "e2e-joinpulse",
        DELETE_USER = "https://eu-west-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/helper-kyqnd/service/ClearUserData/incoming_webhook/deleteProfile",
        FAB_AUTH = "https://faberodt-e2e.eu.auth0.com/oauth/token",
        JOINPULSE_AUTH = "https://e2e-joinpulse-api.joinpulse.co.uk/auth-server/v0/faber-token/from-auth0",
        IMPORT_USER = "https://e2e-joinpulse-api.joinpulse.co.uk/profile-management-core/v0/import-profile/8bad8940-6ee2-425d-9f42-e4312cc1c219"

    let userData = {
        "email" : `${email}`,
        "env" :`${env}`
    };


    //testrail start
    this.getTestPassInfo = () => {
        return testPassInfo;
    }
    let testPassInfo = {
        "status_id": 1
    }
    this.getTestFailInfo = (comment) => {
        console.log("error value is: " + comment);
        return {
            "status_id": 5,
            "comment": `${comment}`
        }
    }
    let testFailInfo = {
        "status_id": 5,
        "comment": "This test failed",
        "elapsed": "15s",
        "defects": "TR-7",
        "version": "1.0 RC1 build 3724"
    }
    //testrail finish

    this.getUserData = () => {
        return userData;
    };

    let qnUserInfo = {
        "grant_type" : "client_credentials",
        "client_id" : "9CwNFgDTX8zbcYbsQb05zkEt6CtfbRkD",
        "client_secret" : "BPoh8i69zRE6idPEnCaDKu_HbRPFRpSkpe1pM2OfN5-6mWVuK_4lBOAtJm-I7VRX",
        "audience" : "https://api-testa.quicknurse.com"
    }

    this.getQNUserInfo= () => {
        return qnUserInfo;
    }

    this.addShift = () => {
        console.log("Values from data service: " + shiftType + ", " + shiftDate + ", " + shiftTimeStart + ", " + shiftTimeEnd);
        switch(shiftType){
            case "Simple":
                console.log("I am in Simple");
                return {
                    "clientCode": process.env.SHIFT_CLIENTCODE,
                    "ward": process.env.SHIFT_WARD,
                    "date": shiftDate,
                    "clientRef": "ref3",
                    "startTime": shiftTimeStart,
                    "finishTime": shiftTimeEnd,
                    "grade": process.env.SHIFT_GRADE,
                    "booker": "Test",
                    "confirm": "Test",
                    "comments": "Test",
                    "status": "XXXX",
                    "hide": 0,
                    "shiftCategory": 0
                }
                break;

            case "Hero":
                console.log("I am in Hero");
                return {
                    "clientCode": process.env.SHIFT_CLIENTCODE,
                    "ward": process.env.SHIFT_WARD,
                    "date": shiftDate,
                    "clientRef": "ref3",
                    "startTime": shiftTimeStart,
                    "finishTime": shiftTimeEnd,
                    "grade": process.env.SHIFT_GRADE,
                    "booker": "Test",
                    "confirm": "Test",
                    "comments": "Test",
                    "status": "XXXX",
                    "hide": 0,
                    "shiftCategory": 2
                  }
                break;

            case "Premium":
                console.log("I am in Premium");
                return {
                    "clientCode": process.env.SHIFT_CLIENTCODE,
                    "ward": process.env.SHIFT_WARD,
                    "date": shiftDate,
                    "clientRef": "ref3",
                    "startTime": shiftTimeStart,
                    "finishTime": shiftTimeEnd,
                    "grade": process.env.SHIFT_GRADE,
                    "booker": "Test",
                    "confirm": "Test",
                    "comments": "Test",
                    "status": "XXXX",
                    "hide": 0,
                    "shiftCategory": 1,
                    "promotionText": "£200"
                  }
                break;

            default:
                console.log("I am in default...");
                break;
        }
    }

    let userInfo = {
        "client_id" : "GDdfxXmEaK7UUIvjHrMbOBNhojAkiRMB",
        "client_secret" : "ZljDyjg_4tgTOyasYSsY0zKfM0ERKMcfItltGRX0-xefzFbZylNn5yAjsSGMyW6j",
        "audience" : "https://faber.work/api",
        "scope" :"openid",
        "username" :"mobileadmin@mailinator.com",
        "password" :"admin",
        "grant_type" : "password"
    }

    this.getUserInfo = () => {
        return userInfo;
    }

    let updateUserInfo = {
        "values":{
          "LastName": ["Tester"],
              "FirstName" : [ "fabertester+iqx_e6_midwives_mobileweb_chrome@gmail.com"],
              "Gender" : [ "Male"],
              "Mobile" : [ "07567676766"],
              "Address" : [ {"AddressLine3":[],"AddressLine2":[],"AddressLine1":["Birmingham"],"Region":[],"City":["Birmingham"],"PostCode":["WV24PA"]}],
              "NursingBand" : [ "Band6"],
              "GeneralNurseSkills" : [ "Midwives"],
              "StaffID" : [ "1116"],
              "SubstantiveEmployer" : [ "pulse"],
              "StaffSharedInbox" : [ "fabertester+shared@gmail.com"],
              "StaffEmail" : [ "fabertester+shared@gmail.com"],
              "DOB" : [ "1970-01-01T00:00:00.000Z"],
              "IQXID" : [ "1116"]
        }
    }

    this.getUpdatedUserInfo = () => {
        return updateUserInfo;
    }

};

module.exports = new DataServices();