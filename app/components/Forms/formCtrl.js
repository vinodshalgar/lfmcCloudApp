(function () {


    var injectParams = ["$location", "$routeParams", "authService", "dataService", "$rootScope", "$sce", "$http"];

    var FormCtrl = function ($location, $routeParams, authService, dataService, $rootScope, $sce, $http) {

        var vm = this;

        vm.menuLeft = null;
        vm.menuRight = null;
        vm.FormFields = null;
        vm.lpw = [];
        vm.formname = null;
        vm.firstpage = 1;
        vm.lastpage = 1;
        vm.pageno = 1;
        var addY = 1;
        var prevI = -1;
        var oldGroupId = null;
        vm.pagelength = "1225";
        var addRowcounter = [];
        vm.fnamequery = '';
        vm.fnames = ["N260", "LITPRO18", "PR8A"];
        vm.formbundle = [];
        vm.formbundleActive = null;
        var slno = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z"];




        var sort_by = function (field, reverse, primer) {

            var key = primer ?
                function (x) { return primer(x[field]) } :
                function (x) { return x[field] };

            reverse = !reverse ? 1 : -1;

            return function (a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }

        function init() {
            vm.menuLeft = [
                {
                    "Item": "Forms",
                    "Value": "#/category"
                },
                {
                    "Item": "Updates",
                    "Value": "#/updates"
                },
                {
                    "Item": "Search",
                    "Value": "#/search"
                }
            ];
            vm.menuRight = [
                {
                    "Item": "Logout",
                    "Value": "#/login"
                }
            ];

            $rootScope.menuLeft = vm.menuLeft;
            $rootScope.menuRight = vm.menuRight;
            vm.formname = $routeParams.param1.toUpperCase();
            var obj = { formname: vm.formname };
            vm.formbundle.push(obj);
            vm.formbundleActive = vm.formname;
            vm.pagecounter = [{ "pageno": 1, "pageheight": vm.pagelength }];

            dataService.getForm(vm.formname)
                .then(function (results) {
                    vm.lpw = results.data;
                    initPageNumbers();
                    initAddrowProperties();
                }, function (error) {

                });

            // console.log(vm.lpw);
        }
        init();

        function initPageNumbers (){
             vm.lastpage = vm.lpw[0].noOfPages;
            for (var i = 2; i <= vm.lastpage; i++) {
                var obj = {
                    "pageno": i,
                    "pageheight": vm.pagelength
                };
                vm.pagecounter.push(obj);
                vm.lpw[0].pageDetail[i - 2].fields.sort(sort_by('x', false, parseInt));
                vm.lpw[0].pageDetail[i - 2].fields.sort(sort_by('y', false, parseInt));
            }
        }
        function initAddrowProperties(){
             for (var i = 0; i < vm.lastpage - 1; i++) {
                for (var j = 0; j < vm.lpw[0].pageDetail[i].fields.length; j++) {
                    if (vm.lpw[0].pageDetail[i].fields[j].groupid > 0 && vm.lpw[0].pageDetail[i].fields[j].addrow == "true" && vm.lpw[0].pageDetail[i].fields[j].group == "end") {
                        var obj = {
                            "pageno": vm.lpw[0].pageDetail[i].page,
                            "groupid": vm.lpw[0].pageDetail[i].fields[j].groupid,
                            "rowcount": "2"
                        };
                        addRowcounter.push(obj);
                    }
                }
            }
        }

        vm.ConvertTohtml = function (field) {
            return $sce.trustAsHtml(field.Description);
        };

        vm.addRow = function (pageno, groupid, ypos) {

            for (var i = 0; i < addRowcounter.length; i++) {
                if (addRowcounter[i].groupid == groupid) {
                    if (addRowcounter[i].rowcount > 24) {
                        alert("you have reached maximum no. of rows!!");
                        return;
                    }
                    addRowcounter[i].rowcount = addRowcounter[i].rowcount * 1 + 1;
                    addY = addRowcounter[i].rowcount;
                    break;
                }
            }
            pageno = pageno - 1;
            var height = 0;
            for (var i = 0; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                if (vm.lpw[0].pageDetail[pageno].fields[i].groupid == groupid) {
                    if (Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].height) > height) {
                        height = Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].height);
                        //console.log(height);
                    }
                }
            }
            vm.pagelength = vm.pagelength * 1 + height + 3;
            vm.pagecounter[vm.pageno - 1].pageheight = vm.pagelength;

            for (var i = 0; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                if (vm.lpw[0].pageDetail[pageno].fields[i].groupid == groupid) {
                    var field = {
                        fieldtype: vm.lpw[0].pageDetail[pageno].fields[i].fieldtype,
                        id: vm.lpw[0].pageDetail[pageno].fields[i].id + "." + addY,
                        value: "",
                        Description: (vm.lpw[0].pageDetail[pageno].fields[i].Description == "(b)") ? ("(" + slno[addY - 1] + ")") : (vm.lpw[0].pageDetail[pageno].fields[i].Description),
                        x: vm.lpw[0].pageDetail[pageno].fields[i].x,
                        y: (vm.lpw[0].pageDetail[pageno].fields[i].y * 1) + height + 3 + ((addY > 3) ? ((addY - 3) * (height + 3)) : (0)),
                        width: vm.lpw[0].pageDetail[pageno].fields[i].width,
                        height: vm.lpw[0].pageDetail[pageno].fields[i].height,
                        maxchar: vm.lpw[0].pageDetail[pageno].fields[i].maxchar,
                        fontsize: vm.lpw[0].pageDetail[pageno].fields[i].fontsize,
                        textdecoration: vm.lpw[0].pageDetail[pageno].fields[i].textdecoration,
                        fontfamily: vm.lpw[0].pageDetail[pageno].fields[i].fontfamily,
                        color: vm.lpw[0].pageDetail[pageno].fields[i].color,
                        items: vm.lpw[0].pageDetail[pageno].fields[i].items,
                        groupid: "-" + vm.lpw[0].pageDetail[pageno].fields[i].groupid + "." + addY,
                        isexpandable: vm.lpw[0].pageDetail[pageno].fields[i].isexpandable,
                        rows: vm.lpw[0].pageDetail[pageno].fields[i].rows,
                        addrow: vm.lpw[0].pageDetail[pageno].fields[i].addrow,
                        group: vm.lpw[0].pageDetail[pageno].fields[i].group
                    };
                    vm.lpw[0].pageDetail[pageno].fields.push(field);
                    prevI = i;
                }
            }

            for (var i = prevI; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                if (-Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].groupid) != groupid && Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].y) > ypos) {
                    vm.lpw[0].pageDetail[pageno].fields[i].y = (vm.lpw[0].pageDetail[pageno].fields[i].y * 1) + height + 3;
                }
            }
            // console.log(vm.lpw[0].pageDetail[pageno].fields);
        };



        vm.delRow = function (pageno, groupid, ypos) {

            for (var i = 0; i < addRowcounter.length; i++) {
                if (addRowcounter[i].groupid == (-Math.trunc(groupid))) {
                    addRowcounter[i].rowcount = addRowcounter[i].rowcount * 1 - 1;
                    addY = addRowcounter[i].rowcount;
                    break;
                }
            }

            pageno = pageno - 1;
            var height = 0;

            for (var i = 0; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                if (vm.lpw[0].pageDetail[pageno].fields[i].groupid == groupid) {
                    if (Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].height) > height) {
                        height = Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].height);
                    }
                }
            }
            vm.pagelength = vm.pagelength * 1 - height - 3;
            vm.pagecounter[vm.pageno - 1].pageheight = vm.pagelength;
            console.log(vm.lpw[0].pageDetail[pageno].fields.length);
            var delCount = 0, delStart = 0;
            console.log(Math.trunc(groupid) + "." + (addY * 1 + 1));
            for (var i = 0; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                if (vm.lpw[0].pageDetail[pageno].fields[i].groupid == Math.trunc(groupid) + "." + (addY * 1 + 1)) {
                    if (delStart == 0) {
                        delStart = i;
                    }
                    delCount++;
                }
            }
            var delobj = vm.lpw[0].pageDetail[pageno].fields.splice(delStart, delCount);

            if (addY > 2) {

                var delaphaIndex = 0;
                for (var i = 0; i < delobj.length; i++) {
                    for (var j = 0; j < slno.length; j++) {
                        if (delobj[i].Description == "(" + slno[j] + ")") {
                            delaphaIndex = j;
                            ypos = delobj[i].y;
                            break;
                        }
                    }
                }
                // if (delaphaIndex < 24) {
                //     for (var i = delStart; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                //         if (Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].groupid) == Math.trunc(groupid)) {
                //             if (vm.lpw[0].pageDetail[pageno].fields[i].Description == "(" + slno[delaphaIndex + 1] + ")") {
                //                // console.log(vm.lpw[0].pageDetail[pageno].fields[i].Description);
                //                 vm.lpw[0].pageDetail[pageno].fields[i].Description = "(" + slno[delaphaIndex] + ")";
                //                 delaphaIndex++;
                //             }
                //         }
                //     }
                // }

            }

            for (var i = 0; i < vm.lpw[0].pageDetail[pageno].fields.length; i++) {
                if (Math.trunc(vm.lpw[0].pageDetail[pageno].fields[i].y) > ypos) {
                    vm.lpw[0].pageDetail[pageno].fields[i].y = (vm.lpw[0].pageDetail[pageno].fields[i].y * 1) - height - 3;
                }
            }
        };

        vm.strikeout = function (id, desc, pageno) {
            pageno = pageno - 1;
            var j = 0;
            for (j = 0; j < vm.lpw[0].pageDetail[pageno].fields.length; j++) {
                if (vm.lpw[0].pageDetail[pageno].fields[j].id == id || vm.lpw[0].pageDetail[pageno].fields[j].Description == id) {
                    var val = vm.lpw[0].pageDetail[pageno].fields[j].value;
                    var len = vm.lpw[0].pageDetail[pageno].fields[j].maxchar;

                    if (val == "") {
                        for (var i = 0; i < len; i++) {
                            val = val + "-";
                        }
                    }
                    else {
                        val = "";
                    }
                    vm.lpw[0].pageDetail[pageno].fields[j].value = val;
                }
            }
        }

        vm.checkrows = function (val, row) {
            var numberOfLines = (val.match(/\n/g) || []).length + 1;
            if (numberOfLines > row) {
                var pos = val.lastIndexOf('\n');
                val = val.substring(0, pos) + val.substring(pos + 1);
            }
            return val;
        }

        vm.pageChange = function (opt, pageno) {
            switch (opt) {
                case "nxt": { vm.pageno = (vm.pageno * 1) + 1 }; break;
                case "bck": { vm.pageno = vm.pageno - 1 } break;
                case "fst": { vm.pageno = vm.firstpage } break;
                case "lst": { vm.pageno = vm.lastpage } break;
                case "ddl": { vm.pageno = pageno } break;
                default: { vm.pageno = vm.pageno };
            }
            vm.pagelength = vm.pagecounter[vm.pageno - 1].pageheight;
            console.log(vm.pagecounter);
        }


        vm.formbundleAdd = function (formname) {
            var obj = { formname: formname };
            vm.formbundle.push(obj);
            console.log(vm.formbundle);
            vm.fnamequery = '';
            vm.formbundleActive = formname;
        }


        vm.save = function (pageno) {

        }
        vm.generatePDF = function(){
            if(vm.formname.toUpperCase() == "FP5"){
                window.open("\\contents\\data\\FP5.pdf");
            }
        }

    };

    FormCtrl.$inject = injectParams;

    angular.module("lfmcApp")
        .controller("FormCtrl", FormCtrl);

}());