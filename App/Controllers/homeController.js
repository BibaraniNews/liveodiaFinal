LiveOdiaApp.controller('homeController', ['$scope', '$rootScope', '$location', '$anchorScroll', '$route', '$routeParams', '$window', '$uibModal', 'homeServiceFactory', 'HotnewsServiceFactory', 'mobileCheck', function ($scope, $rootScope, $location, $anchorScroll, $route, $routeParams, $window, $uibModal, homeServiceFactory, HotnewsServiceFactory, mobileCheck) {
    $window.ga('send', 'HomePage', $location.path());
    $scope.mobile = mobileCheck;
    $scope.hotNews = [];
    $scope.topstories = [];
    $scope.newsories = [];
    $scope.filteredNews = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 10;
    $scope.maxSize = 5;
    $scope.fullnews = [];
    $scope.cleanData = [];
    $scope.topnews = [];
    $scope.hotnews = [];
    $scope.newstory = [];
    $scope.letterLimit = 120;
    $scope.impnewsLimit = 10;
    $scope.rid = null;
    $scope.tpnews = false;
    $scope.hnews = false;
    $scope.nstory = false;
    $scope.ipnews = false;
    $scope.isClosed = false;
    $scope.newsTitle = false;
    $scope.hnewsdetail = false;
    $scope.rfnews = false;
    $scope.impnews = [];
    $scope.imnews = [];
    $scope.relatedNews = [];
    $scope.hnewsData = [];
    $scope.rnewsdata = [];
    $scope.mycolor = "#000000";

    $scope.open = function (hnid) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: 'editnews.html',
            controller: 'editNewsController',
            resolve: {
                impnews: function () {
                    return $scope.imnews;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date() + " " + $scope.selected);
        });
    };

    $scope.editTopNews = function (hnid) {
        debugger;
        var modalInstance = $uibModal.open({
            templateUrl: 'editTopNews.html',
            controller: 'editTopNewsController',
            resolve: {
                tnews: function () {
                    return $scope.tnews;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date() + " " + $scope.selected);
        });
    };

    $scope.getFullRnews = function (fnid) {
        homeServiceFactory.getFullRnews(fnid).then(function (newsData) {
            if (newsData) {
                $scope.rnewsdata = newsData;
                if ($scope.rnewsdata[0].mycolor) {
                    $scope.CustomStyle = {
                        'color': $scope.rnewsdata[0].mycolor
                    };
                }
                $scope.ipnews = false;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
                $scope.rfnews = true;
            }
        });
    };

    $scope.GetImpNewsById = function (inid, rid) {
        debugger;
        $scope.rid = rid;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
    }
    //$scope.asideState = {
    //    open: false
    //};

    //$scope.openAside = function (position, backdrop) {
    //    $scope.asideState = {
    //        open: true,
    //        position: position
    //    };

    //    function postClose() {
    //        $scope.asideState.open = false;
    //    }

    //    $aside.open({
    //        templateUrl: 'aside.html',
    //        placement: position,
    //        size: 'sm',
    //        backdrop: backdrop,
    //        controller: function ($scope, $uibModalInstance) {
    //            $scope.ok = function (e) {
    //                $uibModalInstance.close();
    //                e.stopPropagation();
    //            };
    //            $scope.cancel = function (e) {
    //                $uibModalInstance.dismiss();
    //                e.stopPropagation();
    //            };
    //        }
    //    }).result.then(postClose, postClose);
    //}

    $scope.GetImpNewsById = function (inid) {
        //Scroll Problem Solved....

        if ($scope.mobile) {



            $('html, body').animate({
                scrollTop: $("#middle_content").offset().top - 100
            }, 2000);

            //$(this).find("middle_content").stop(true, true).fadeOut();
            $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function (e) {
                if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove") {
                    $("html,body").stop();
                }
            });
        }

        //$(window).scrollTop($('#middle_content').offset().top-100).fadeOut(1000);
        $window.ga('send', 'event', 'home', 'Get Imp News by Id');
        if (rid != 0 || rid != null) {
            homeServiceFactory.getRelatedNews(rid).then(function (rnews) {
                $scope.relatedNews = rnews;
            });
        }
        homeServiceFactory.GetImpNewsById(inid).then(function (newsData) {
            if (newsData) {
                $scope.imnews = newsData;
                if ($scope.imnews[0].mycolor) {
                    $scope.CustomStyle = {
                        'color': $scope.imnews[0].mycolor
                    };
                }
                $scope.ipnews = true;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
                $scope.rfnews = false;
            }
        });
    };

    $scope.DeleteImpNews = function (inid) {
        homeServiceFactory.DeleteImpNews(inid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.ipnews = false;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = true;
            }
        });
    }


    $scope.getImpNews = function () {
        homeServiceFactory.getImpNews().then(function (newsData) {
            if (newsData) {
                $scope.impnews = newsData;
            }
        });
    };

    $scope.DeleteNewsStory = function (nsid) {
        homeServiceFactory.DeleteNewsStory(nsid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.ipnews = false;
                $scope.tpnews = false;
                $scope.hnews = false;
                $scope.nstory = true;
            }
        });
    };

    $scope.DeleteTopNews = function (tnid) {
        homeServiceFactory.DeleteTopNews(tnid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.tpnews = true;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
            }
        });
    };
    $scope.DeleteHotNews = function (hnid) {
        homeServiceFactory.DeleteHotNews(hnid).then(function (res) {
            if (res) {
                $scope.getAllNews();
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = true;
            }
        });
    };

    $scope.getAllNews = function () {
        homeServiceFactory.getAllNews().then(function (newsData) {
            if (newsData) {
                $scope.topstories = newsData;
                $scope.getHotNewsTitle();
            }
        });
        homeServiceFactory.getAllNewsStory().then(function (newsData) {
            if (newsData) {
                $scope.nstory = true;
                $scope.ipnews = false;
                $scope.newstory = newsData;
            }
        });
    };

    //Get top news by tnid
    $scope.getTopNewsByID = function (newsid, rid) {
        $scope.rid = rid;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        $window.ga('send', 'event', 'home', 'Get Top News by Id');
        if (rid != 0 && rid != null) {
            homeServiceFactory.getRelatedNews(rid).then(function (rnews) {
                $scope.relatedNews = rnews;
            });
        }
        homeServiceFactory.getTopNewsByID(newsid).then(function (result) {
            if (result) {
                $scope.tpnews = true;
                $scope.ipnews = false;
                $scope.hnews = false;
                $scope.nstory = false;
                $scope.rfnews = false;
                $scope.tnews = result;
                if ($scope.tnews[0].mycolor) {
                    $scope.CustomStyle = {
                        'color': $scope.tnews[0].mycolor
                    };
                }
            }
        });
    };

    $scope.getHotNewsSummaryData = function (ndid) {
        debugger;

        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {
                if (ndid === 1)
                    $scope.hnewsData1 = hnewsdata;
                else if (ndid === 2)
                    $scope.hnewsData2 = hnewsdata;
                else if (ndid === 3)
                    $scope.hnewsData3 = hnewsdata;
            }
        });
    };

    //Get Title for hot news
    $scope.getHotNewsTitle = function () {
        HotnewsServiceFactory.getHotFullNewsTitle().then(function (hnewsdata) {
            if (hnewsdata) {
                $scope.hotNews = hnewsdata;
                for (var i = 0; i < $scope.hotNews.length; i++)
                    $scope.getHotNewsSummaryData($scope.hotNews[i].ndid);
            }
        });
    };

    var trigger = $('.hamburger'),
    overlay = $('.overlay');

    trigger.click(function () {
        debugger;
        hamburger_cross();
    });

    function hamburger_cross() {
        debugger;
        $window.ga('send', 'event', 'home', 'Mobile Menu Clicked');
        if ($scope.isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            $scope.isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            $scope.isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        debugger;
        $('#wrapper').toggleClass('toggled');
    });
    //get All hot summary news by ndid

    $scope.getHotNewsSummaryLast = function (ndid) {
        debugger;

        $window.ga('send', 'event', 'home', 'Get Hot News by Id');
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsdetail = false;
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = true;
                $scope.rfnews = false;

                $scope.hnewsDetail = hnewsdata;

            }
        });

    };
    $scope.getHotNewsByID = function (hnid) {
        debugger;
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
            $('body,html').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function (e) {
                if (e.which > 0 || e.type == "mousedown" || e.type == "mousewheel" || e.type == "touchmove") {
                    $("html,body").stop();
                }
            });
        }
        $window.ga('send', 'event', 'detailhotnews', 'Hot News By Id');
        HotnewsServiceFactory.getHotNewsSummary(hnid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.hnewsDetail = [];
                $scope.hnewsdetail = true;
                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = false;
                $scope.rfnews = false;
                $scope.hnewsDetail = hnewsdata;
            }
        });
    };
    $scope.getHotNewsSummary = function (ndid) {
        debugger;
        $(".hamburger").trigger("click");
        $window.ga('send', 'event', 'home', 'Get Hot News by Id');
        if ($scope.mobile) {
            $('html, body').animate({ scrollTop: $("#middle_content").offset().top - 100 }, 2000);
        }
        homeServiceFactory.getHotNewsSummary(ndid).then(function (hnewsdata) {
            if (hnewsdata) {

                $scope.tpnews = false;
                $scope.ipnews = false;
                $scope.nstory = false;
                $scope.hnews = true;
                $scope.rfnews = false;

                $scope.hnewsDetail = hnewsdata;

            }
        });

    };
    $scope.getImpNews();
    $scope.getAllNews();
    //$scope.FormatData();
}]);
//}]).filter('orderObjectBy', function () {
//    return function (items, field, reverse) {
//        var filtered = [];
//        angular.forEach(items, function (item) {
//            filtered.push(item);
//        });
//        if (items[0].newstory) {
//            filtered.sort(function (a, b) {
//                return (a.newstory[field] > b.newstory[field] ? 1 : -1);
//            });
//        }
//        if (items[0].topnews) {
//            filtered.sort(function (a, b) {
//                return (a.topnews[field] > b.topnews[field] ? 1 : -1);
//            });
//        }
//        //if (items.topnews) {//For hot News
//        //    filtered.sort(function (a, b) {
//        //        return (a.topnews[field] > b.topnews[field] ? 1 : -1);
//        //    });
//        //}
//        if (reverse) filtered.reverse();
//        return filtered;
//    };
//});