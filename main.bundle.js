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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_service__ = __webpack_require__("../../../../../src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__("../../../../../src/app/util.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_auto_dj__ = __webpack_require__("../../../../auto-dj/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_auto_dj___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_auto_dj__);
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
    function AppComponent(route, apiService) {
        this.route = route;
        this.apiService = apiService;
        //accessed in html
        this.lastTransitionRating = 0;
        this.transitionDone = false;
        this.songNames = [];
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
                        this.dj = new __WEBPACK_IMPORTED_MODULE_5_auto_dj__["AutoDj"]();
                        return [4 /*yield*/, this.dj.isReady()];
                    case 1:
                        _a.sent();
                        this.status = 'READY';
                        this.message = 'drop audio here';
                        this.dj.getBeatObservable()
                            .subscribe(function (_) {
                            _this.status = _this.state.status.type === "SPINNING" ?
                                "spinning" : "SPINNING";
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //called from html
    AppComponent.prototype.dragFileAccepted = function (acceptedFile) {
        return __awaiter(this, void 0, void 0, function () {
            var url, _a;
            var _this = this;
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
                        //when transition done:
                        setTimeout(function () {
                            _this.transitionDone = true;
                            _this.message = "playing " + acceptedFile.file.name.toLowerCase();
                        }, this.lastTransition.duration * 1000 + 3000);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //called from html
    AppComponent.prototype.onRatingChange = function (event) {
        var _this = this;
        if (this.lastTransition) {
            this.lastTransition.user = Object(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* getUserGuid */])();
            this.lastTransition.rating = event.rating;
            this.lastTransition.names = this.songNames.slice(-2);
            this.apiService.addTransition(this.lastTransition);
            setTimeout(function () { return _this.ratingDone = true; }, 2000);
        }
    };
    AppComponent.prototype.getNextColour = function () {
        return this.cyclicColours.next().value;
    };
    var _a, _b;
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */]) === "function" && _b || Object])
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dev_controls_dev_controls_component__ = __webpack_require__("../../../../../src/app/dev-controls/dev-controls.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular_star_rating__ = __webpack_require__("../../../../angular-star-rating/esm5/angular-star-rating.js");
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
                __WEBPACK_IMPORTED_MODULE_6__dev_controls_dev_controls_component__["a" /* DevControlsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_file_drop__["a" /* Ng2FileDropModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* RouterModule */].forRoot([]),
                __WEBPACK_IMPORTED_MODULE_7_angular_star_rating__["a" /* StarRatingModule */].forRoot()
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */]
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

/***/ "../../../../../src/app/util.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getUserGuid;
/**
 * Creates GUID for user based on several different browser variables
 * It will never be RFC4122 compliant but it is robust
 */
function getUserGuid() {
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