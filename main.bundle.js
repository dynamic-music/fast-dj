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

var ApiService = (function () {
    function ApiService() {
        this.API_URL = "https://fast-dj-api.herokuapp.com/"; //"http://localhost:8060/";
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var AppComponent = (function () {
    function AppComponent(route, apiService, extractionService) {
        var _this = this;
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
        this.dj = new __WEBPACK_IMPORTED_MODULE_5__mix_auto_dj__["a" /* AutoDj */](null, this.extractionService);
        this.dj.init().then(function () {
            _this.status = 'READY';
            _this.message = 'drop audio here';
        });
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
                        return [4 /*yield*/, this.dj.getBeatObservable()];
                    case 1:
                        (_a.sent())
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
            var _this = this;
            var url, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.ratingDone || this.state.status.type === 'READY')) return [3 /*break*/, 2];
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
                        console.log("duration", this.lastTransition.duration);
                        //when transition done:
                        setTimeout(function () {
                            _this.transitionDone = true;
                            _this.message = "playing " + acceptedFile.file.name.toLowerCase();
                        }, this.lastTransition.duration * 1000 + 1000);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
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
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__api_service__["a" /* ApiService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _c || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c;
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









var AppModule = (function () {
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

var DevControlsComponent = (function () {
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
var FeatureExtractionService = (function () {
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var Analyzer = (function () {
    function Analyzer(store) {
        this.store = store;
        this.beatsCache = new Map();
        this.keysCache = new Map();
    }
    Analyzer.prototype.getAllFeatures = function (song1, song2) {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
            var durations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBeatDurations(songUri)];
                    case 1:
                        durations = _a.sent();
                        //console.log("tempo", 60/math.mean(durations))
                        return [2 /*return*/, 60 / __WEBPACK_IMPORTED_MODULE_1_mathjs__["mean"](durations)];
                }
            });
        });
    };
    Analyzer.prototype.getTempoMultiple = function (song1Uri, song2Uri) {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRegularity(songUri)];
                    case 1: return [2 /*return*/, (_a.sent()) < .1];
                }
            });
        });
    };
    Analyzer.prototype.getRegularity = function (songUri) {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var bars, beats, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!!this.beatsCache.has(songUri)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.store.findParts(songUri)];
                    case 1:
                        bars = _f.sent();
                        _b = (_a = __WEBPACK_IMPORTED_MODULE_0_lodash__).flatten;
                        return [4 /*yield*/, Promise.all(bars.map(function (p) { return _this.store.findParts(p); }))];
                    case 2:
                        beats = _b.apply(_a, [_f.sent()]);
                        _d = (_c = this.beatsCache).set;
                        _e = [songUri];
                        return [4 /*yield*/, Promise.all(beats.map(function (b) { return _this.store.findFeatureValue(b, __WEBPACK_IMPORTED_MODULE_2_dymo_core__["uris"].DURATION_FEATURE); }))];
                    case 3:
                        _d.apply(_c, _e.concat([_f.sent()]));
                        _f.label = 4;
                    case 4: return [2 /*return*/, this.beatsCache.get(songUri)];
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dymo_core__ = __webpack_require__("../../../../dymo-core/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dymo_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mix_generator__ = __webpack_require__("../../../../../src/app/mix/mix-generator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__("../../../../../src/app/types.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__analyzer__ = __webpack_require__("../../../../../src/app/mix/analyzer.ts");
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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





var AutoDj = (function () {
    function AutoDj(featureApi, extractionService) {
        this.featureApi = featureApi;
        this.extractionService = extractionService;
        this.previousPlayingDymos = [];
        this.previousSongs = [];
        //d;
        this.manager = new __WEBPACK_IMPORTED_MODULE_1_dymo_core__["DymoManager"](undefined, 1, null, null, 'https://dynamic-music.github.io/dymo-core/audio/impulse_rev.wav');
    }
    AutoDj.prototype.init = function () {
        var _this = this;
        return this.manager.init('https://raw.githubusercontent.com/dynamic-music/dymo-core/master/ontologies/') //'https://dynamic-music.github.io/dymo-core/ontologies/')
            .then(function () {
            _this.store = _this.manager.getStore();
            _this.dymoGen = new __WEBPACK_IMPORTED_MODULE_1_dymo_core__["DymoGenerator"](_this.store);
            _this.mixGen = new __WEBPACK_IMPORTED_MODULE_2__mix_generator__["a" /* MixGenerator */](_this.dymoGen, _this.manager);
            _this.analyzer = new __WEBPACK_IMPORTED_MODULE_4__analyzer__["a" /* Analyzer */](_this.store);
        });
    };
    AutoDj.prototype.getBeatObservable = function () {
        var _this = this;
        return (this.manager.getPlayingDymoUris())
            .filter(function (playingDymos) {
            // TODO identify which track is playing, and associate with a specific colour
            var nChanged = __WEBPACK_IMPORTED_MODULE_0_lodash__["difference"](playingDymos, _this.previousPlayingDymos).length;
            _this.previousPlayingDymos = playingDymos;
            return nChanged > 0;
        });
    };
    AutoDj.prototype.transitionToSong = function (audioUri) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, beats, newSong, keys, oldSong, transition, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.manager.getAudioBank()];
                    case 1: return [4 /*yield*/, (_b.sent()).getAudioBuffer(audioUri)];
                    case 2:
                        buffer = _b.sent();
                        return [4 /*yield*/, this.extractionService.extractBeats(buffer)];
                    case 3:
                        beats = _b.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["DymoTemplates"].createAnnotatedBarAndBeatDymo2(this.dymoGen, audioUri, beats)];
                    case 4:
                        newSong = _b.sent();
                        return [4 /*yield*/, this.extractionService.extractKey(buffer)];
                    case 5:
                        keys = _b.sent();
                        this.dymoGen.setSummarizingMode(__WEBPACK_IMPORTED_MODULE_1_dymo_core__["globals"].SUMMARY.MODE);
                        return [4 /*yield*/, this.dymoGen.addFeature("key", keys, newSong)];
                    case 6:
                        _b.sent();
                        oldSong = __WEBPACK_IMPORTED_MODULE_0_lodash__["last"](this.previousSongs);
                        return [4 /*yield*/, this.internalTransition(newSong)];
                    case 7:
                        transition = _b.sent();
                        if (!(this.previousSongs.length > 1)) return [3 /*break*/, 9];
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
        return __awaiter(this, void 0, void 0, function () {
            var transition // = this.defaultTransition(newSong);
            ;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.manager.loadFromStore(newSong)];
                    case 1:
                        _a.sent();
                        if (Math.random() > 0.5) {
                            transition = this.randomTransition(newSong);
                        }
                        else {
                            transition = this.startWhicheverTransitionIsBest(newSong);
                        }
                        this.previousSongs.push(newSong);
                        this.keepOnPlaying(this.mixGen.getMixDymo());
                        return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.defaultTransition = function (newSong) {
        return __awaiter(this, void 0, void 0, function () {
            var transition, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        transition = this.getEmptyTransitionObject();
                        transition.decision = __WEBPACK_IMPORTED_MODULE_3__types__["a" /* DecisionType */].Default;
                        if (!(this.previousSongs.length > 0)) return [3 /*break*/, 2];
                        //await this.startWhicheverTransitionIsBest(newSong);
                        //(this.getRandomTransition())(newDymo);
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].BeatRepeat;
                        _a = transition;
                        return [4 /*yield*/, this.mixGen.beatRepeat(newSong)];
                    case 1:
                        _a.duration = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].FadeIn;
                        _b = transition;
                        return [4 /*yield*/, this.mixGen.startMixWithFadeIn(newSong)];
                    case 3:
                        _b.duration = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.randomTransition = function (newSong) {
        return __awaiter(this, void 0, void 0, function () {
            var transition, random, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("random");
                        transition = this.getEmptyTransitionObject();
                        transition.decision = __WEBPACK_IMPORTED_MODULE_3__types__["a" /* DecisionType */].Random;
                        if (!(this.previousSongs.length > 0)) return [3 /*break*/, 2];
                        random = (this.getRandomTransition());
                        transition.type = random[1];
                        _a = transition;
                        return [4 /*yield*/, random[0](newSong)];
                    case 1:
                        _a.duration = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].FadeIn;
                        _b = transition;
                        return [4 /*yield*/, this.mixGen.startMixWithFadeIn(newSong)];
                    case 3:
                        _b.duration = _c.sent();
                        _c.label = 4;
                    case 4: return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.getEmptyTransitionObject = function () {
        return {
            date: new Date(Date.now()),
            user: null,
            rating: null,
            names: null,
            features: null,
            decision: null,
            type: null,
            parameters: null,
            duration: null
        };
    };
    AutoDj.prototype.startWhicheverTransitionIsBest = function (newSong) {
        return __awaiter(this, void 0, void 0, function () {
            var transition, previousSong, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        console.log("tree");
                        transition = this.getEmptyTransitionObject();
                        transition.decision = __WEBPACK_IMPORTED_MODULE_3__types__["a" /* DecisionType */].DecisionTree;
                        previousSong = __WEBPACK_IMPORTED_MODULE_0_lodash__["last"](this.previousSongs);
                        if (!(this.previousSongs.length == 0)) return [3 /*break*/, 2];
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].FadeIn;
                        _a = transition;
                        return [4 /*yield*/, this.mixGen.startMixWithFadeIn(newSong)];
                    case 1:
                        _a.duration = _l.sent();
                        return [3 /*break*/, 26];
                    case 2: return [4 /*yield*/, this.analyzer.hasRegularBeats(newSong)];
                    case 3:
                        _b = (_l.sent());
                        if (!_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.analyzer.hasRegularBeats(previousSong)];
                    case 4:
                        _b = (_l.sent());
                        _l.label = 5;
                    case 5:
                        if (!_b) return [3 /*break*/, 19];
                        console.log("both regular");
                        return [4 /*yield*/, this.analyzer.tempoSimilar(newSong, previousSong)];
                    case 6:
                        if (!_l.sent()) return [3 /*break*/, 8];
                        console.log("tempo similar");
                        //transition using beatmatching and tempo interpolation
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Beatmatch;
                        _c = transition;
                        return [4 /*yield*/, this.mixGen.beatmatchCrossfade(newSong)];
                    case 7:
                        _c.duration = _l.sent();
                        return [3 /*break*/, 18];
                    case 8: return [4 /*yield*/, this.analyzer.getKeyDistance(newSong, previousSong)];
                    case 9:
                        if (!((_l.sent()) <= 2)) return [3 /*break*/, 14];
                        console.log("key similar");
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 11];
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Effects;
                        _d = transition;
                        return [4 /*yield*/, this.mixGen.reverbPanDirect(newSong)];
                    case 10:
                        _d.duration = _l.sent();
                        return [3 /*break*/, 13];
                    case 11:
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].EchoFreeze;
                        _e = transition;
                        return [4 /*yield*/, this.mixGen.echoFreeze(newSong)];
                    case 12:
                        _e.duration = _l.sent();
                        _l.label = 13;
                    case 13: return [3 /*break*/, 18];
                    case 14:
                        console.log("give up");
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 16];
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Effects;
                        _f = transition;
                        return [4 /*yield*/, this.mixGen.beatRepeat(newSong)];
                    case 15:
                        _f.duration = _l.sent();
                        return [3 /*break*/, 18];
                    case 16:
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].PowerDown;
                        _g = transition;
                        return [4 /*yield*/, this.mixGen.powerDown(newSong)];
                    case 17:
                        _g.duration = _l.sent();
                        _l.label = 18;
                    case 18: return [3 /*break*/, 26];
                    case 19: return [4 /*yield*/, this.analyzer.getKeyDistance(newSong, previousSong)];
                    case 20:
                        if (!((_l.sent()) <= 2)) return [3 /*break*/, 22];
                        console.log("key similar");
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].EchoFreeze;
                        _h = transition;
                        return [4 /*yield*/, this.mixGen.echoFreeze(newSong)];
                    case 21:
                        _h.duration = _l.sent();
                        return [3 /*break*/, 26];
                    case 22:
                        console.log("give up");
                        if (!(Math.random() > 0.5)) return [3 /*break*/, 24];
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Effects;
                        _j = transition;
                        return [4 /*yield*/, this.mixGen.beatRepeat(newSong)];
                    case 23:
                        _j.duration = _l.sent();
                        return [3 /*break*/, 26];
                    case 24:
                        transition.type = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].PowerDown;
                        _k = transition;
                        return [4 /*yield*/, this.mixGen.powerDown(newSong)];
                    case 25:
                        _k.duration = _l.sent();
                        _l.label = 26;
                    case 26: return [2 /*return*/, transition];
                }
            });
        });
    };
    AutoDj.prototype.getRandomTransition = function () {
        var _this = this;
        var transitions = [
            [function (newDymo) { return _this.mixGen.beatmatchCrossfade(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Beatmatch],
            [function (newDymo) { return _this.mixGen.echoFreeze(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].EchoFreeze],
            [function (newDymo) { return _this.mixGen.direct(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Slam],
            [function (newDymo) { return _this.mixGen.beatRepeat(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].BeatRepeat],
            [function (newDymo) { return _this.mixGen.crossfade(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Crossfade],
            [function (newDymo) { return _this.mixGen.powerDown(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].PowerDown],
            [function (newDymo) { return _this.mixGen.reverbPanDirect(newDymo); }, __WEBPACK_IMPORTED_MODULE_3__types__["b" /* TransitionType */].Effects]
        ];
        return transitions[__WEBPACK_IMPORTED_MODULE_0_lodash__["random"](transitions.length)];
    };
    AutoDj.prototype.keepOnPlaying = function (dymoUri) {
        if (!this.isPlaying) {
            this.manager.startPlayingUri(dymoUri);
            this.isPlaying = true;
        }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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


//export const TRANSITIONS: Map<string,Function> = new Map<string,Function>();
//TRANSITIONS.set("BeatmatchCrossfade", )
var TRIGGER_DELAY = 3;
var MixGenerator = (function () {
    function MixGenerator(generator, manager) {
        this.generator = generator;
        this.manager = manager;
        this.songs = [];
        this.transitions = []; //ARRAY OF CONSTRAINT URIS FOR NOW
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
        if (numBars === void 0) { numBars = 3; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, _a, duration, uris;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 1:
                        newSongBars = _b.sent();
                        return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.applyFadeIn(newSongBars.slice(0, numBars))];
                    case 3:
                        _a = _b.sent(), duration = _a[0], uris = _a[1];
                        return [4 /*yield*/, this.loadAndTriggerTransition.apply(this, uris)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, duration + TRIGGER_DELAY];
                }
            });
        });
    };
    MixGenerator.prototype.direct = function (songUri, offsetBars) {
        if (offsetBars === void 0) { offsetBars = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri, offsetBars)];
                    case 1:
                        newSongBars = _a.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _a.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + 1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, TRIGGER_DELAY];
                }
            });
        });
    };
    MixGenerator.prototype.beatRepeat = function (songUri, times, offsetBars) {
        if (times === void 0) { times = 2; }
        if (offsetBars === void 0) { offsetBars = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos, oldSongBars, lastBar, lastBeat, lastBarDuration, firstBarBeats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri, offsetBars)];
                    case 1:
                        newSongBars = _a.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _a.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + 1)];
                    case 3:
                        oldSongBars = _a.sent();
                        return [4 /*yield*/, this.store.findPartAt(this.mixDymoUri, currentPos)];
                    case 4:
                        lastBar = _a.sent();
                        return [4 /*yield*/, this.store.findPartAt(lastBar, 3)];
                    case 5:
                        lastBeat = _a.sent();
                        return [4 /*yield*/, this.store.setParameter(lastBeat, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].REVERB, 0.5)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.store.findFeatureValue(oldSongBars[0], __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 7:
                        lastBarDuration = _a.sent();
                        return [4 /*yield*/, this.addSilence(lastBarDuration / 2)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.store.findParts(newSongBars[0])];
                    case 9:
                        firstBarBeats = _a.sent();
                        return [4 /*yield*/, this.addPartsToMix(__WEBPACK_IMPORTED_MODULE_0_lodash__["fill"](Array(times), firstBarBeats[0]))];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, 2 + TRIGGER_DELAY]; //just an estimate for now
                }
            });
        });
    };
    MixGenerator.prototype.echoFreeze = function (songUri, numBarsBreak) {
        if (numBarsBreak === void 0) { numBarsBreak = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos, lastBar, lastBarDuration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 1:
                        newSongBars = _a.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _a.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + 1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.store.findPartAt(this.mixDymoUri, currentPos)];
                    case 4:
                        lastBar = _a.sent();
                        return [4 /*yield*/, this.store.setParameter(lastBar, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DELAY, 1)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.store.findFeatureValue(lastBar, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 6:
                        lastBarDuration = _a.sent();
                        return [4 /*yield*/, this.addSilence(lastBarDuration * numBarsBreak)];
                    case 7:
                        _a.sent();
                        //add new song
                        return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 8:
                        //add new song
                        _a.sent();
                        return [2 /*return*/, lastBarDuration * (numBarsBreak + 1) + TRIGGER_DELAY];
                }
            });
        });
    };
    MixGenerator.prototype.reverbPanDirect = function (songUri, numBars, offsetBars) {
        if (numBars === void 0) { numBars = 3; }
        if (offsetBars === void 0) { offsetBars = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos, lastBars, lastBarDuration, effectsDuration, effectsRamp, reverb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 1:
                        newSongBars = _a.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _a.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + numBars)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.store.findParts(this.mixDymoUri)];
                    case 4:
                        lastBars = (_a.sent()).slice(-numBars);
                        return [4 /*yield*/, this.store.findFeatureValue(lastBars[0], __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 5:
                        lastBarDuration = _a.sent();
                        effectsDuration = lastBarDuration * numBars;
                        return [4 /*yield*/, this.generator.addRampControl(0, effectsDuration, 100)];
                    case 6:
                        effectsRamp = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(effectsRamp, lastBars, 'Reverb(d) == r')];
                    case 7:
                        reverb = _a.sent();
                        //add new song
                        return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 8:
                        //add new song
                        _a.sent();
                        return [4 /*yield*/, this.loadAndTriggerTransition(effectsRamp, reverb)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, effectsDuration + TRIGGER_DELAY];
                }
            });
        });
    };
    MixGenerator.prototype.powerDown = function (songUri, numBars, numBarsBreak) {
        if (numBars === void 0) { numBars = 2; }
        if (numBarsBreak === void 0) { numBarsBreak = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos, lastBars, lastBarDuration, powerDuration, powerRamp, powerDown, powerDown2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri)];
                    case 1:
                        newSongBars = _a.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _a.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + numBars)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.store.findParts(this.mixDymoUri)];
                    case 4:
                        lastBars = (_a.sent()).slice(-numBars);
                        return [4 /*yield*/, this.store.findFeatureValue(lastBars[0], __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].DURATION_FEATURE)];
                    case 5:
                        lastBarDuration = _a.sent();
                        powerDuration = lastBarDuration * numBars * 2;
                        return [4 /*yield*/, this.generator.addRampControl(0, powerDuration, 100)];
                    case 6:
                        powerRamp = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(powerRamp, lastBars, 'PlaybackRate(d) == 1-r')];
                    case 7:
                        powerDown = _a.sent();
                        return [4 /*yield*/, this.makeSetsConstraint([['d', lastBars]], 'DurationRatio(d) == 1/PlaybackRate(d)')];
                    case 8:
                        powerDown2 = _a.sent();
                        //add silence for n bars
                        return [4 /*yield*/, this.addSilence(lastBarDuration * numBarsBreak)];
                    case 9:
                        //add silence for n bars
                        _a.sent();
                        //add new song
                        return [4 /*yield*/, this.addPartsToMix(newSongBars)];
                    case 10:
                        //add new song
                        _a.sent();
                        return [4 /*yield*/, this.loadAndTriggerTransition(powerRamp, powerDown, powerDown2)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/, powerDuration + numBarsBreak + TRIGGER_DELAY];
                }
            });
        });
    };
    MixGenerator.prototype.crossfade = function (songUri, numBars, offsetBars) {
        if (numBars === void 0) { numBars = 4; }
        if (offsetBars === void 0) { offsetBars = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos, restOfOldSong, newSongTrans, oldSongTrans, _a, duration, uris;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri, offsetBars)];
                    case 1:
                        newSongBars = _b.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _b.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + 1)];
                    case 3:
                        restOfOldSong = _b.sent();
                        newSongTrans = newSongBars.slice(0, numBars);
                        return [4 /*yield*/, this.applyAlign(restOfOldSong, newSongTrans)];
                    case 4:
                        oldSongTrans = _b.sent();
                        return [4 /*yield*/, this.addPartsToMix(newSongBars.slice(numBars))];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.applyCrossfade(oldSongTrans, newSongTrans)];
                    case 6:
                        _a = _b.sent(), duration = _a[0], uris = _a[1];
                        return [4 /*yield*/, this.loadAndTriggerTransition.apply(this, uris)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, duration + TRIGGER_DELAY];
                }
            });
        });
    };
    MixGenerator.prototype.beatmatchCrossfade = function (songUri, numBars, offsetBars) {
        if (numBars === void 0) { numBars = 4; }
        if (offsetBars === void 0) { offsetBars = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newSongBars, currentPos, restOfOldSong, newSongTrans, oldSongTrans, _a, duration, uris1, uris2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.registerSongAndGetBars(songUri, offsetBars)];
                    case 1:
                        newSongBars = _b.sent();
                        return [4 /*yield*/, this.manager.getPosition(this.mixDymoUri)];
                    case 2:
                        currentPos = _b.sent();
                        return [4 /*yield*/, this.store.removeParts(this.mixDymoUri, currentPos + 1)];
                    case 3:
                        restOfOldSong = _b.sent();
                        newSongTrans = newSongBars.slice(0, numBars);
                        return [4 /*yield*/, this.applyPairwiseAlign(restOfOldSong, newSongTrans)];
                    case 4:
                        oldSongTrans = _b.sent();
                        return [4 /*yield*/, this.addPartsToMix(newSongBars.slice(numBars))];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, this.applyCrossfade(oldSongTrans, newSongTrans)];
                    case 6:
                        _a = _b.sent(), duration = _a[0], uris1 = _a[1];
                        return [4 /*yield*/, this.applyBeatmatch(oldSongTrans, newSongTrans, uris1[0])];
                    case 7:
                        uris2 = _b.sent();
                        return [4 /*yield*/, this.loadAndTriggerTransition.apply(this, uris1.concat(uris2))];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, duration + TRIGGER_DELAY];
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
    //returns uris of parts of old song that are part of transition
    MixGenerator.prototype.applyAlign = function (restOfOldSong, newSongTransitionBars) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var oldSongBars, oldSongSeq, newSongSeq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldSongBars = restOfOldSong.slice(0, newSongTransitionBars.length);
                        return [4 /*yield*/, this.generator.addDymo(null, null, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].SEQUENCE)];
                    case 1:
                        oldSongSeq = _a.sent();
                        return [4 /*yield*/, Promise.all(oldSongBars.map(function (p) { return _this.store.addPart(oldSongSeq, p); }))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.generator.addDymo(null, null, __WEBPACK_IMPORTED_MODULE_1_dymo_core__["uris"].SEQUENCE)];
                    case 3:
                        newSongSeq = _a.sent();
                        return [4 /*yield*/, Promise.all(newSongTransitionBars.map(function (p) { return _this.store.addPart(newSongSeq, p); }))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.generator.addConjunction(this.mixDymoUri, [oldSongSeq, newSongSeq])];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, oldSongBars];
                }
            });
        });
    };
    MixGenerator.prototype.applyPairwiseAlign = function (restOfOldSong, newSongTransitionBars) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var oldSongBars, barPairs;
            return __generator(this, function (_a) {
                oldSongBars = restOfOldSong.slice(0, newSongTransitionBars.length);
                barPairs = __WEBPACK_IMPORTED_MODULE_0_lodash__["zip"](oldSongBars, newSongTransitionBars);
                barPairs.forEach(function (bp) { return _this.generator.addConjunction(_this.mixDymoUri, bp); });
                return [2 /*return*/, oldSongBars];
            });
        });
    };
    MixGenerator.prototype.applyBeatmatch = function (oldSongBars, newSongBars, rampUri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tempoParam, newTempo, oldTempo, tempoTransition, beats, _a, _b, beatMatch, beatMatch2;
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
                        return [4 /*yield*/, this.makeSetsConstraint([['d', beats], ['t', [tempoParam]]], 'PlaybackRate(d) == t/60*DurationFeature(d)')];
                    case 6:
                        beatMatch = _c.sent();
                        return [4 /*yield*/, this.makeSetsConstraint([['d', beats]], 'DurationRatio(d) == 1/PlaybackRate(d)')];
                    case 7:
                        beatMatch2 = _c.sent();
                        console.log("beatmatched between tempos", oldTempo, newTempo);
                        return [2 /*return*/, [tempoTransition, beatMatch, beatMatch2]];
                }
            });
        });
    };
    MixGenerator.prototype.applyFadeIn = function (newSongBarsParts) {
        return __awaiter(this, void 0, void 0, function () {
            var fadeDuration, fadeRamp, fadeIn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTotalDuration(newSongBarsParts)];
                    case 1:
                        fadeDuration = _a.sent();
                        return [4 /*yield*/, this.generator.addRampControl(0, fadeDuration, 100)];
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
    MixGenerator.prototype.applyCrossfade = function (oldSongParts, newSongParts) {
        return __awaiter(this, void 0, void 0, function () {
            var fadeDuration, fadeRamp, fadeIn, fadeOut;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTotalDuration(oldSongParts.concat(newSongParts))];
                    case 1:
                        fadeDuration = ((_a.sent()) / 2);
                        return [4 /*yield*/, this.generator.addRampControl(0, fadeDuration, 100)];
                    case 2:
                        fadeRamp = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(fadeRamp, newSongParts, 'Amplitude(d) == r')];
                    case 3:
                        fadeIn = _a.sent();
                        return [4 /*yield*/, this.makeRampConstraint(fadeRamp, oldSongParts, 'Amplitude(d) == 1-r')];
                    case 4:
                        fadeOut = _a.sent();
                        console.log("crossfading in for", newSongParts.length, "bars (", fadeDuration, "seconds)");
                        return [2 /*return*/, [fadeDuration, [fadeRamp, fadeIn, fadeOut]]];
                }
            });
        });
    };
    //TODO dymo-core throws the occasional error due to list editing concurrency problem
    MixGenerator.prototype.addRandomBeatToLoop = function (songUri, loopDuration) {
        if (loopDuration === void 0) { loopDuration = 2; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentBeats, bars, randomBar, randomBeat, silenceUri, currentOnsets, randomOnset, beatPosition;
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var bars, randomBar;
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
    /**returns a number of controls that trigger the transition*/
    MixGenerator.prototype.loadAndTriggerTransition = function () {
        var _this = this;
        var uris = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uris[_i] = arguments[_i];
        }
        return (_a = this.manager).loadFromStore.apply(_a, uris).then(function (l) {
            //add loaded transition
            _this.transitions.push(l.constraintUris);
            //return controls
            return __WEBPACK_IMPORTED_MODULE_0_lodash__["values"](l.controls);
        })
            .then(function (controls) {
            //TODO LET SCHEDULER DO THIS!!!!
            setTimeout(function () {
                //stop previous transition
                if (_this.transitions.length > 1)
                    _this.store.deactivateConstraints(_this.transitions.slice(-2)[0]);
                //start new transition
                controls.forEach(function (c) { return c.startUpdate ? c.startUpdate() : null; });
            }, TRIGGER_DELAY * 1000); //arbitrary time TODO REMOVE ONCE DONE WITH EVENTS!!!
        });
        var _a;
    };
    MixGenerator.prototype.registerSongAndGetBars = function (songUri, offset) {
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
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
    MixGenerator.prototype.makeCrossfade = function (rampUri, oldSongUris, newSongUris) {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
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
    MixGenerator.prototype.getTotalDuration = function (dymoUris) {
        return __awaiter(this, void 0, void 0, function () {
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
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.all(dymoUris.map(function (d) { return _this.store.findFeatureValue(d, featureUri); }))];
            });
        });
    };
    return MixGenerator;
}());

//# sourceMappingURL=mix-generator.js.map

/***/ }),

/***/ "../../../../../src/app/types.ts":
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

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map