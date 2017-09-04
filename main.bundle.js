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

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".custom-component-drop-zone {\n  width: 100%;\n  height: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div\n  ng2FileDrop\n  class=\"custom-component-drop-zone\"\n  (ng2FileDropFileAccepted)=\"dragFileAccepted($event)\"\n>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dymo_core__ = __webpack_require__("../../../../dymo-core/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dymo_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_feature_extraction_feature_extraction_service__ = __webpack_require__("../../../../../src/app/services/feature-extraction/feature-extraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(extractionService) {
        var _this = this;
        this.extractionService = extractionService;
        this.title = 'app';
        this.isPlaying = false;
        this.previousDymos = [];
        __WEBPACK_IMPORTED_MODULE_2_dymo_core__["GlobalVars"].LOGGING_ON = true;
        this.manager = new __WEBPACK_IMPORTED_MODULE_2_dymo_core__["DymoManager"]();
        this.manager.init('https://semantic-player.github.io/dymo-core/ontologies/')
            .then(function () {
            var store = _this.manager.getStore();
            _this.dymoGen = new __WEBPACK_IMPORTED_MODULE_2_dymo_core__["DymoGenerator"](store);
            _this.mixGen = new __WEBPACK_IMPORTED_MODULE_2_dymo_core__["MixGenerator"](_this.dymoGen);
        });
        this.manager.getPlayingDymoUris()
            .subscribe(function (updatedDymos) {
            if (__WEBPACK_IMPORTED_MODULE_0_lodash__["difference"](updatedDymos, _this.previousDymos).length > 0) {
                console.log(updatedDymos);
            }
            _this.previousDymos = updatedDymos;
        });
    }
    AppComponent.prototype.dragFileAccepted = function (acceptedFile) {
        var _this = this;
        var url = URL.createObjectURL(acceptedFile.file);
        this.manager.getAudioBank().loadBuffer(url)
            .then(function (buffer) { return _this.extractionService.extractBeats(buffer); })
            .then(function (beats) { return __WEBPACK_IMPORTED_MODULE_2_dymo_core__["DymoTemplates"].createAnnotatedBarAndBeatDymo2(_this.dymoGen, url, beats); })
            .then(function (newDymo) { return _this.manager.loadFromStore(newDymo)
            .then(function () { return _this.mixGen.transitionToSong(newDymo, 1); }); })
            .then(function (mixDymo) { return _this.keepOnPlaying(mixDymo); });
    };
    AppComponent.prototype.keepOnPlaying = function (dymoUri) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.manager.startPlayingUri(dymoUri);
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_file_drop__ = __webpack_require__("../../../../ng2-file-drop/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_feature_extraction_feature_extraction_service__ = __webpack_require__("../../../../../src/app/services/feature-extraction/feature-extraction.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_ng2_file_drop__["a" /* Ng2FileDropModule */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__services_feature_extraction_feature_extraction_service__["a" /* FeatureExtractionService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/services/feature-extraction/feature-extraction.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeatureExtractionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
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
    FeatureExtractionService.prototype.extractBeats = function (buffer) {
        var _a = bufferToAudioData(buffer), channels = _a.channels, sampleRate = _a.sampleRate;
        return this.extract({
            audioData: channels,
            audioFormat: {
                sampleRate: sampleRate,
                channelCount: channels.length
            },
            key: 'qm-vamp-plugins:qm-barbeattracker',
            outputId: 'beats'
        }).then(mapFeaturesToBeats);
    };
    return FeatureExtractionService;
}());
FeatureExtractionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], FeatureExtractionService);

function mapFeaturesToBeats(response) {
    // TODO ought to actually validate the shape / type
    var featureData = response.features.collected;
    return featureData.map(function (feature) { return ({
        time: { value: Object(__WEBPACK_IMPORTED_MODULE_2_piper_js_time__["toSeconds"])(feature.timestamp) },
        label: { value: feature.label }
    }); });
}
//# sourceMappingURL=feature-extraction.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* enableProdMode */])();
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