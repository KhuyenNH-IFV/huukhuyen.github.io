! function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "moment"], t) : "object" == typeof exports ? t(require("jquery"), require("moment")) : t(jQuery, moment)
}(function(t, e) {
    function n(n, a) {
        if (this.element = n, this.options = t.extend(!0, {}, i, a), this.options.moment && (e = this.options.moment), this.constraints = {
                next: !0,
                today: !0,
                previous: !0,
                nextYear: !0,
                previousYear: !0
            }, this.options.events.length && (this.options.multiDayEvents ? this.options.events = this.addMultiDayMomentObjectsToEvents(this.options.events) : this.options.events = this.addMomentObjectToEvents(this.options.events)), this.options.lengthOfTime.months || this.options.lengthOfTime.days ? this.options.lengthOfTime.months ? (this.options.lengthOfTime.days = null, this.options.lengthOfTime.startDate ? this.intervalStart = e(this.options.lengthOfTime.startDate).startOf("month") : this.options.startWithMonth ? this.intervalStart = e(this.options.startWithMonth).startOf("month") : this.intervalStart = e().startOf("month"), this.intervalEnd = e(this.intervalStart).add(this.options.lengthOfTime.months, "months").subtract(1, "days"), this.month = this.intervalStart.clone()) : this.options.lengthOfTime.days && (this.options.lengthOfTime.startDate ? this.intervalStart = e(this.options.lengthOfTime.startDate).startOf("day") : this.intervalStart = e().weekday(0).startOf("day"), this.intervalEnd = e(this.intervalStart).add(this.options.lengthOfTime.days - 1, "days").endOf("day"), this.month = this.intervalStart.clone()) : (this.month = e().startOf("month"), this.intervalStart = e(this.month), this.intervalEnd = e(this.month).endOf("month")), this.options.startWithMonth && (this.month = e(this.options.startWithMonth).startOf("month"), this.intervalStart = e(this.month), this.intervalEnd = e(this.month).endOf("month")), this.options.constraints) {
            if (this.options.constraints.startDate) {
                var o = e(this.options.constraints.startDate);
                this.intervalStart.isBefore(o, "month") && (this.intervalStart.set("month", o.month()).set("year", o.year()), this.month.set("month", o.month()).set("year", o.year()))
            }
            if (this.options.constraints.endDate) {
                var r = e(this.options.constraints.endDate);
                this.intervalEnd.isAfter(r, "month") && (this.intervalEnd.set("month", r.month()).set("year", r.year()), this.month.set("month", r.month()).set("year", r.year()))
            }
        }
        this._defaults = i, this._name = s, this.init()
    }
    var s = "clndr",
        a = "<div class='clndr-controls'><div class='clndr-control-button'><span class='clndr-previous-button'><i class='fa fa-chevron-circle-left'></i></span></div><div class='month'><span id=timer></span></div><div class='clndr-control-button rightalign'><span class='clndr-next-button'><i class='fa fa-chevron-circle-right'></i></span></div></div><table class='clndr-table' border='0' cellspacing='0' cellpadding='0'><thead><tr class='header-days'><% for(var i = 0; i < daysOfTheWeek.length; i++) { %><td class='header-day'><%= daysOfTheWeek[i] %></td><% } %></tr></thead><tbody><% for(var i = 0; i < numberOfRows; i++){ %><tr><% for(var j = 0; j < 7; j++){ %><% var d = j + i * 7; %><td class='<%= days[d].classes %>'><div class='day-contents'><%= days[d].day %></div></td><% } %></tr><% } %></tbody></table>",
        i = {
            events: [],
            ready: null,
            extras: null,
            render: null,
            moment: null,
            weekOffset: 0,
            constraints: null,
            forceSixRows: null,
            selectedDate: null,
            doneRendering: null,
            daysOfTheWeek: null,
            multiDayEvents: null,
            startWithMonth: null,
            dateParameter: "date",
            template: a,
            showAdjacentMonths: !0,
            trackSelectedDate: !1,
            adjacentDaysChangeMonth: !1,
            ignoreInactiveDaysInSelection: null,
            lengthOfTime: {
                days: null,
                interval: 1,
                months: null
            },
            clickEvents: {
                click: null,
                today: null,
                nextYear: null,
                nextMonth: null,
                nextInterval: null,
                previousYear: null,
                onYearChange: null,
                previousMonth: null,
                onMonthChange: null,
                previousInterval: null,
                onIntervalChange: null
            },
            targets: {
                day: "day",
                empty: "empty",
                nextButton: "clndr-next-button",
                todayButton: "clndr-today-button",
                previousButton: "clndr-previous-button",
                nextYearButton: "clndr-next-year-button",
                previousYearButton: "clndr-previous-year-button"
            },
            classes: {
                past: "past",
                today: "today",
                event: "event",
                inactive: "inactive",
                selected: "selected",
                lastMonth: "last-month",
                nextMonth: "next-month",
                adjacentMonth: "adjacent-month"
            }
        };
    n.prototype.init = function() {
        if (this.daysOfTheWeek = this.options.daysOfTheWeek || [], !this.options.daysOfTheWeek) {
            this.daysOfTheWeek = [];
            for (var n = 0; 7 > n; n++) this.daysOfTheWeek.push(e().weekday(n).format("dd").charAt(0))
        }
        if (this.options.weekOffset && (this.daysOfTheWeek = this.shiftWeekdayLabels(this.options.weekOffset)), !t.isFunction(this.options.render)) {
            if (this.options.render = null, "undefined" == typeof _) throw new Error("Underscore was not found. Please include underscore.js OR provide a custom render function.");
            this.compiledClndrTemplate = _.template(this.options.template)
        }
        t(this.element).html("<div class='clndr'></div>"), this.calendarContainer = t(".clndr", this.element), this.bindEvents(), this.render(), this.options.ready && this.options.ready.apply(this, [])
    }, n.prototype.shiftWeekdayLabels = function(t) {
        for (var e = this.daysOfTheWeek, n = 0; t > n; n++) e.push(e.shift());
        return e
    }, n.prototype.createDaysObject = function(n, s) {
        var a, i, o, r, h, l, d = [],
            c = n.clone();
        s.diff(n, "days");
        if (this._currentIntervalStart = n.clone(), this.eventsLastMonth = [], this.eventsNextMonth = [], this.eventsThisInterval = [], this.options.events.length && (this.eventsThisInterval = t(this.options.events).filter(function() {
                var t = this._clndrStartDateObject.isAfter(s),
                    e = this._clndrEndDateObject.isBefore(n);
                return e || t ? !1 : !0
            }).toArray(), this.options.showAdjacentMonths && (a = n.clone().subtract(1, "months").startOf("month"), i = a.clone().endOf("month"), o = s.clone().add(1, "months").startOf("month"), r = o.clone().endOf("month"), this.eventsLastMonth = t(this.options.events).filter(function() {
                var t = this._clndrEndDateObject.isBefore(a),
                    e = this._clndrStartDateObject.isAfter(i);
                return t || e ? !1 : !0
            }).toArray(), this.eventsNextMonth = t(this.options.events).filter(function() {
                var t = this._clndrEndDateObject.isBefore(o),
                    e = this._clndrStartDateObject.isAfter(r);
                return t || e ? !1 : !0
            }).toArray())), !this.options.lengthOfTime.days)
            if (h = c.weekday() - this.options.weekOffset, 0 > h && (h += 7), this.options.showAdjacentMonths)
                for (var v = 0; h > v; v++) {
                    var p = e([n.year(), n.month(), v - h + 1]);
                    d.push(this.createDayObject(p, this.eventsLastMonth))
                } else
                    for (var v = 0; h > v; v++) d.push(this.calendarDay({
                        classes: this.options.targets.empty + " " + this.options.classes.lastMonth
                    }));
        for (l = n.clone(); l.isBefore(s) || l.isSame(s, "day");) d.push(this.createDayObject(l.clone(), this.eventsThisInterval)), l.add(1, "days");
        if (!this.options.lengthOfTime.days)
            for (; d.length % 7 !== 0;) this.options.showAdjacentMonths ? d.push(this.createDayObject(l.clone(), this.eventsNextMonth)) : d.push(this.calendarDay({
                classes: this.options.targets.empty + " " + this.options.classes.nextMonth
            })), l.add(1, "days");
        if (this.options.forceSixRows && 42 !== d.length)
            for (; d.length < 42;) this.options.showAdjacentMonths ? (d.push(this.createDayObject(l.clone(), this.eventsNextMonth)), l.add(1, "days")) : d.push(this.calendarDay({
                classes: this.options.targets.empty + " " + this.options.classes.nextMonth
            }));
        return d
    }, n.prototype.createDayObject = function(t, n) {
        var s, a, i, o = 0,
            r = e(),
            h = [],
            l = "",
            d = {
                isToday: !1,
                isInactive: !1,
                isAdjacentMonth: !1
            };
        for (!t.isValid() && t.hasOwnProperty("_d") && void 0 != t._d && (t = e(t._d)), o; o < n.length; o++) {
            var c = n[o]._clndrStartDateObject,
                v = n[o]._clndrEndDateObject;
            (t.isSame(c, "day") || t.isAfter(c, "day")) && (t.isSame(v, "day") || t.isBefore(v, "day")) && h.push(n[o])
        }
        return r.format("YYYY-MM-DD") == t.format("YYYY-MM-DD") && (l += " " + this.options.classes.today, d.isToday = !0), t.isBefore(r, "day") && (l += " " + this.options.classes.past), h.length && (l += " " + this.options.classes.event), this.options.lengthOfTime.days || (this._currentIntervalStart.month() > t.month() ? (l += " " + this.options.classes.adjacentMonth, d.isAdjacentMonth = !0, l += this._currentIntervalStart.year() === t.year() ? " " + this.options.classes.lastMonth : " " + this.options.classes.nextMonth) : this._currentIntervalStart.month() < t.month() && (l += " " + this.options.classes.adjacentMonth, d.isAdjacentMonth = !0, l += this._currentIntervalStart.year() === t.year() ? " " + this.options.classes.nextMonth : " " + this.options.classes.lastMonth)), this.options.constraints && (a = e(this.options.constraints.endDate), s = e(this.options.constraints.startDate), this.options.constraints.startDate && t.isBefore(s) && (l += " " + this.options.classes.inactive, d.isInactive = !0), this.options.constraints.endDate && t.isAfter(a) && (l += " " + this.options.classes.inactive, d.isInactive = !0)), !t.isValid() && t.hasOwnProperty("_d") && void 0 != t._d && (t = e(t._d)), i = e(this.options.selectedDate), this.options.selectedDate && t.isSame(i, "day") && (l += " " + this.options.classes.selected), l += " calendar-day-" + t.format("YYYY-MM-DD"), l += " calendar-dow-" + t.weekday(), this.calendarDay({
            date: t,
            day: t.date(),
            events: h,
            properties: d,
            classes: this.options.targets.day + l
        })
    }, n.prototype.render = function() {
        var t, n, s, a, i, o = {},
            r = null,
            h = null,
            l = this.intervalEnd.clone().add(1, "years"),
            d = this.intervalStart.clone().subtract(1, "years");
        if (this.calendarContainer.empty(), this.options.lengthOfTime.days) t = this.createDaysObject(this.intervalStart.clone(), this.intervalEnd.clone()), o = {
            days: t,
            months: [],
            year: null,
            month: null,
            eventsLastMonth: [],
            eventsNextMonth: [],
            eventsThisMonth: [],
            extras: this.options.extras,
            daysOfTheWeek: this.daysOfTheWeek,
            intervalEnd: this.intervalEnd.clone(),
            numberOfRows: Math.ceil(t.length / 7),
            intervalStart: this.intervalStart.clone(),
            eventsThisInterval: this.eventsThisInterval
        };
        else if (this.options.lengthOfTime.months) {
            for (n = [], i = 0, a = [], y = 0; y < this.options.lengthOfTime.months; y++) {
                var c = this.intervalStart.clone().add(y, "months"),
                    v = c.clone().endOf("month"),
                    t = this.createDaysObject(c, v);
                a.push(this.eventsThisInterval), n.push({
                    days: t,
                    month: c
                })
            }
            for (y in n) i += Math.ceil(n[y].days.length / 7);
            o = {
                days: [],
                year: null,
                month: null,
                months: n,
                eventsThisMonth: [],
                numberOfRows: i,
                extras: this.options.extras,
                intervalEnd: this.intervalEnd,
                intervalStart: this.intervalStart,
                daysOfTheWeek: this.daysOfTheWeek,
                eventsLastMonth: this.eventsLastMonth,
                eventsNextMonth: this.eventsNextMonth,
                eventsThisInterval: a
            }
        } else t = this.createDaysObject(this.month.clone().startOf("month"), this.month.clone().endOf("month")), s = this.month, o = {
            days: t,
            months: [],
            intervalEnd: null,
            intervalStart: null,
            year: this.month.year(),
            eventsThisInterval: null,
            extras: this.options.extras,
            month: this.month.format("MMMM"),
            daysOfTheWeek: this.daysOfTheWeek,
            eventsLastMonth: this.eventsLastMonth,
            eventsNextMonth: this.eventsNextMonth,
            numberOfRows: Math.ceil(t.length / 7),
            eventsThisMonth: this.eventsThisInterval
        };
        try {
            if (this.options.render ? this.calendarContainer.html(this.options.render.apply(this, [o])) : this.calendarContainer.html(this.compiledClndrTemplate(o)), this.options.constraints) {
                for (var p in this.options.targets) p != this.options.targets.day && this.element.find("." + this.options.targets[p]).toggleClass(this.options.classes.inactive, !1);
                for (var y in this.constraints) this.constraints[y] = !0;
                this.options.constraints.startDate && (h = e(this.options.constraints.startDate)), this.options.constraints.endDate && (r = e(this.options.constraints.endDate)), h && (h.isAfter(this.intervalStart) || h.isSame(this.intervalStart, "day")) && (this.element.find("." + this.options.targets.previousButton).toggleClass(this.options.classes.inactive, !0), this.constraints.previous = !this.constraints.previous), r && (r.isBefore(this.intervalEnd) || r.isSame(this.intervalEnd, "day")) && (this.element.find("." + this.options.targets.nextButton).toggleClass(this.options.classes.inactive, !0), this.constraints.next = !this.constraints.next), h && h.isAfter(d) && (this.element.find("." + this.options.targets.previousYearButton).toggleClass(this.options.classes.inactive, !0), this.constraints.previousYear = !this.constraints.previousYear), r && r.isBefore(l) && (this.element.find("." + this.options.targets.nextYearButton).toggleClass(this.options.classes.inactive, !0), this.constraints.nextYear = !this.constraints.nextYear), (h && h.isAfter(e(), "month") || r && r.isBefore(e(), "month")) && (this.element.find("." + this.options.targets.today).toggleClass(this.options.classes.inactive, !0), this.constraints.today = !this.constraints.today)
            }
        } catch (e) {}
        this.options.doneRendering && this.options.doneRendering.apply(this, [])
    }, n.prototype.bindEvents = function() {
        var e = this,
            n = t(this.element),
            s = this.options.targets,
            a = e.options.classes,
            i = this.options.useTouchEvents === !0 ? "touchstart" : "click",
            o = i + ".clndr";
        n.off(o, "." + s.day).off(o, "." + s.empty).off(o, "." + s.nextButton).off(o, "." + s.todayButton).off(o, "." + s.previousButton).off(o, "." + s.nextYearButton).off(o, "." + s.previousYearButton), n.on(o, "." + s.day, function(n) {
            var s, i = t(n.currentTarget);
            if (e.options.clickEvents.click && (s = e.buildTargetObject(n.currentTarget, !0), e.options.clickEvents.click.apply(e, [s])), e.options.adjacentDaysChangeMonth && (i.is("." + a.lastMonth) ? e.backActionWithContext(e) : i.is("." + a.nextMonth) && e.forwardActionWithContext(e)), e.options.trackSelectedDate) {
                if (e.options.ignoreInactiveDaysInSelection && i.hasClass(a.inactive)) return;
                e.options.selectedDate = e.getTargetDateString(n.currentTarget), i.siblings().removeClass(a.selected).end().addClass(a.selected)
            }
        }), n.on(o, "." + s.empty, function(n) {
            var s, i = t(n.currentTarget);
            e.options.clickEvents.click && (s = e.buildTargetObject(n.currentTarget, !1), e.options.clickEvents.click.apply(e, [s])), e.options.adjacentDaysChangeMonth && (i.is("." + a.lastMonth) ? e.backActionWithContext(e) : i.is("." + a.nextMonth) && e.forwardActionWithContext(e))
        }), data = {
            context: this
        }, n.on(o, "." + s.todayButton, data, this.todayAction).on(o, "." + s.nextButton, data, this.forwardAction).on(o, "." + s.previousButton, data, this.backAction).on(o, "." + s.nextYearButton, data, this.nextYearAction).on(o, "." + s.previousYearButton, data, this.previousYearAction)
    }, n.prototype.buildTargetObject = function(n, s) {
        var a, i, o = {
            date: null,
            events: [],
            element: n
        };
        return s && (a = this.getTargetDateString(n), o.date = a ? e(a) : null, this.options.events && (i = this.options.multiDayEvents ? function() {
            var t = o.date.isSame(this._clndrStartDateObject, "day"),
                e = o.date.isAfter(this._clndrStartDateObject, "day"),
                n = o.date.isSame(this._clndrEndDateObject, "day"),
                s = o.date.isBefore(this._clndrEndDateObject, "day");
            return (t || e) && (n || s)
        } : function() {
            var t = this._clndrStartDateObject.format("YYYY-MM-DD");
            return t == a
        }, o.events = t.makeArray(t(this.options.events).filter(i)))), o
    }, n.prototype.getTargetDateString = function(t) {
        var e = t.className.indexOf("calendar-day-");
        return -1 !== e ? t.className.substring(e + 13, e + 23) : null
    }, n.prototype.triggerEvents = function(t, n) {
        var s, a, i, o, r, h, l, d, c, v = t.options.lengthOfTime,
            p = t.options.clickEvents,
            y = {
                end: t.intervalEnd,
                start: t.intervalStart
            },
            u = [e(t.intervalStart), e(t.intervalEnd)],
            f = [e(t.month)];
        o = y.start.isAfter(n.start) && (1 == Math.abs(y.start.month() - n.start.month()) || 11 === n.start.month() && 0 === y.start.month()), r = y.start.isBefore(n.start) && (1 == Math.abs(n.start.month() - y.start.month()) || 0 === n.start.month() && 11 === y.start.month()), h = y.start.month() !== n.start.month() || y.start.year() !== n.start.year(), s = y.start.year() - n.start.year() === 1 || y.end.year() - n.end.year() === 1, a = n.start.year() - y.start.year() === 1 || n.end.year() - y.end.year() === 1, i = y.start.year() !== n.start.year(), v.days || v.months ? (l = y.start.isAfter(n.start), d = y.start.isBefore(n.start), c = l || d, l && p.nextInterval && p.nextInterval.apply(t, u), d && p.previousInterval && p.previousInterval.apply(t, u), c && p.onIntervalChange && p.onIntervalChange.apply(t, u)) : (o && p.nextMonth && p.nextMonth.apply(t, f), r && p.previousMonth && p.previousMonth.apply(t, f), h && p.onMonthChange && p.onMonthChange.apply(t, f), s && p.nextYear && p.nextYear.apply(t, f), a && p.previousYear && p.previousYear.apply(t, f), i && p.onYearChange && p.onYearChange.apply(t, f))
    }, n.prototype.back = function(e) {
        var n = arguments.length > 1 ? arguments[1] : this,
            s = n.options.lengthOfTime,
            a = {
                withCallbacks: !1
            },
            i = {
                end: n.intervalEnd.clone(),
                start: n.intervalStart.clone()
            };
        return e = t.extend(!0, {}, a, e), n.constraints.previous ? (s.days ? (n.intervalStart.subtract(s.interval, "days").startOf("day"), n.intervalEnd = n.intervalStart.clone().add(s.days - 1, "days").endOf("day"), n.month = n.intervalStart.clone()) : (n.intervalStart.subtract(s.interval, "months").startOf("month"), n.intervalEnd = n.intervalStart.clone().add(s.months || s.interval, "months").subtract(1, "days").endOf("month"), n.month = n.intervalStart.clone()), n.render(), e.withCallbacks && n.triggerEvents(n, i), n) : n
    }, n.prototype.backAction = function(t) {
        var e = t.data.context;
        e.backActionWithContext(e)
    }, n.prototype.backActionWithContext = function(t) {
        t.back({
            withCallbacks: !0
        }, t)
    }, n.prototype.previous = function(t) {
        return this.back(t)
    }, n.prototype.forward = function(e) {
        var n = arguments.length > 1 ? arguments[1] : this,
            s = n.options.lengthOfTime,
            a = {
                withCallbacks: !1
            },
            i = {
                end: n.intervalEnd.clone(),
                start: n.intervalStart.clone()
            };
        return e = t.extend(!0, {}, a, e), n.constraints.next ? (n.options.lengthOfTime.days ? (n.intervalStart.add(s.interval, "days").startOf("day"), n.intervalEnd = n.intervalStart.clone().add(s.days - 1, "days").endOf("day"), n.month = n.intervalStart.clone()) : (n.intervalStart.add(s.interval, "months").startOf("month"), n.intervalEnd = n.intervalStart.clone().add(s.months || s.interval, "months").subtract(1, "days").endOf("month"), n.month = n.intervalStart.clone()), n.render(), e.withCallbacks && n.triggerEvents(n, i), n) : n
    }, n.prototype.forwardAction = function(t) {
        var e = t.data.context;
        e.forwardActionWithContext(e)
    }, n.prototype.forwardActionWithContext = function(t) {
        t.forward({
            withCallbacks: !0
        }, t)
    }, n.prototype.next = function(t) {
        return this.forward(t)
    }, n.prototype.previousYear = function(e) {
        var n = arguments.length > 1 ? arguments[1] : this,
            s = {
                withCallbacks: !1
            },
            a = {
                end: n.intervalEnd.clone(),
                start: n.intervalStart.clone()
            };
        return e = t.extend(!0, {}, s, e), n.constraints.previousYear ? (n.month.subtract(1, "year"), n.intervalStart.subtract(1, "year"), n.intervalEnd.subtract(1, "year"), n.render(), e.withCallbacks && n.triggerEvents(n, a), n) : n
    }, n.prototype.previousYearAction = function(t) {
        var e = t.data.context;
        e.previousYear({
            withCallbacks: !0
        }, e)
    }, n.prototype.nextYear = function(e) {
        var n = arguments.length > 1 ? arguments[1] : this,
            s = {
                withCallbacks: !1
            },
            a = {
                end: n.intervalEnd.clone(),
                start: n.intervalStart.clone()
            };
        return e = t.extend(!0, {}, s, e), n.constraints.nextYear ? (n.month.add(1, "year"), n.intervalStart.add(1, "year"), n.intervalEnd.add(1, "year"), n.render(), e.withCallbacks && n.triggerEvents(n, a), n) : n
    }, n.prototype.nextYearAction = function(t) {
        var e = t.data.context;
        e.nextYear({
            withCallbacks: !0
        }, e)
    }, n.prototype.today = function(n) {
        var s = arguments.length > 1 ? arguments[1] : this,
            a = s.options.lengthOfTime,
            i = {
                withCallbacks: !1
            },
            o = {
                end: s.intervalEnd.clone(),
                start: s.intervalStart.clone()
            };
        n = t.extend(!0, {}, i, n), s.month = e().startOf("month"), a.days ? (a.startDate ? s.intervalStart = e().weekday(a.startDate.weekday()).startOf("day") : s.intervalStart = e().weekday(0).startOf("day"), s.intervalEnd = s.intervalStart.clone().add(a.days - 1, "days").endOf("day")) : (s.intervalStart = e().startOf("month"), s.intervalEnd = s.intervalStart.clone().add(a.months || a.interval, "months").subtract(1, "days").endOf("month")), s.intervalStart.isSame(o.start) && s.intervalEnd.isSame(o.end) || s.render(), n.withCallbacks && (s.options.clickEvents.today && s.options.clickEvents.today.apply(s, [e(s.month)]), s.triggerEvents(s, o))
    }, n.prototype.todayAction = function(t) {
        var e = t.data.context;
        e.today({
            withCallbacks: !0
        }, e)
    }, n.prototype.setMonth = function(t, e) {
        var n = this.options.lengthOfTime,
            s = {
                end: this.intervalEnd.clone(),
                start: this.intervalStart.clone()
            };
        return n.days || n.months ? (console.log("You are using a custom date interval. Use Clndr.setIntervalStart(startDate) instead."), this) : (this.month.month(t), this.intervalStart = this.month.clone().startOf("month"), this.intervalEnd = this.intervalStart.clone().endOf("month"), this.render(), e && e.withCallbacks && this.triggerEvents(this, s), this)
    }, n.prototype.setYear = function(t, e) {
        var n = {
            end: this.intervalEnd.clone(),
            start: this.intervalStart.clone()
        };
        return this.month.year(t), this.intervalEnd.year(t), this.intervalStart.year(t), this.render(), e && e.withCallbacks && this.triggerEvents(this, n), this
    }, n.prototype.setIntervalStart = function(t, n) {
        var s = this.options.lengthOfTime,
            a = {
                end: this.intervalEnd.clone(),
                start: this.intervalStart.clone()
            };
        return s.days || s.months ? (s.days ? (this.intervalStart = e(t).startOf("day"), this.intervalEnd = this.intervalStart.clone().add(s - 1, "days").endOf("day")) : (this.intervalStart = e(t).startOf("month"), this.intervalEnd = this.intervalStart.clone().add(s.months || s.interval, "months").subtract(1, "days").endOf("month")), this.month = this.intervalStart.clone(), this.render(), n && n.withCallbacks && this.triggerEvents(this, a), this) : (console.log("You are using a custom date interval. Use Clndr.setIntervalStart(startDate) instead."), this)
    }, n.prototype.setEvents = function(t) {
        return this.options.multiDayEvents ? this.options.events = this.addMultiDayMomentObjectsToEvents(t) : this.options.events = this.addMomentObjectToEvents(t), this.render(), this
    }, n.prototype.addEvents = function(e) {
        return this.options.multiDayEvents ? this.options.events = t.merge(this.options.events, this.addMultiDayMomentObjectsToEvents(e)) : this.options.events = t.merge(this.options.events, this.addMomentObjectToEvents(e)), this.render(), this
    }, n.prototype.removeEvents = function(t) {
        for (var e = this.options.events.length - 1; e >= 0; e--) 1 == t(this.options.events[e]) && this.options.events.splice(e, 1);
        return this.render(), this
    }, n.prototype.addMomentObjectToEvents = function(t) {
        var n = 0,
            s = this;
        for (n; n < t.length; n++) t[n]._clndrStartDateObject = e(t[n][s.options.dateParameter]), t[n]._clndrEndDateObject = e(t[n][s.options.dateParameter]);
        return t
    }, n.prototype.addMultiDayMomentObjectsToEvents = function(t) {
        var n = 0,
            s = this,
            a = s.options.multiDayEvents;
        for (n; n < t.length; n++) {
            var i = t[n][a.endDate],
                o = t[n][a.startDate];
            i || o ? (t[n]._clndrEndDateObject = e(i || o), t[n]._clndrStartDateObject = e(o || i)) : (t[n]._clndrEndDateObject = e(t[n][a.singleDay]), t[n]._clndrStartDateObject = e(t[n][a.singleDay]))
        }
        return t
    }, n.prototype.calendarDay = function(e) {
        var n = {
            day: "",
            date: null,
            events: [],
            classes: this.options.targets.empty
        };
        return t.extend({}, n, e)
    }, n.prototype.destroy = function() {
        var e = t(this.calendarContainer);
        e.parent().data("plugin_clndr", null), this.options = i, e.empty().remove(), this.element = null
    }, t.fn.clndr = function(t) {
        var e;
        if (this.length > 1) throw new Error("CLNDR does not support multiple elements yet. Make sure your clndr selector returns only one element.");
        try {
            if (!this.length) throw new Error("CLNDR cannot be instantiated on an empty selector.");
        } catch (e) {}
        return this.data("plugin_clndr") ? this.data("plugin_clndr") : (e = new n(this, t), this.data("plugin_clndr", e), e)
    }
});
