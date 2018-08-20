webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ApiService = /** @class */ (function () {
    function ApiService() {
        this.API_URL = "https://fast-dj.herokuapp.com/"; //"http://localhost:8060/";
    }
    ApiService.prototype.addTransition = function (transition) {
        //TODO ADD TIME!!!!!!!!!
        return this.postJsonToApi('transition', transition);
    };
    ApiService.prototype.getAllTransitions = function () {
        return this.getJsonFromApi('transitions');
    };
    ApiService.prototype.postJsonToApi = function (path, json, params) {
        path = this.addParams(path, params);
        return fetch(this.API_URL + path, {
            method: 'post',
            body: JSON.stringify(json),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (r) { return r.text(); })
            //.then(r => {console.log(r); return r})
            .then(function (t) { return JSON.parse(t); })
            .catch(function (e) { return console.log(e); });
    };
    ApiService.prototype.getJsonFromApi = function (path, params) {
        path = this.addParams(path, params);
        return fetch(this.API_URL + path)
            .then(function (r) { return r.text(); })
            .then(function (t) { return JSON.parse(t); })
            .catch(function (e) { return console.log(e); });
    };
    ApiService.prototype.addParams = function (path, params) {
        if (params) {
            var paramStrings = Array.from(Object.keys(params))
                .map(function (k) { return k + "=" + encodeURIComponent(params[k]); });
            path += '?' + paramStrings.join('&');
        }
        return path;
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], ApiService);
    return ApiService;
}());

//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".custom-component-drop-zone {\n  width: 100%;\n  height: 100%;\n  font-size: 50px;\n  font-family: \"Comic Sans MS\";\n  text-align: center;\n}\n\n.status-indicator {\n  width: 100%;\n  height: 100%;\n  opacity: 0.9;\n  overflow: auto;\n  transition: background-color 0.1s ease-in-out;\n}\n\n.beat {\n  opacity: 1.0;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div\n  ng2FileDrop\n  class=\"custom-component-drop-zone\"\n  (ng2FileDropFileAccepted)=\"dragFileAccepted($event)\"\n>\n  <div\n    [ngClass]=\"{beat: state.status.type === 'SPINNING', 'status-indicator': true}\"\n    [style.backgroundColor]=\"state.status.colour\"\n  >\n    <h1>FAST DJ</h1>\n    <h2>{{state.status.type}}</h2>\n    <p>{{state.status.message}}</p>\n    <!--[hidden]=\"!transitionDone || ratingDone\"-->\n    <star-rating [hidden]=\"!transitionDone || ratingDone\"\n      [rating]=\"lastTransitionRating\"\n      (ratingChange)=\"lastTransitionRating = $event.rating\"\n      (starClickChange)=\"onRatingChange($event)\"\n       labelText=\"last transition rating\"\n      size=\"large\" labelPosition=\"bottom\" staticColor=\"default\" starType=\"svg\">\n    </star-rating>\n    <p [hidden]=\"!ratingDone\">drop more audio</p>\n    <dj-dev-controls *ngIf=\"state.inDevMode\">Text to show</dj-dev-controls>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__feature_extraction_service__ = __webpack_require__("../../../../../src/app/feature-extraction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__("../../../../../src/app/util.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mix_auto_dj__ = __webpack_require__("../../../../../src/app/mix/auto-dj.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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






function createColourCycleIterator(colours) {
    var index, nColours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                nColours = colours.length;
                _a.label = 1;
            case 1:
                if (false) return [3 /*break*/, 3];
                return [4 /*yield*/, colours[index = ++index % nColours]];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
var AppComponent = /** @class */ (function () {
    function AppComponent(route, apiService, extractionService) {
        this.route = route;
        this.apiService = apiService;
        this.extractionService = extractionService;
        this.songNames = [];
        this.lastTransitionRating = 0;
        this.transitionDone = false;
        this.ratingDone = false;
        //GlobalVars.LOGGING_ON = true;
        this.cyclicColours = createColourCycleIterator([
            '#5bc0eb',
            '#fde74c',
            '#9bc53d',
            '#e55934',
            '#fa7921'
        ]);
        this.state = {
            inDevMode: false,
            status: {
                type: 'INITIALISING',
                message: 'loading',
                colour: this.getNextColour()
            }
        };
    }
    Object.defineProperty(AppComponent.prototype, "state", {
        get: function () {
            return this.currentState;
        },
        set: function (newState) {
            this.currentState = newState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "status", {
        set: function (type) {
            var status = __assign({}, this.state.status, { type: type });
            this.state = __assign({}, this.state, { status: status });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "message", {
        set: function (message) {
            var status = __assign({}, this.state.status, { colour: this.getNextColour(), message: message });
            this.state = __assign({}, this.state, { status: status });
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.route
                            .queryParamMap
                            .map(function (params) {
                            _this.state = __assign({}, _this.state, { inDevMode: params.has('dev') });
                        })
                            .subscribe();
                        this.dj = new __WEBPACK_IMPORTED_MODULE_5__mix_auto_dj__["a" /* AutoDj */](null, this.extractionService);
                        return [4 /*yield*/, this.dj.init()];
                    case 1:
                        _a.sent();
                        this.status = 'READY';
                        this.message = 'drop audio here';
                        this.dj.getBeatObservable()
                            .subscribe(function (b) {
                            _this.status = _this.state.status.type === "SPINNING" ?
                                "spinning" : "SPINNING";
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.dragFileAccepted = function (acceptedFile) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //TODO RECATIVATE MANDATORY RATING!!! if (this.ratingDone || this.state.status.type === 'READY') {
                        this.transitionDone = false;
                        this.ratingDone = false;
                        this.lastTransitionRating = 0;
                        url = URL.createObjectURL(acceptedFile.file);
                        this.songNames.push(acceptedFile.file.name);
                        this.message = ("checking out " + acceptedFile.file.name).toLowerCase();
                        _a = this;
                        return [4 /*yield*/, this.dj.transitionToSong(url)];
                    case 1:
                        _a.lastTransition = _b.sent();
                        this.message = "transitioning to " + acceptedFile.file.name.toLowerCase();
                        //when transition done:
                        setTimeout(function () {
                            _this.transitionDone = true;
                            _this.message = "playing " + acceptedFile.file.name.toLowerCase();
                        }, this.lastTransition.duration * 1000 + 3000);
                        return [2 /*return*/];
                }
            });
        });
    };
    //}
    AppComponent.prototype.onRatingChange = function (event) {
        var _this = this;
        if (this.lastTransition) {
            this.lastTransition.user = Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* getGuid */])();
            this.lastTransition.rating = event.rating;
            this.lastTransition.names = this.songNames.slice(-2);
            this.apiService.addTransition(this.lastTransition);
            setTimeout(function () { return _this.ratingDone = true; }, 2000);
        }
    };
    AppComponent.prototype.getNextColour = function () {
        return this.cyclicColours.next().value;
    };
    var _a, _b, _c;
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _c || Object])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_drop__ = __webpack_require__("../../../../ng2-file-drop/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__feature_extraction_service__ = __webpack_require__("../../../../../src/app/feature-extraction.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dev_controls_dev_controls_component__ = __webpack_require__("../../../../../src/app/dev-controls/dev-controls.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular_star_rating__ = __webpack_require__("../../../../angular-star-rating/esm5/angular-star-rating.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__dev_controls_dev_controls_component__["a" /* DevControlsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_file_drop__["a" /* Ng2FileDropModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* RouterModule */].forRoot([]),
                __WEBPACK_IMPORTED_MODULE_8_angular_star_rating__["a" /* StarRatingModule */].forRoot()
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */],
                __WEBPACK_IMPORTED_MODULE_5__feature_extraction_service__["a" /* FeatureExtractionService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/dev-controls/dev-controls.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dev-controls/dev-controls.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  dev-controls works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/dev-controls/dev-controls.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevControlsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DevControlsComponent = /** @class */ (function () {
    function DevControlsComponent() {
    }
    DevControlsComponent.prototype.ngOnInit = function () {
    };
    DevControlsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'dj-dev-controls',
            template: __webpack_require__("../../../../../src/app/dev-controls/dev-controls.component.html"),
            styles: [__webpack_require__("../../../../../src/app/dev-controls/dev-controls.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], DevControlsComponent);
    return DevControlsComponent;
}());

//# sourceMappingURL=dev-controls.component.js.map

/***/ }),

/***/ "../../../../../src/app/feature-extraction.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeatureExtractionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_piper_js_one_shot__ = __webpack_require__("../../../../piper-js/one-shot.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_piper_js_one_shot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_piper_js_one_shot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_js_time__ = __webpack_require__("../../../../piper-js/time.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_piper_js_time___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_piper_js_time__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extractors_qm__ = __webpack_require__("../../../../@extractors/qm/qm.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extractors_qm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__extractors_qm__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { FeatureList } from 'piper-js/core';


// this spawns a web worker, which we only want to do once
// so we instantiate
var qmWorker = __WEBPACK_IMPORTED_MODULE_3__extractors_qm___default()();
function bufferToAudioData(buffer) {
    var nChannels = buffer.numberOfChannels;
    var channels = new Array(nChannels);
    for (var i = 0; i < nChannels; ++i) {
        channels[i] = buffer.getChannelData(i);
    }
    return {
        channels: channels,
        sampleRate: buffer.sampleRate,
        duration: buffer.duration
    };
}
var FeatureExtractionService = /** @class */ (function () {
    function FeatureExtractionService() {
        this.client = new __WEBPACK_IMPORTED_MODULE_1_piper_js_one_shot__["OneShotExtractionClient"](qmWorker, __WEBPACK_IMPORTED_MODULE_1_piper_js_one_shot__["OneShotExtractionScheme"].REMOTE);
    }
    FeatureExtractionService.prototype.extract = function (request) {
        return this.client.collect(request);
    };
    FeatureExtractionService.prototype.extractQmFeature = function (buffer, feature) {
        var _a = bufferToAudioData(buffer), channels = _a.channels, sampleRate = _a.sampleRate;
        return this.extract({
            audioData: channels,
            audioFormat: {
                sampleRate: sampleRate,
                channelCount: channels.length
            },
            key: feature.key,
            outputId: feature.outputId
        }).then(function (response) { return response.features.collected; });
    };
    FeatureExtractionService.prototype.extractBeats = function (buffer) {
        return this.extractQmFeature(buffer, {
            key: 'qm-vamp-plugins:qm-barbeattracker',
            outputId: 'beats'
        }).then(function (features) { return features.map(function (feature) { return ({
            time: { value: Object(__WEBPACK_IMPORTED_MODULE_2_piper_js_time__["toSeconds"])(feature.timestamp) },
            label: { value: feature.label }
        }); }); });
    };
    FeatureExtractionService.prototype.extractKey = function (buffer) {
        return this.extractQmFeature(buffer, {
            key: 'qm-vamp-plugins:qm-keydetector',
            outputId: 'tonic'
        }).then(function (features) { return features.map(function (feature) { return ({
            time: { value: Object(__WEBPACK_IMPORTED_MODULE_2_piper_js_time__["toSeconds"])(feature.timestamp) },
            value: feature.featureValues[0]
        }); }); });
    };
    FeatureExtractionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], FeatureExtractionService);
    return FeatureExtractionService;
}());

//# sourceMappingURL=feature-extraction.service.js.map

/***/ }),

/***/ "../../../../../src/app/mix/analyzer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Analyzer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mathjs__ = __webpack_require__("../../../../mathjs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mathjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mathjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dymo_core__ = __webpack_require__("../../../../dymo-core/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dymo_core__);
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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



/* {[0]: 0, [7,5]: 1, [2,10]: 2, [9,3]: 3, [4,8]: 4, [11,1]: 5, [6]: 6} */
var TONAL_DISTANCES = {
    0: 0,
    1: 5,
    2: 2,
    3: 3,
    4: 4,
    5: 1,
    6: 6,
    7: 1,
    8: 4,
    9: 3,
    10: 2,
    11: 5
};
var Analyzer = /** @class */ (function () {
    function Analyzer(store) {
        this.store = store;
        this.beatsCache = new Map();
        this.keysCache = new Map();
        this.tempoCache = new Map();
    }
    Analyzer.prototype.getAllFeatures = function (song1, song2) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTempo(song1)];
                    case 1:
                        _a = [
                            _b.sent()
                        ];
                        return [4 /*yield*/, this.getTempo(song2)];
                    case 2:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getTempoRatio(song1, song2)];
                    case 3:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getTempoRatio(song2, song1)];
                    case 4:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getTempoMultiple(song1, song2)];
                    case 5:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getTempoMultiple(song2, song1)];
                    case 6:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getRegularity(song1)];
                    case 7:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getRegularity(song2)];
                    case 8:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getKey(song1)];
                    case 9:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getKey(song2)];
                    case 10:
                        _a = _a.concat([
                            _b.sent()
                        ]);
                        return [4 /*yield*/, this.getKeyDistance(song1, song2)];
                    case 11: return [2 /*return*/, _a.concat([
                            _b.sent()
                        ])];
                }
            });
        });
    };
    Analyzer.prototype.getMainSongBody = function (songUri) {
        return { first: 0, second: 1 };
    };
    Analyzer.prototype.getKeyDistance = function (song1Uri, song2Uri) {
        return __awaiter(this, void 0, Promise, function () {
            var dist, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = Math).abs;
                        return [4 /*yield*/, this.getKey(song1Uri)];
                    case 1:
                        _c = (_d.sent());
                        return [4 /*yield*/, this.getKey(song2Uri)];
                    case 2:
                        dist = _b.apply(_a, [_c - (_d.sent())]);
                        return [2 /*return*/, TONAL_DISTANCES[dist]];
                }
            });
        });
    };
    Analyzer.prototype.getKey = function (songUri) {
        return __awaiter(this, void 0, Promise, function () {
            var key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.keysCache.has(songUri)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.store.findFeatureValue(songUri, __WEBPACK_IMPORTED_MODULE_2_dymo_core__["uris"].CONTEXT_URI + "key")];
                    case 1:
                        key = _a.sent();
                        this.keysCache.set(songUri, key.length ? key[0] : key);
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.keysCache.get(songUri)];
                }
            });
        });
    };
    Analyzer.prototype.getTempo = function (songUri) {
        return __awaiter(this, void 0, Promise, function () {
            var durations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.tempoCache.has(songUri)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getBeatDurations(songUri)];
                    case 1:
                        durations = _a.sent();
                        this.tempoCache.set(songUri, 60 / __WEBPACK_IMPORTED_MODULE_1_mathjs__["mean"](durations));
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.tempoCache.get(songUri)];
                }
            });
        });
    };
    Analyzer.prototype.getTempoMultiple = function (song1Uri, song2Uri) {
        return __awaiter(this, void 0, Promise, function () {
            var tempoRatio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTempoRatio(song1Uri, song2Uri)];
                    case 1:
                        tempoRatio = _a.sent();
                        return [2 /*return*/, tempoRatio % 1];
                }
            });
        });
    };
    Analyzer.prototype.getTempoRatio = function (song1Uri, song2Uri) {
        return __awaiter(this, void 0, Promise, function () {
            var tempoRatio, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getTempo(song1Uri)];
                    case 1:
                        _a = (_b.sent());
                        return [4 /*yield*/, this.getTempo(song2Uri)];
                    case 2:
                        tempoRatio = _a / (_b.sent());
                        //console.log("tempo ratio", tempoRatio);
                        return [2 /*return*/, tempoRatio];
                }
            });
        });
    };
    Analyzer.prototype.hasRegularBeats = function (songUri) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRegularity(songUri)];
                    case 1: return [2 /*return*/, (_a.sent()) < .1];
                }
            });
        });
    };
    Analyzer.prototype.getRegularity = function (songUri) {
        return __awaiter(this, void 0, Promise, function () {
            var durations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBeatDurations(songUri)];
                    case 1:
                        durations = _a.sent();
                        return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_1_mathjs__["std"](durations)];
                }
            });
        });
    };
    Analyzer.prototype.tempoSimilar = function (song1Uri, song2Uri) {
        return __awaiter(this, void 0, Promise, function () {
            var ratio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTempoRatio(song1Uri, song2Uri)];
                    case 1:
                        ratio = _a.sent();
                        return [2 /*return*/, this.isSimilar(1, ratio)];
                }
            });
        });
    };
    Analyzer.prototype.isSimilar = function (n1, n2) {
        //TODO MAKE POWER-BASED DISTANCE
        return Math.abs(n1 - n2) < .1;
    };
    Analyzer.prototype.getBeatDurations = function (songUri) {
        return __awaiter(this, void 0, Promise, function () {
            var bars, beats, _a, _b, durations;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.beatsCache.has(songUri)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.store.findParts(songUri)];
                    case 1:
                        bars = _c.sent();
                        _b = (_a = __WEBPACK_IMPORTED_MODULE_0_lodash__).flatten;
                        return [4 /*yield*/, Promise.all(bars.map(function (p) { return _this.store.findParts(p); }))];
                    case 2:
                        beats = _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, Promise.all(beats.map(function (b) { return _this.findDuration(b); }))];
                    case 3:
                        durations = _c.sent();
                        this.beatsCache.set(songUri, durations);
                        _c.label = 4;
                    case 4: return [2 /*return*/, this.beatsCache.get(songUri)];
                }
            });
        });
    };
    Analyzer.prototype.findDuration = function (dymo) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.store.findFeatureValue(dymo, __WEBPACK_IMPORTED_MODULE_2_dymo_core__["uris"].DURATION_FEATURE)];
                    case 1: return [2 /*return*/, (_a.sent())];
                }
            });
        });
    };
    return Analyzer;
}());

//# sourceMappingURL=analyzer.js.map

/***/ }),

/***/ "../../../../../src/app/mix/auto-dj.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AutoDj; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dymo_player__ = __webpack_require__("../../../../dymo-player/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dymo_player___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dymo_player__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dymo_core__ = __webpack_require__("../../../../dymo-core/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dymo_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mix_generator__ = __webpack_require__("../../../../../src/app/mix/mix-generator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__("../../../../../src/app/mix/types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__analyzer__ = __webpack_require__("../../../../../src/app/mix/analyzer.ts");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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






var AutoDj = /** @class */ (function () {
    //TODO AT SOME POINT IN THE FUTURE WE MAY HAVE AN API WITH SOME FEATURES
    function AutoDj(featureApi, featureExtractor, decisionType) {
        this.featureApi = featureApi;
        this.featureExtractor = featureExtractor;
        this.decisionType = decisionType;
        this.previousPlayingDymos = [];
        this.previousSongs = [];
        this.player = new __WEBPACK_IMPORTED_MODULE_1_dymo_player__["DymoPlayer"](true, false, 0.5, 2); //, undefined, undefined, true);
    }
    AutoDj.prototype.init = function () {
        var _this = this;
        return this.player.init('https://raw.githubusercontent.com/dynamic-music/dymo-core/master/ontologies/') //'https://dynamic-music.github.io/dymo-core/ontologies/')
            .then(function () {
            _this.store = _this.player.getDymoManager().getStore();
            _this.dymoGen = new __WEBPACK_IMPORTED_MODULE_2_dymo_core__["DymoGenerator"](false, _this.store);
            _this.mixGen = new __WEBPACK_IMPORTED_MODULE_3__mix_generator__["a" /* MixGenerator */](_this.dymoGen, _this.player);
            _this.analyzer = new __WEBPACK_IMPORTED_MODULE_5__analyzer__["a" /* Analyzer */](_this.store);
        });
    };
    AutoDj.prototype.getBeatObservable = function () {
        var _this = this;
        return (this.player.getPlayingDymoUris())
            .filter(function (playingDymos) {
            // TODO identify which track is playing, and associate with a specific colour
            var nChanged = __WEBPACK_IMPORTED_MODULE_0_lodash__["difference"](playingDymos, _this.previousPlayingDymos).length;
            _this.previousPlayingDymos = playingDymos;
            return nChanged > 0;
        });
    };
    AutoDj.prototype.transitionToSong = function (audioUri) {
        return __awaiter(this, void 0, Promise, function () {
            var buffer, beats, newSong, oldSong, keys, transition, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.player.getAudioBank()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAudioBuffer(audioUri)];
                    case 2:
                        buffer = _b.sent();
                        return [4 /*yield*/, this.featureExtractor.extractBeats(buffer)];
                    case 3:
                        beats = _b.sent();
                        //drop initial and final incomplete bars
                        beats = __WEBPACK_IMPORTED_MODULE_0_lodash__["dropWhile"](beats, function (b) { return b.label.value !== "1"; });
                        beats = __WEBPACK_IMPORTED_MODULE_0_lodash__["dropRightWhile"](beats, function (b) { return b.label.value !== "4"; });
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_dymo_core__["DymoTemplates"].createAnnotatedBarAndBeatDymo2(this.dymoGen, audioUri, beats)];
                    case 4:
                        newSong = _b.sent();
                        oldSong = this.previousSongs.length ? __WEBPACK_IMPORTED_MODULE_0_lodash__["last"](this.previousSongs) : undefined;
                        return [4 /*yield*/, this.featureExtractor.extractKey(buffer)];
                    case 5:
                        keys = _b.sent();
                        this.dymoGen.setSummarizingMode(__WEBPACK_IMPORTED_MODULE_2_dymo_core__["globals"].SUMMARY.MODE);
                        return [4 /*yield*/, this.dymoGen.addFeature("key", keys, newSong)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.internalTransition(newSong)];
                    case 7:
                        transition = _b.sent();
                        if (!oldSong) return [3 /*break*/, 9];
                        _a = transition;
                        return [4 /*yield*/, this.analyzer.getAllFeatures(oldSong, newSong)];
                    case 8:
                        _a.features = _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.internalTransition = function (newSong) {
        return __awaiter(this, void 0, Promise, function () {
            var transition, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.previousSongs.length > 0 && !this.player.isPlaying(this.mixGen.getMixDymo()))) return [3 /*break*/, 2];
                        this.previousSongs = [];
                        return [4 /*yield*/, this.mixGen.init()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.player.getDymoManager().loadFromStore(newSong)];
                    case 3:
                        _b.sent();
                        if (!(this.decisionType == __WEBPACK_IMPORTED_MODULE_4__types__["a" /* DecisionType */].Default)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.defaultTransition(newSong)];
                    case 4:
                        transition = _b.sent();
                        return [3 /*break*/, 14];
                    case 5:
                        if (!(this.decisionType == __WEBPACK_IMPORTED_MODULE_4__types__["a" /* DecisionType */].Random)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.randomTransition(newSong)];
                    case 6:
                        transition = _b.sent();
                        return [3 /*break*/, 14];
                    case 7:
                        if (!(this.decisionType == __WEBPACK_IMPORTED_MODULE_4__types__["a" /* DecisionType */].DecisionTree)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.startWhicheverTransitionIsBest(newSong)];
                    case 8:
                        transition = _b.sent();
                        return [3 /*break*/, 14];
                    case 9:
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.randomTransition(newSong)];
                    case 10:
                        _a = _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.startWhicheverTransitionIsBest(newSong)];
                    case 12:
                        _a = _b.sent();
                        _b.label = 13;
                    case 13:
                        //fiftyfifty random and decision tree
                        transition = _a;
                        _b.label = 14;
                    case 14:
                        this.previousSongs.push(newSong);
                        this.player.playUri(this.mixGen.getMixDymo());
                        return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.defaultTransition = function (newSong) {
        return __awaiter(this, void 0, Promise, function () {
            var transition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.previousSongs.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mixGen.beatmatchCrossfade(newSong)];
                    case 1:
                        //transition = await this.startWhicheverTransitionIsBest(newSong);
                        //transition = await this.randomTransition(newSong);
                        transition = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.mixGen.startMixWithFadeIn(newSong)];
                    case 3:
                        transition = _a.sent();
                        _a.label = 4;
                    case 4:
                        transition.decision = __WEBPACK_IMPORTED_MODULE_4__types__["a" /* DecisionType */].Default;
                        return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.randomTransition = function (newSong) {
        return __awaiter(this, void 0, Promise, function () {
            var transition;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("random");
                        if (!(this.previousSongs.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getRandomTransition()(newSong)];
                    case 1:
                        transition = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.mixGen.startMixWithFadeIn(newSong)];
                    case 3:
                        transition = _a.sent();
                        _a.label = 4;
                    case 4:
                        transition.decision = __WEBPACK_IMPORTED_MODULE_4__types__["a" /* DecisionType */].Random;
                        return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.startWhicheverTransitionIsBest = function (newSong) {
        return __awaiter(this, void 0, Promise, function () {
            var transition, previousSong, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("tree");
                        previousSong = __WEBPACK_IMPORTED_MODULE_0_lodash__["last"](this.previousSongs);
                        if (!(this.previousSongs.length == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.mixGen.startMixWithFadeIn(newSong)];
                    case 1:
                        transition = _b.sent();
                        return [3 /*break*/, 26];
                    case 2: return [4 /*yield*/, this.analyzer.hasRegularBeats(newSong)];
                    case 3:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.analyzer.hasRegularBeats(previousSong)];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        if (!_a) return [3 /*break*/, 19];
                        console.log("both regular");
                        return [4 /*yield*/, this.analyzer.tempoSimilar(newSong, previousSong)];
                    case 6:
                        if (!_b.sent()) return [3 /*break*/, 8];
                        console.log("tempo similar");
                        return [4 /*yield*/, this.mixGen.beatmatchCrossfade(newSong)];
                    case 7:
                        //transition using beatmatching and tempo interpolation
                        transition = _b.sent();
                        return [3 /*break*/, 18];
                    case 8: return [4 /*yield*/, this.analyzer.getKeyDistance(newSong, previousSong)];
                    case 9:
                        if (!((_b.sent()) <= 2)) return [3 /*break*/, 14];
                        console.log("key similar");
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.mixGen.effects(newSong)];
                    case 10:
                        transition = _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.mixGen.echoFreeze(newSong)];
                    case 12:
                        transition = _b.sent();
                        _b.label = 13;
                    case 13: return [3 /*break*/, 18];
                    case 14:
                        console.log("give up");
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.mixGen.beatRepeat(newSong)];
                    case 15:
                        transition = _b.sent();
                        return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, this.mixGen.powerDown(newSong)];
                    case 17:
                        transition = _b.sent();
                        _b.label = 18;
                    case 18: return [3 /*break*/, 26];
                    case 19: return [4 /*yield*/, this.analyzer.getKeyDistance(newSong, previousSong)];
                    case 20:
                        if (!((_b.sent()) <= 2)) return [3 /*break*/, 22];
                        console.log("key similar");
                        return [4 /*yield*/, this.mixGen.echoFreeze(newSong)];
                    case 21:
                        transition = _b.sent();
                        return [3 /*break*/, 26];
                    case 22:
                        console.log("give up");
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.mixGen.beatRepeat(newSong)];
                    case 23:
                        transition = _b.sent();
                        return [3 /*break*/, 26];
                    case 24: return [4 /*yield*/, this.mixGen.powerDown(newSong)];
                    case 25:
                        transition = _b.sent();
                        _b.label = 26;
                    case 26:
                        transition.decision = __WEBPACK_IMPORTED_MODULE_4__types__["a" /* DecisionType */].DecisionTree;
                        return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.getRandomTransition = function () {
        var _this = this;
        var transitions = [
            function (newDymo) { return _this.mixGen.beatmatchCrossfade(newDymo); },
            function (newDymo) { return _this.mixGen.echoFreeze(newDymo); },
            function (newDymo) { return _this.mixGen.slam(newDymo); },
            function (newDymo) { return _this.mixGen.beatRepeat(newDymo); },
            function (newDymo) { return _this.mixGen.crossfade(newDymo); },
            function (newDymo) { return _this.mixGen.powerDown(newDymo); },
            function (newDymo) { return _this.mixGen.effects(newDymo); }
        ];
        return transitions[__WEBPACK_IMPORTED_MODULE_0_lodash__["random"](transitions.length)];
    };
    return AutoDj;
}());

//# sourceMappingURL=auto-dj.js.map

/***/ }),

/***/ "../../../../../src/app/mix/mix-generator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MixGenerator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dymo_core__ = __webpack_require__("../../../../dymo-core/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dymo_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types__ = __webpack_require__("../../../../../src/app/mix/types.ts");
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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



var TRANSITION_OFFSET = 1; //number of bars from current position any transition starts
var MixGenerator = /** @class */ (function () {
    function MixGenerator(generator, player) {
        this.generator = generator;
        this.player = player;
        this.transitionConstraints = []; //ARRAYS OF CONSTRAINT URIS FOR NOW
        this.store = generator.getStore();
        this.expressionGen = new __WEBPACK_IMPORTED_MODULE_1_dymo_core__["ExpressionGenerator"](this.store);
        this.init();
    }
    MixGenerator.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.songs = [];
                        _a = this;
                        return [4 /*yield*/, this.generator.addDymo()];
                    case 1:
                        _a.mixDymoUri = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MixGenerator.prototype.getMixDymo = function () {
        return this.mixDymoUri;
    };
    MixGenerator.prototype.startMixWithFadeIn = function (songUri, numBars) {
        if (numBars === void 0) { numBars = 2; }
        return __awaiter(this, void 0, Promise, function () {
            var newSongBars, _a, duration, uris, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 1:
                        newSongBars = _b.sent();
                        return [4 /*yield*/, this.applyFadeIn(newSongBars.slice(0, numBars))];
                    case 2:
                        _a = _b.sent(), duration = _a[0], uris = _a[1];
                        return [4 /*yield*/, this.endTransition(newSongBars, __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].FadeIn, duration, uris)];
                    case 3:
                        result = _b.sent();
                        //console.log(await this.store.lo)
                        return [2 /*return*/, result];
                }
            });
        });
    };
    MixGenerator.prototype.slam = function (songUri, offsetBars) {
        if (offsetBars === void 0) { offsetBars = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri, offsetBars)];
                    case 1:
                        state = _a.sent();
                        return [2 /*return*/, this.endTransition(state.newSongBars, __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].Slam, 0)];
                }
            });
        });
    };
    MixGenerator.prototype.beatRepeat = function (songUri, times, offsetBars) {
        if (times === void 0) { times = 3; }
        if (offsetBars === void 0) { offsetBars = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var state, lastBar, lastBeat, lastBarDuration, firstBarBeats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri, offsetBars)];
                    case 1:
                        state = _a.sent();
                        return [4 /*yield*/, this.findLastBar()];
                    case 2:
                        lastBar = _a.sent();
                        return [4 /*yield*/, this.store.findPartAt(lastBar, 3)];
                    case 3:
                        lastBeat = _a.sent();
                        return [4 /*yield*/, this.store.setParameter(lastBeat, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DELAY, 0.5)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.store.findFeatureValue(state.removedOldSongBars[0], __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 5:
                        lastBarDuration = _a.sent();
                        return [4 /*yield*/, this.addSilence(lastBarDuration / 2)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.store.findParts(state.newSongBars[0])];
                    case 7:
                        firstBarBeats = _a.sent();
                        return [4 /*yield*/, this.addPartsToMix(__WEBPACK_IMPORTED_MODULE_0_lodash__["fill"](Array(times), firstBarBeats[0]))];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, this.endTransition(state.newSongBars, __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].BeatRepeat, 2)]; //duration just an estimate for now
                }
            });
        });
    };
    MixGenerator.prototype.echoFreeze = function (songUri, numBarsBreak) {
        if (numBarsBreak === void 0) { numBarsBreak = 1; }
        return __awaiter(this, void 0, Promise, function () {
            var state, lastBar, lastBarDuration, silenceDuration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri)];
                    case 1:
                        state = _a.sent();
                        return [4 /*yield*/, this.findLastBar()];
                    case 2:
                        lastBar = _a.sent();
                        return [4 /*yield*/, this.store.setParameter(lastBar, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DELAY, 1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.store.findFeatureValue(lastBar, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 4:
                        lastBarDuration = _a.sent();
                        silenceDuration = lastBarDuration * numBarsBreak;
                        return [4 /*yield*/, this.addSilence(silenceDuration)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, this.endTransition(state.newSongBars, __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].EchoFreeze, lastBarDuration + silenceDuration)];
                }
            });
        });
    };
    MixGenerator.prototype.effects = function (songUri, numBars, offsetBars) {
        if (numBars === void 0) { numBars = 2; }
        if (offsetBars === void 0) { offsetBars = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var state, effectBars, duration, effectsRamp, reverb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri, offsetBars)];
                    case 1:
                        state = _a.sent();
                        effectBars = state.removedOldSongBars.slice(0, numBars);
                        return [4 /*yield*/, this.getTotalDuration(effectBars)];
                    case 2:
                        duration = _a.sent();
                        return [4 /*yield*/, this.addRampWithTrigger(duration)];
                    case 3:
                        effectsRamp = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(effectsRamp, effectBars, 'Reverb(d) == r')];
                    case 4:
                        reverb = _a.sent();
                        return [4 /*yield*/, this.addPartsToMix(effectBars)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, this.endTransition(state.newSongBars, __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].Effects, duration, [effectsRamp, reverb])];
                }
            });
        });
    };
    MixGenerator.prototype.powerDown = function (songUri, numBars, numBarsBreak) {
        if (numBars === void 0) { numBars = 2; }
        if (numBarsBreak === void 0) { numBarsBreak = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var state, powerBars, duration, _a, powerRamp, powerDown, powerDown2, silenceDuration;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri)];
                    case 1:
                        state = _b.sent();
                        powerBars = state.removedOldSongBars.slice(0, numBars);
                        _a = 2;
                        return [4 /*yield*/, this.getTotalDuration(powerBars)];
                    case 2:
                        duration = _a * (_b.sent());
                        return [4 /*yield*/, this.addRampWithTrigger(duration)];
                    case 3:
                        powerRamp = _b.sent();
                        return [4 /*yield*/, this.makeRampConstraint(powerRamp, powerBars, 'PlaybackRate(d) == 1-r')];
                    case 4:
                        powerDown = _b.sent();
                        return [4 /*yield*/, this.makeSetsConstraint([['d', powerBars]], 'DurationRatio(d) == 1/PlaybackRate(d)')];
                    case 5:
                        powerDown2 = _b.sent();
                        return [4 /*yield*/, this.loadTransition(powerRamp, powerDown, powerDown2)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.addPartsToMix(powerBars)];
                    case 7:
                        _b.sent();
                        silenceDuration = (duration / 2 / numBars) * numBarsBreak;
                        return [4 /*yield*/, this.addSilence(silenceDuration)];
                    case 8:
                        _b.sent();
                        //add new song
                        return [2 /*return*/, this.endTransition(state.newSongBars, __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].PowerDown, duration + silenceDuration)];
                }
            });
        });
    };
    MixGenerator.prototype.crossfade = function (songUri, numBars, offsetBars) {
        if (numBars === void 0) { numBars = 3; }
        if (offsetBars === void 0) { offsetBars = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var state, newSongTrans, duration, oldSongTrans, uris;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri, offsetBars)];
                    case 1:
                        state = _a.sent();
                        newSongTrans = state.newSongBars.slice(0, numBars);
                        return [4 /*yield*/, this.getTotalDuration(newSongTrans)];
                    case 2:
                        duration = _a.sent();
                        return [4 /*yield*/, this.getInitialBars(state.removedOldSongBars, duration)];
                    case 3:
                        oldSongTrans = _a.sent();
                        return [4 /*yield*/, this.applyCrossfade(oldSongTrans, newSongTrans, duration)];
                    case 4:
                        uris = _a.sent();
                        return [4 /*yield*/, this.addAligned(oldSongTrans, newSongTrans)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, this.endTransition(state.newSongBars.slice(numBars), __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].Crossfade, duration, uris)];
                }
            });
        });
    };
    MixGenerator.prototype.beatmatchCrossfade = function (songUri, numBars, offsetBars) {
        if (numBars === void 0) { numBars = 3; }
        if (offsetBars === void 0) { offsetBars = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var state, newSongTrans, oldSongTrans, duration, uris, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.initTransition(songUri, offsetBars)];
                    case 1:
                        state = _c.sent();
                        newSongTrans = state.newSongBars.slice(0, numBars);
                        oldSongTrans = state.removedOldSongBars.slice(0, numBars);
                        return [4 /*yield*/, this.getTotalDuration(oldSongTrans.concat(newSongTrans))];
                    case 2:
                        duration = (_c.sent()) / 2 - 0.5;
                        return [4 /*yield*/, this.applyCrossfade(oldSongTrans, newSongTrans, duration)];
                    case 3:
                        uris = _c.sent();
                        if (!(newSongTrans.length == oldSongTrans.length)) return [3 /*break*/, 5];
                        _b = (_a = uris).concat;
                        return [4 /*yield*/, this.applyBeatmatch(oldSongTrans, newSongTrans, uris[0])];
                    case 4:
                        uris = _b.apply(_a, [_c.sent()]);
                        _c.label = 5;
                    case 5: 
                    //add transition part
                    return [4 /*yield*/, this.addZipped(oldSongTrans, newSongTrans)];
                    case 6:
                        //add transition part
                        _c.sent();
                        return [2 /*return*/, this.endTransition(state.newSongBars.slice(numBars), __WEBPACK_IMPORTED_MODULE_2__types__["b" /* TransitionType */].Beatmatch, duration, uris)];
                }
            });
        });
    };
    MixGenerator.prototype.addPartsToMix = function (parts) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(parts.map(function (p) { return _this.store.addPart(_this.mixDymoUri, p); }))];
            });
        });
    };
    MixGenerator.prototype.addSilence = function (duration) {
        return __awaiter(this, void 0, void 0, function () {
            var silence;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(duration > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generator.addDymo()];
                    case 1:
                        silence = _a.sent();
                        return [4 /*yield*/, this.store.setFeature(silence, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE, duration)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.addPartsToMix([silence])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MixGenerator.prototype.addAligned = function (bars1, bars2) {
        return __awaiter(this, void 0, Promise, function () {
            var bars1Seq, bars2Seq;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generator.addDymo(null, null, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].SEQUENCE)];
                    case 1:
                        bars1Seq = _a.sent();
                        return [4 /*yield*/, Promise.all(bars1.map(function (p) { return _this.store.addPart(bars1Seq, p); }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.generator.addDymo(null, null, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].SEQUENCE)];
                    case 3:
                        bars2Seq = _a.sent();
                        return [4 /*yield*/, Promise.all(bars2.map(function (p) { return _this.store.addPart(bars2Seq, p); }))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.generator.addConjunction(this.mixDymoUri, [bars1Seq, bars2Seq])];
                    case 5: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MixGenerator.prototype.addZipped = function (bars1, bars2) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Promise.all(__WEBPACK_IMPORTED_MODULE_0_lodash__["zip"](bars1, bars2).map(function (bp) {
                    return _this.generator.addConjunction(_this.mixDymoUri, bp);
                }));
                return [2 /*return*/];
            });
        });
    };
    MixGenerator.prototype.applyBeatmatch = function (oldSongBars, newSongBars, rampUri) {
        return __awaiter(this, void 0, void 0, function () {
            var tempoParam, newTempo, oldTempo, tempoTransition, beats, _a, _b, beatMatch, beatMatch2;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.generator.addCustomParameter(__WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].CONTEXT_URI + "Tempo")];
                    case 1:
                        tempoParam = _c.sent();
                        return [4 /*yield*/, this.getTempoFromBars(newSongBars)];
                    case 2:
                        newTempo = _c.sent();
                        return [4 /*yield*/, this.getTempoFromBars(oldSongBars)];
                    case 3:
                        oldTempo = _c.sent();
                        return [4 /*yield*/, this.makeSetsConstraint([['t', [tempoParam]], ['r', [rampUri]]], 't == r*' + newTempo + '+(1-r)*' + oldTempo)];
                    case 4:
                        tempoTransition = _c.sent();
                        _b = (_a = __WEBPACK_IMPORTED_MODULE_0_lodash__).flatten;
                        return [4 /*yield*/, Promise.all(oldSongBars.concat(newSongBars).map(function (p) { return _this.store.findParts(p); }))];
                    case 5:
                        beats = _b.apply(_a, [_c.sent()]);
                        return [4 /*yield*/, this.makeSetsConstraint([['d', beats], ['t', [tempoParam]]], 'TimeStretchRatio(d) == t/60*DurationFeature(d)')];
                    case 6:
                        beatMatch = _c.sent();
                        return [4 /*yield*/, this.makeSetsConstraint([['d', beats]], 'DurationRatio(d) == 1/TimeStretchRatio(d)')];
                    case 7:
                        beatMatch2 = _c.sent();
                        console.log("beatmatched between tempos", oldTempo, newTempo);
                        return [2 /*return*/, [tempoTransition, beatMatch, beatMatch2]];
                }
            });
        });
    };
    MixGenerator.prototype.applyFadeIn = function (newSongBarsParts) {
        return __awaiter(this, void 0, Promise, function () {
            var fadeDuration, fadeRamp, fadeIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTotalDuration(newSongBarsParts)];
                    case 1:
                        fadeDuration = _a.sent();
                        return [4 /*yield*/, this.addRampWithTrigger(fadeDuration)];
                    case 2:
                        fadeRamp = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(fadeRamp, newSongBarsParts, 'Amplitude(d) == r')];
                    case 3:
                        fadeIn = _a.sent();
                        console.log("fading in for", newSongBarsParts.length, "bars (" + fadeDuration + " seconds)");
                        return [2 /*return*/, [fadeDuration, [fadeRamp, fadeIn]]];
                }
            });
        });
    };
    MixGenerator.prototype.applyCrossfade = function (oldSongParts, newSongParts, duration) {
        return __awaiter(this, void 0, Promise, function () {
            var fadeRamp, fadeIn, fadeOut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.addRampWithTrigger(duration)];
                    case 1:
                        fadeRamp = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(fadeRamp, newSongParts, 'Amplitude(d) == r')];
                    case 2:
                        fadeIn = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(fadeRamp, oldSongParts, 'Amplitude(d) == 1-r')];
                    case 3:
                        fadeOut = _a.sent();
                        console.log("crossfading for", newSongParts.length, "bars (" + duration + " seconds)");
                        return [2 /*return*/, [fadeRamp, fadeIn, fadeOut]];
                }
            });
        });
    };
    //TODO dymo-core throws the occasional error due to list editing concurrency problem
    MixGenerator.prototype.addRandomBeatToLoop = function (songUri, loopDuration) {
        if (loopDuration === void 0) { loopDuration = 2; }
        return __awaiter(this, void 0, Promise, function () {
            var currentBeats, bars, randomBar, randomBeat, silenceUri, currentOnsets, randomOnset, beatPosition;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.store.findParts(this.mixDymoUri)];
                    case 1:
                        currentBeats = _a.sent();
                        return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 2:
                        bars = _a.sent();
                        randomBar = bars[__WEBPACK_IMPORTED_MODULE_0_lodash__["random"](bars.length)];
                        return [4 /*yield*/, this.store.findParts(randomBar)];
                    case 3:
                        randomBeat = (_a.sent())[__WEBPACK_IMPORTED_MODULE_0_lodash__["random"](4)];
                        if (!(currentBeats.length == 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.generator.addDymo(this.mixDymoUri)];
                    case 4:
                        silenceUri = _a.sent();
                        return [4 /*yield*/, this.store.setParameter(silenceUri, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].ONSET, 0)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.generator.addDymo(this.mixDymoUri)];
                    case 6:
                        silenceUri = _a.sent();
                        return [4 /*yield*/, this.store.setParameter(silenceUri, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].ONSET, loopDuration)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.store.findParts(this.mixDymoUri)];
                    case 8:
                        currentBeats = _a.sent();
                        _a.label = 9;
                    case 9: return [4 /*yield*/, Promise.all(currentBeats.map(function (b) { return _this.store.findParameterValue(b, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].ONSET); }))];
                    case 10:
                        currentOnsets = _a.sent();
                        randomOnset = __WEBPACK_IMPORTED_MODULE_0_lodash__["random"](loopDuration, true);
                        return [4 /*yield*/, this.store.setParameter(randomBeat, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].ONSET, randomOnset)];
                    case 11:
                        _a.sent();
                        beatPosition = currentOnsets.filter(function (o) { return o < randomOnset; }).length;
                        return [2 /*return*/, this.store.insertPartAt(this.mixDymoUri, randomBeat, beatPosition)];
                }
            });
        });
    };
    MixGenerator.prototype.transitionImmediatelyToRandomBars = function (songUri, numBars) {
        if (numBars === void 0) { numBars = 2; }
        return __awaiter(this, void 0, Promise, function () {
            var bars, randomBar;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 1:
                        bars = _a.sent();
                        randomBar = __WEBPACK_IMPORTED_MODULE_0_lodash__["random"](bars.length - numBars);
                        return [2 /*return*/, Promise.all(bars.slice(randomBar, randomBar + numBars).map(function (p) {
                                return _this.store.addPart(_this.mixDymoUri, p);
                            }))];
                }
            });
        });
    };
    /**loads the controls and constraints and adds the latter to the list*/
    MixGenerator.prototype.loadTransition = function () {
        var uris = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uris[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var _a, loaded;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (_a = this.player.getDymoManager()).loadFromStore.apply(_a, uris)];
                    case 1:
                        loaded = _b.sent();
                        //TODO NOW ADD CONSTRAINT TRIGGERS
                        return [4 /*yield*/, this.addConstraintTriggers(loaded.constraintUris)];
                    case 2:
                        //TODO NOW ADD CONSTRAINT TRIGGERS
                        _b.sent();
                        this.transitionConstraints.push(loaded.constraintUris);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**removes old song until current position + offset, registers new song and gets bars*/
    MixGenerator.prototype.initTransition = function (songUri, newOffsetBars) {
        return __awaiter(this, void 0, Promise, function () {
            var newSongBars, currentPos, offset, oldSongBars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri, newOffsetBars)];
                    case 1:
                        newSongBars = _a.sent();
                        return [4 /*yield*/, this.player.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _a.sent();
                        offset = currentPos + TRANSITION_OFFSET;
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, offset)];
                    case 3:
                        oldSongBars = _a.sent();
                        return [2 /*return*/, { removedOldSongBars: oldSongBars, newSongBars: newSongBars }];
                }
            });
        });
    };
    /**adds new song bars and returns transition object*/
    MixGenerator.prototype.endTransition = function (newSongBars, type, duration, transitionUris) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!__WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"]) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadTransition.apply(this, transitionUris)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, this.getTransitionObject(type, duration)];
                }
            });
        });
    };
    MixGenerator.prototype.registerSongAndGetBars = function (songUri, offset) {
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var bars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.songs.push(songUri);
                        return [4 /*yield*/, this.store.findParts(songUri)];
                    case 1:
                        bars = _a.sent();
                        return [2 /*return*/, bars.slice(offset)];
                }
            });
        });
    };
    MixGenerator.prototype.addRampWithTrigger = function (duration) {
        return __awaiter(this, void 0, void 0, function () {
            var rampUri;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.generator.addRampControl(0, duration, 100)];
                    case 1:
                        rampUri = _a.sent();
                        return [4 /*yield*/, this.addControlTrigger(rampUri)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, rampUri];
                }
            });
        });
    };
    MixGenerator.prototype.addControlTrigger = function (controlUri) {
        return __awaiter(this, void 0, void 0, function () {
            var trigger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.store
                            .setControlParam(controlUri, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].AUTO_CONTROL_TRIGGER, 0)];
                    case 1:
                        trigger = _a.sent();
                        return [4 /*yield*/, this.generator.addEvent(this.mixDymoUri, trigger, 1)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MixGenerator.prototype.addConstraintTriggers = function (newUris) {
        return __awaiter(this, void 0, void 0, function () {
            var previousConstraints;
            return __generator(this, function (_a) {
                if (this.transitionConstraints.length > 1) {
                    previousConstraints = __WEBPACK_IMPORTED_MODULE_0_lodash__["last"](this.transitionConstraints);
                    /*TODO ADD EVENT TO DEACTIVATE PREVIOUS CONSTRAINTS AND ACTIVATE NEW ONES
                    this.store.deactivateConstraints(previousConstraints);*/
                }
                return [2 /*return*/];
            });
        });
    };
    MixGenerator.prototype.makeCrossfade = function (rampUri, oldSongUris, newSongUris) {
        return __awaiter(this, void 0, Promise, function () {
            var fadeOut, fadeIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.makeRampConstraint(rampUri, oldSongUris, 'Amplitude(d) == 1-r')];
                    case 1:
                        fadeOut = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(rampUri, newSongUris, 'Amplitude(d) == r')];
                    case 2:
                        fadeIn = _a.sent();
                        /*var fadeOut2 = await this.makeRampConstraint(rampUri, oldSongUris, 'DurationRatio(d) == 1/(1-r)');
                        var fadeIn2 = await this.makeRampConstraint(rampUri, newSongUris, 'DurationRatio(d) == 1/r');*/
                        return [2 /*return*/, [fadeOut, fadeIn].filter(function (c) { return c; })]; //remove undefined
                }
            });
        });
    };
    MixGenerator.prototype.makeRampConstraint = function (rampUri, dymoUris, expression) {
        if (dymoUris.length > 0) {
            return this.makeSetsConstraint([['d', dymoUris], ['r', [rampUri]]], expression);
        }
    };
    MixGenerator.prototype.makeSetsConstraint = function (sets, expression) {
        var vars = sets.map(function (s) { return '∀ ' + s[0] + ' in ' + JSON.stringify(s[1]) + ' => '; }).join('');
        return this.expressionGen.addConstraint(this.mixDymoUri, vars + expression, true);
    };
    MixGenerator.prototype.getTempoFromBars = function (barUris) {
        return __awaiter(this, void 0, Promise, function () {
            var avgDuration, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = __WEBPACK_IMPORTED_MODULE_0_lodash__).mean;
                        return [4 /*yield*/, this.getFeature(barUris, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 1:
                        avgDuration = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, 60 / (avgDuration / 4)];
                }
            });
        });
    };
    //returns an initial segment of bars with at most the given duration
    MixGenerator.prototype.getInitialBars = function (bars, duration) {
        return __awaiter(this, void 0, Promise, function () {
            var currentDuration;
            var _this = this;
            return __generator(this, function (_a) {
                currentDuration = 0;
                return [2 /*return*/, __WEBPACK_IMPORTED_MODULE_0_lodash__["takeWhile"](bars, function (b, i) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = currentDuration;
                                    return [4 /*yield*/, this.store.findFeatureValue(b, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                                case 1:
                                    currentDuration = _a + _b.sent();
                                    return [2 /*return*/, currentDuration < duration];
                            }
                        });
                    }); })];
            });
        });
    };
    /**returns the last bars*/
    MixGenerator.prototype.findLastBar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = __WEBPACK_IMPORTED_MODULE_0_lodash__).last;
                        return [4 /*yield*/, this.store.findParts(this.mixDymoUri)];
                    case 1: 
                    //return (await this.store.findParts(this.mixDymoUri)).slice(-n);
                    return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    MixGenerator.prototype.getTotalDuration = function (dymoUris) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = __WEBPACK_IMPORTED_MODULE_0_lodash__).sum;
                        return [4 /*yield*/, this.getFeature(dymoUris, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    MixGenerator.prototype.getFeature = function (dymoUris, featureUri) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(dymoUris.map(function (d) { return _this.store.findFeatureValue(d, featureUri); }))];
            });
        });
    };
    MixGenerator.prototype.getTransitionObject = function (type, duration) {
        return {
            date: new Date(Date.now()),
            user: null,
            rating: null,
            names: null,
            features: null,
            decision: null,
            type: type,
            parameters: null,
            duration: duration
        };
    };
    return MixGenerator;
}());

//# sourceMappingURL=mix-generator.js.map

/***/ }),

/***/ "../../../../../src/app/mix/types.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DecisionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TransitionType; });
var DecisionType;
(function (DecisionType) {
    DecisionType[DecisionType["Default"] = 0] = "Default";
    DecisionType[DecisionType["Random"] = 1] = "Random";
    DecisionType[DecisionType["DecisionTree"] = 2] = "DecisionTree";
})(DecisionType || (DecisionType = {}));
var TransitionType;
(function (TransitionType) {
    TransitionType[TransitionType["FadeIn"] = 0] = "FadeIn";
    TransitionType[TransitionType["Slam"] = 1] = "Slam";
    TransitionType[TransitionType["BeatRepeat"] = 2] = "BeatRepeat";
    TransitionType[TransitionType["Crossfade"] = 3] = "Crossfade";
    TransitionType[TransitionType["Beatmatch"] = 4] = "Beatmatch";
    TransitionType[TransitionType["BeatmatchMultiple"] = 5] = "BeatmatchMultiple";
    TransitionType[TransitionType["EchoFreeze"] = 6] = "EchoFreeze";
    TransitionType[TransitionType["PowerDown"] = 7] = "PowerDown";
    TransitionType[TransitionType["Effects"] = 8] = "Effects";
})(TransitionType || (TransitionType = {}));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "../../../../../src/app/util.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getGuid;
/**
 * @function _guid
 * @description Creates GUID for user based on several different browser variables
 * It will never be RFC4122 compliant but it is robust
 * @returns {Number}
 * @private
 */
function getGuid() {
    var nav = window.navigator;
    var screen = window.screen;
    var guid = nav.mimeTypes.length.toString();
    guid += nav.userAgent.replace(/\D+/g, '');
    guid += nav.plugins.length;
    guid += screen.height || '';
    guid += screen.width || '';
    guid += screen.pixelDepth || '';
    return guid;
}
;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../n3/lib recursive ^\\.\\/N3.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./N3Lexer": "../../../../n3/lib/N3Lexer.js",
	"./N3Lexer.js": "../../../../n3/lib/N3Lexer.js",
	"./N3Parser": "../../../../n3/lib/N3Parser.js",
	"./N3Parser.js": "../../../../n3/lib/N3Parser.js",
	"./N3Store": "../../../../n3/lib/N3Store.js",
	"./N3Store.js": "../../../../n3/lib/N3Store.js",
	"./N3StreamParser": "../../../../n3/lib/N3StreamParser.js",
	"./N3StreamParser.js": "../../../../n3/lib/N3StreamParser.js",
	"./N3StreamWriter": "../../../../n3/lib/N3StreamWriter.js",
	"./N3StreamWriter.js": "../../../../n3/lib/N3StreamWriter.js",
	"./N3Util": "../../../../n3/lib/N3Util.js",
	"./N3Util.js": "../../../../n3/lib/N3Util.js",
	"./N3Writer": "../../../../n3/lib/N3Writer.js",
	"./N3Writer.js": "../../../../n3/lib/N3Writer.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../n3/lib recursive ^\\.\\/N3.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map