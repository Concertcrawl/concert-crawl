"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var database_1 = require("../../src/database");
require('dotenv').config();
var uuid_1 = require("uuid");
var axios = require('axios');
function dataDownloader() {
    return main();
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, downloadPosts()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function downloadPosts() {
        return __awaiter(this, void 0, void 0, function () {
            var url, maxPage, states, _loop_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US";
                        maxPage = 0;
                        states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];
                        _loop_1 = function (i) {
                            var page, _loop_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        page = 0;
                                        _loop_2 = function () {
                                            var data, correctedData, mySqlConnection_1, createPosts, error_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 4, , 5]);
                                                        return [4 /*yield*/, axios.get(url, {
                                                                params: {
                                                                    apikey: process.env.TICKETMASTER_API_KEY,
                                                                    page: page,
                                                                    classificationName: 'music',
                                                                    size: 100,
                                                                    stateCode: states[i]
                                                                }
                                                            })];
                                                    case 1:
                                                        data = (_a.sent()).data;
                                                        correctedData = void 0;
                                                        // Checking if pulled data has event data, if not moving to next page or state.
                                                        if (data._embedded.hasOwnProperty('events')) {
                                                            correctedData = data._embedded.events;
                                                        }
                                                        else {
                                                            return [2 /*return*/, "continue"];
                                                        }
                                                        // Api only allowed up to 10 pages, checking for total number of pages and setting max page based on that number.
                                                        if (data.page.totalPages > 9) {
                                                            maxPage = 9;
                                                        }
                                                        else {
                                                            maxPage = data.page.totalPages - 1;
                                                        }
                                                        return [4 /*yield*/, database_1.connect()];
                                                    case 2:
                                                        mySqlConnection_1 = _a.sent();
                                                        createPosts = function (array) { return __awaiter(_this, void 0, void 0, function () {
                                                            var _i, array_1, currentPost, post, insertBand, insertConcertBand, mySqlConcertQuery, selectBandUuid, error_2, j, storedUuid, headLinerUuid, storedUuid, bandsUuid;
                                                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                                                            return __generator(this, function (_u) {
                                                                switch (_u.label) {
                                                                    case 0:
                                                                        _i = 0, array_1 = array;
                                                                        _u.label = 1;
                                                                    case 1:
                                                                        if (!(_i < array_1.length)) return [3 /*break*/, 21];
                                                                        currentPost = array_1[_i];
                                                                        if (!(!currentPost.name.includes("Megaticket") && !currentPost.classifications[0].genre.name.includes('Theatre'))) return [3 /*break*/, 20];
                                                                        post = {
                                                                            concertUuid: uuid_1.v4(),
                                                                            concertName: currentPost.name,
                                                                            concertGenre: currentPost.classifications[0].genre.name,
                                                                            concertDate: currentPost.dates.start.localDate,
                                                                            concertTime: (_b = (_a = currentPost.dates.start) === null || _a === void 0 ? void 0 : _a.localTime) !== null && _b !== void 0 ? _b : '00:00:000',
                                                                            concertVenue: (_c = currentPost._embedded.venues[0]) === null || _c === void 0 ? void 0 : _c.name,
                                                                            concertImage: (_d = currentPost === null || currentPost === void 0 ? void 0 : currentPost.images[0].url) !== null && _d !== void 0 ? _d : 'No Images Available',
                                                                            concertTicketUrl: (_e = currentPost === null || currentPost === void 0 ? void 0 : currentPost.url) !== null && _e !== void 0 ? _e : 'Tickets Not Available',
                                                                            concertAddress: ((_f = currentPost._embedded.venues[0]) === null || _f === void 0 ? void 0 : _f.address.line1) + ' ' + currentPost._embedded.venues[0].city.name + ' ' + currentPost._embedded.venues[0].state.stateCode,
                                                                            concertZip: (_g = currentPost._embedded.venues[0]) === null || _g === void 0 ? void 0 : _g.postalCode.substring(0, 5),
                                                                            concertLat: (_j = (_h = currentPost._embedded.venues[0].location) === null || _h === void 0 ? void 0 : _h.latitude) !== null && _j !== void 0 ? _j : 123.1234,
                                                                            concertLong: (_l = (_k = currentPost._embedded.venues[0].location) === null || _k === void 0 ? void 0 : _k.longitude) !== null && _l !== void 0 ? _l : 123.1234,
                                                                            concertBands: (_m = currentPost._embedded) === null || _m === void 0 ? void 0 : _m.attractions
                                                                        };
                                                                        console.log(post);
                                                                        insertBand = "INSERT INTO band(bandId, bandName, bandGenre, bandImage) VALUES (UUID_TO_BIN(?), ?, ?, ?)";
                                                                        insertConcertBand = "INSERT INTO concertBands(concertBandsConcertId, concertBandsBandId, concertBandsIsHeadliner) VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?)";
                                                                        mySqlConcertQuery = "INSERT INTO concert(concertId, concertName, concertGenre, concertDate, concertTime, concertVenueName, concertImage, concertTicketUrl, concertAddress, concertZip, concertLat, concertLong) VALUES (UUID_TO_BIN(:concertUuid), :concertName, :concertGenre, :concertDate, :concertTime, :concertVenue, :concertImage, :concertTicketUrl, :concertAddress, :concertZip, :concertLat, :concertLong)";
                                                                        selectBandUuid = "SELECT BIN_TO_UUID(band.bandId) AS uuid FROM band WHERE band.bandName = ?";
                                                                        if (!(currentPost._embedded.hasOwnProperty('attractions') && !currentPost._embedded.attractions[0].name.includes('Tour'))) return [3 /*break*/, 20];
                                                                        _u.label = 2;
                                                                    case 2:
                                                                        _u.trys.push([2, 4, , 5]);
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(mySqlConcertQuery, post)];
                                                                    case 3:
                                                                        _u.sent();
                                                                        return [3 /*break*/, 5];
                                                                    case 4:
                                                                        error_2 = _u.sent();
                                                                        return [3 /*break*/, 5];
                                                                    case 5:
                                                                        j = 0;
                                                                        _u.label = 6;
                                                                    case 6:
                                                                        if (!(j < post.concertBands.length)) return [3 /*break*/, 20];
                                                                        if (!(post.concertBands[j] == post.concertBands[0] && ((_o = currentPost._embedded) === null || _o === void 0 ? void 0 : _o.attractions[0].name) != undefined)) return [3 /*break*/, 13];
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(selectBandUuid, [(_p = currentPost._embedded) === null || _p === void 0 ? void 0 : _p.attractions[0].name])
                                                                            // @ts-ignore
                                                                            // Determining if a band already exists, if it doesn't creates it and assigns a new uuid to it.
                                                                        ];
                                                                    case 7:
                                                                        storedUuid = _u.sent();
                                                                        if (!(storedUuid[0] == '')) return [3 /*break*/, 10];
                                                                        headLinerUuid = uuid_1.v4();
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(insertBand, [headLinerUuid, (_q = currentPost._embedded) === null || _q === void 0 ? void 0 : _q.attractions[0].name, currentPost._embedded.attractions[0].classifications[0].genre.name, currentPost._embedded.attractions[0].images[0].url])];
                                                                    case 8:
                                                                        _u.sent();
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(insertConcertBand, [post.concertUuid, headLinerUuid, 1])];
                                                                    case 9:
                                                                        _u.sent();
                                                                        return [3 /*break*/, 12];
                                                                    case 10: 
                                                                    // @ts-ignore
                                                                    return [4 /*yield*/, mySqlConnection_1.execute(insertConcertBand, [post.concertUuid, storedUuid[0][0].uuid, 1])];
                                                                    case 11:
                                                                        // @ts-ignore
                                                                        _u.sent();
                                                                        _u.label = 12;
                                                                    case 12: return [3 /*break*/, 19];
                                                                    case 13:
                                                                        if (!(((_r = currentPost._embedded) === null || _r === void 0 ? void 0 : _r.attractions[j].name) != undefined)) return [3 /*break*/, 19];
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(selectBandUuid, [(_s = currentPost._embedded) === null || _s === void 0 ? void 0 : _s.attractions[j].name])
                                                                            // @ts-ignore
                                                                            // Determining if a band already exists, if it doesn't creates it and assigns a new uuid to it.
                                                                        ];
                                                                    case 14:
                                                                        storedUuid = _u.sent();
                                                                        if (!(storedUuid[0] == '')) return [3 /*break*/, 17];
                                                                        bandsUuid = uuid_1.v4();
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(insertBand, [bandsUuid, (_t = currentPost._embedded) === null || _t === void 0 ? void 0 : _t.attractions[j].name, currentPost._embedded.attractions[j].classifications[0].genre.name, currentPost._embedded.attractions[j].images[0].url])];
                                                                    case 15:
                                                                        _u.sent();
                                                                        return [4 /*yield*/, mySqlConnection_1.execute(insertConcertBand, [post.concertUuid, bandsUuid, 0])];
                                                                    case 16:
                                                                        _u.sent();
                                                                        return [3 /*break*/, 19];
                                                                    case 17: 
                                                                    // @ts-ignore
                                                                    return [4 /*yield*/, mySqlConnection_1.execute(insertConcertBand, [post.concertUuid, storedUuid[0][0].uuid, 0])];
                                                                    case 18:
                                                                        // @ts-ignore
                                                                        _u.sent();
                                                                        _u.label = 19;
                                                                    case 19:
                                                                        j++;
                                                                        return [3 /*break*/, 6];
                                                                    case 20:
                                                                        _i++;
                                                                        return [3 /*break*/, 1];
                                                                    case 21:
                                                                        console.log("Downloaded page: " + page + " of " + maxPage + ".");
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); };
                                                        return [4 /*yield*/, createPosts(correctedData)];
                                                    case 3:
                                                        _a.sent();
                                                        page++;
                                                        return [3 /*break*/, 5];
                                                    case 4:
                                                        error_1 = _a.sent();
                                                        console.log(error_1);
                                                        page++;
                                                        return [3 /*break*/, 5];
                                                    case 5: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        _a.label = 1;
                                    case 1: return [5 /*yield**/, _loop_2()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        if (page <= maxPage) return [3 /*break*/, 1];
                                        _a.label = 4;
                                    case 4:
                                        console.log("Download of " + states[i] + " complete!");
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < states.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        console.log('Download finished!');
                        return [2 /*return*/];
                }
            });
        });
    }
}
dataDownloader()["catch"](function (error) { return console.error(error); });
