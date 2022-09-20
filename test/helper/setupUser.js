require('dotenv').config()
var expect = require('chai').expect,
  supertest = require('supertest'),
  dataServices = require('../../services/dataServices'),
  delete_user = supertest("https://eu-west-1.aws.webhooks.mongodb-stitch.com/api/client/v2.0/app/helper-kyqnd/service/ClearUserData/incoming_webhook/deleteProfile"),
  fab_auth = supertest("https://faberodt-e2e.eu.auth0.com/oauth/token"),
  joinpulse_auth = supertest("https://e2e-joinpulse-api.joinpulse.co.uk/auth-server/v0/faber-token/from-auth0"),
  import_user = supertest("https://e2e-joinpulse-api.joinpulse.co.uk/profile-management-core/v0/import-profile/8bad8940-6ee2-425d-9f42-e4312cc1c219"),

  qn_auth = supertest("https://quicknurse.eu.auth0.com/oauth/token"),
  add_shift = supertest("https://testa-exapi-qn.azurewebsites.net/v3/"),
  
//testrail start
  comment = "",
  resultID = "",
  testRail = supertest("https://faberodt.testrail.io/index.php?/api/v2/"),
//testrail finish

// get latest app start

  appCenter = supertest("https://api.appcenter.ms/v0.1/apps/Quick-Nurse-V2/Quickl-Nurse-V2-Test-A/releases/latest"),
  bsUpload = supertest("https://api-cloud.browserstack.com/app-automate/upload"),
  commonHeader = {
    'Content-Type': 'application/json',
    'X-Api-Token': 'dd05e2a86995872dbbccaaae9ec1f15e3e397432'
  },
  downloadUrl = "",
  latestBSUrl = "",

// get latest app finish



  qnAccessToken = "", 
  fabAccessToken = "", joinpulseAccessToken = "";

shiftType = "", shiftDate = "", shiftTimeStart = "", shiftTimeEnd = "";

class apiService {

    //get latest app start

    getDownloadedUrl() {
        appCenter.get('')
        .set(commonHeader)
        .expect(200)
        .end((err, res) => {
            console.log("response is: " + res.body.download_url);
            console.log("error is:" + err);
            downloadUrl = res.body.download_url;
        });
    }

    uploadAppToBS() {
        console.log("download URL is: " + process.env.BS_USER);
        bsUpload.post('')
        .type('multipart/form-data')
        .field('url', 'https://appcenter-filemanagement-distrib4ede6f06e.azureedge.net/f391fb43-8985-4240-af4b-091b59592bd2/app-debug.apk?sv=2019-02-02&sr=c&sig=ZQXGxQxD7UVYBQq95ZdvYSlPE4MA8efmNRRdTmMC2ZQ%3D&se=2022-03-30T06%3A47%3A49Z&sp=r')
        .auth(process.env.BS_USER, process.env.BS_KEY)
        .expect(200)
        .end((err, res) => {
            console.log("error is: " + err);
            console.log("uploaded URL is: " + res.body.app_url);
            latestBSUrl = res.body.app_url;
            console.log("Latest BS URL variable value is: " + latestBSUrl);
        });
    }

    //get latest app finish

    updateFailResult(test_id, comment){
        testRail.post('/add_result/' + test_id)
        .set('Accept', 'application/json')
        .auth('tnsqn.tester@gmail.com', 'TRtnssng2020')
        .send(dataServices.getTestFailInfo(comment))
        .expect(200)
        .end((err, res) => {
            resultID = res.body.id;
            console.log("result id is: " + resultID);
        });
    }

    attachFailedScreenShot (filepath) {
        console.log("result id is: " + resultID);
        console.log("captured screen shot path in API is: " + filepath);
        testRail.post('add_attachment_to_result/' + resultID)
        .auth('tnsqn.tester@gmail.com', 'TRtnssng2020')
        // .attach('attachment', process.cwd() + "/app/test.jpg")
        .attach('attachment', filepath)
        .expect(200)
        .end((err, res) => {

        });
    }

    updatePassResult(test_id){
        testRail.post('/add_result/' + test_id)
        .set('Accept', 'application/json')
        .auth('tnsqn.tester@gmail.com', 'TRtnssng2020')
        .send(dataServices.getTestPassInfo())
        .expect(200)
        .end((err, res) => {

        });
    }

    getQNAuthToken() {
        qn_auth.post('/')
        .set('Accept', 'application/json')
        .send(dataServices.getQNUserInfo())
        .expect(200)
        .end((err, res) => {
            expect(res.body).to.have.property("access_token");
            expect(res.body.access_token).to.not.equal(null);
            qnAccessToken = res.body.access_token;
            console.log("QN access token: " + qnAccessToken);
            if (err) return err;
        });
    }

    addShift(shiftType1, shiftDate1, shiftTimeStart1, shiftTimeEnd1) {
        console.log("Values: " + shiftType1 + "," + shiftDate1 + "," + shiftTimeStart1 + "," + shiftTimeEnd1);
        shiftType = shiftType1;
        shiftDate = shiftDate1;
        shiftTimeStart = shiftTimeStart1;
        shiftTimeEnd = shiftTimeEnd1;
        browser.pause(5000);
        add_shift.post('/Shift/Add?db=TNS')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${qnAccessToken}`)
        .send(dataServices.addShift())
        .expect(201)
        .end((err, res) => {
            if(err) return err;
        });
    }

    deleteUserData() {
        delete_user.post('')
        .set('Accept', 'application/json')
        .send(dataServices.getUserData())
        .expect(200)
        .end ((err, res) => {
        // response should have a true as a string
            expect(res.body).to.be.true;
            if (err) return err;
            // if (err) return done(err);
            // done();
        });
    }

    getFaberAuthToken() {
        fab_auth.post('/')
        .set('Accept', 'application/json')
        .send(dataServices.getUserInfo())
        .expect(200)
        .end ((err, res) => {
            // response should have a accessToken as a property 
            expect(res.body).to.have.property("access_token");
            expect(res.body.access_token).to.not.equal(null);
            fabAccessToken = res.body.access_token;
            if (err) return err;
            // if (err) return done(err);
            // done();
        });
    }

    getJoinPulseAuthToken() {
        joinpulse_auth.post('')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${fabAccessToken}`)
        .expect(200)
        .end((err, res) => {
            // response should have a accessToken as a property 
            expect(res.body).to.have.property("access_token");
            expect(res.body.access_token).to.not.equal(null);
            joinpulseAccessToken = res.body.access_token;
            if (err) return err;
            // if (err) return done(err);
            // done();
        });
    }

    updateUserInformation() {
        import_user.patch('')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${joinpulseAccessToken}`)
        .send(dataServices.getUpdatedUserInfo())
        .expect(204)
        .end((err, res) => {
            if(err) return err;
            // if(err) return done(err);
            // done();
        });
    }
}
module.exports = new apiService();
