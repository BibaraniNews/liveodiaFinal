﻿'use strict';
LiveOdiaApp.factory('detailnewsServiceFactory', ['$http', '$q', 'baseService', function ($http, $q, baseService) {
    debugger;
    var baseService = baseService;
    //var baseService = "http://www.liveodia.co/";
    var detailnewsServiceFactory = {};
    var _getDetailNews = function (id) {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/NewStory/' + id).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        });
        return deffer.promise;
    };

    var _getFullNews = function (nid) {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/Fullnews/' + nid).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        })

        return deffer.promise;
    };

    var _getHotFullNews = function (hnid) {
        debugger;
        var deffer = $q.defer();
        $http.get(baseService + 'api/Test' + hnid).success(function (data, status) {
            debugger;
            deffer.resolve(data);
        }).error(function (err, status) {
            debugger;
            deffer.reject(err);
        })

        return deffer.promise;
    };

    detailnewsServiceFactory.getDetailNews = _getDetailNews;
    detailnewsServiceFactory.getFullNews = _getFullNews;
    detailnewsServiceFactory.getHotFullNews = _getHotFullNews;

    return detailnewsServiceFactory;
}]);