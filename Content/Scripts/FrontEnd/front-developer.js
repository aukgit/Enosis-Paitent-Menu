/// <reference path="jquery-2.1.1.js" />

/// <reference path="jetmenu.js" />
/// <reference path="modernizr-2.6.2.js" />
/// <reference path="owl.carousel.min.js" />
/// <reference path="the-lion-plugin.js" />
/// <reference path="jquery.validate.js" />
/// <reference path="respond.js" />
/// <reference path="pei-chart.js" />
/// <reference path="jquery.lightSlider.min.js" />
/// <reference path="../../rs-plugin/js/jquery.themepunch.revolution.min.js" />
/// <reference path="bootstrap-rating.min.js" />
/// <reference path="underscore-min.js" />
/// <reference path="../DevOrgPlugins/faster-jQuery.js" />

$(function () {


    $.frontEndApp = {
       
        execute: function () {
            var wow = new WOW({
                boxClass: 'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 100,          // distance to the element when triggering the animation (default is 0)
                mobile: false        // trigger animations on mobile devices (true is default)
            });
            wow.init();

            var $frontPageRatings = $.queryAll(".rating-5-front");
            if ($frontPageRatings.length > 0) {
                $frontPageRatings.rating({
                    showClear: false,
                    showCaption: false
                });
            }

            var $detailPageRatingDisplayItems = $.queryAll(".rating-5-page-details");
            if ($detailPageRatingDisplayItems.length > 0) {
                $detailPageRatingDisplayItems.rating({
                    showClear: false,
                    showCaption: true,
                    starCaptions: {
                        0: "0",
                        0.5: "0.5",
                        1: "1",
                        1.5: "1.5",
                        2: "2",
                        2.5: "2.5",
                        3: "3",
                        3.5: "3.5",
                        4: "4",
                        4.5: "4.5",
                        5: "5"
                    },
                    starCaptionClasses: {
                        0: 'label label-danger',
                        0.5: 'label label-danger',
                        1: 'label label-danger',
                        1.5: 'label label-warning',
                        2: 'label label-warning',
                        2.5: 'label label-info',
                        3: 'label label-info',
                        3.5: 'label label-primary',
                        4: 'label label-primary',
                        4.5: 'label label-success',
                        5: 'label label-success'
                    }
                });
            }
            

            ////filtering through isotop
            //var $isotopContainer = $("ul.search-page-apps-list:first");
            //if ($isotopContainer.length > 0) {
            //    var $filterIsotopItems = $.queryAll('.filter li a');
            //    if ($filterIsotopItems.length > 0) {
            //        $filterIsotopItems.click(function () {
            //            $('.filter li a').removeClass('active');
            //            $(this).addClass('active');
            //            var selector = $(this).attr('data-filter');

            //            $isotopContainer.isotope({
            //                filter: selector
            //            });
            //            return false;
            //        });
            //    }
            //}
            //var $numberElement = $.queryAll(".app-viewed-numbers:first-child");
            //if ($numberElement.length > 0) {
            //    $numberElement.number(true);
            //}

            //this.$showMoreBtns.click(function () {
            //    var $this = $(this);
            //    var moreReference = $this.attr("data-ref");
            //    var dataId = $this.attr("data-id");
            //    var dataRefSelector;
            //    var dataIdSelector = _.isUndefined(dataId) === false ? "[data-id='" + dataId + "']" : "";
            //    if (_.isUndefined(moreReference) === false) {
            //        dataRefSelector = "[data-ref='" + moreReference + "']" + dataIdSelector + ":first";

            //        var $specificMoreExcertFound = $.frontEndAppDetailsPage.$moreExcert.filter(dataRefSelector);
            //        if ($specificMoreExcertFound.length > 0) {
            //            $specificMoreExcertFound.show("slow");
            //            $specificMoreExcertFound.css("display", "inline");
            //        }
            //        var $moreBtnContainer = $.frontEndAppDetailsPage.$showMoreBtnContainer.filter(dataRefSelector);
            //        if ($moreBtnContainer.length > 0) {
            //            $moreBtnContainer.hide("slow");
            //        }
            //    }
            //});

            //this.$showLessBtns.click(function () {
            //    var $this = $(this);
            //    var moreReference = $this.attr("data-ref");
            //    var dataId = $this.attr("data-id");
            //    var dataRefSelector;
            //    var dataIdSelector = _.isUndefined(dataId) === false ? "[data-id='" + dataId + "']" : "";
            //    if (_.isUndefined(moreReference) === false) {
            //        dataRefSelector = "[data-ref='" + moreReference + "']" + dataIdSelector + ":first";

            //        var $specificMoreExcertFound = $.frontEndAppDetailsPage.$moreExcert.filter(dataRefSelector);
            //        if ($specificMoreExcertFound.length > 0) {
            //            $specificMoreExcertFound.hide("slow");
            //        }
            //        var $moreBtnContainer = $.frontEndAppDetailsPage.$showMoreBtnContainer.filter(dataRefSelector);
            //        if ($moreBtnContainer.length > 0) {
            //            $moreBtnContainer.show("slow");
            //        }
            //    }
            //});
        }
    };
    $.frontEndApp.execute();
});
