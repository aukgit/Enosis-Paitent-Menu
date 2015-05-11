/// <reference path="../validation.js" />
/// <reference path="../bootstrap-datetimepicker.js" />
/// <reference path="../bootstrap-select.js" />
/// <reference path="../bootstrap-table-export.js" />
/// <reference path="../bootstrap-table-filter.js" />
/// <reference path="../bootstrap-table.js" />
/// <reference path="../bootstrap.js" />
/// <reference path="../jquery-2.1.3.js" />
/// <reference path="../jquery-ui.min.js" />
/// <reference path="../jquery.elastic.source.js" />
/// <reference path="../jquery.unobtrusive-ajax.js" />
/// <reference path="../jquery.validate-vsdoc.js" />
/// <reference path="../jquery.validate.js" />
/// <reference path="../jquery.validate.unobtrusive.js" />
/// <reference path="../modernizr-2.8.3.js" />
/// <reference path="../moment.js" />
/// <reference path="../npm.js" />
/// <reference path="../star-rating.js" />
/// <reference path="../underscore.js" />
/// <reference path="jquery.isotope.min.js" />
/// <reference path="front-developer.js" />
/// <reference path="wow.min.js" />

$.frontEndApp = {
    transactionStatushdie : function () {
        var $transactionStatus = $.queryAll(".transaction-status");
        if ($transactionStatus.length > 0) {
            $transactionStatus.delay(1500).fadeOut(2500);
        }
    },
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

        var $tooltipItems = $.queryAll('.tooltip-show');
        if ($tooltipItems.length > 0) {
            $tooltipItems.tooltip();
        }
        var $seoHideItems = $.queryAll(".seo-hide");
        if ($seoHideItems.length > 0) {
            $seoHideItems.hide();
        }
        $.frontEndApp.transactionStatushdie();
    }
};

$(function () {
    $.frontEndApp.execute();
});
