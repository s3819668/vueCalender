var vm = new Vue({
  el: "#app",
  data: {
    tags: "日一二三四五六",
    days: [],
    new_item: {
      title: "",
      time: ""
    },
    looking: {
      year: "",
      month: ""
    },
    monthDays: "",
    selected_day: {
      month: "",
      year: "",
      id: ""
    },
    start_day: "",
    lunar_pan: 13
  },
  computed: {
    now_events() {
      console.log("now")
      var target = this.days.find(
        (x) =>
          x.year == this.selected_day.year &&
          x.month == this.selected_day.month &&
          x.id == this.selected_day.id
      );
      if (target) return this.sort_time(target.events);
      else return [];
    },
    getDays(){
       var d=this.days.filter(d => d.year == this.looking.year && d.month == this.looking.month);
      console.log("getDays");
      return d
      }
  },
  mounted() {
    this.iniDays();
    this.countDays();
  },
  methods: {
    iniDays(){
      var nowDate = new Date();
      this.looking.year=nowDate.getFullYear();
      this.looking.month=nowDate.getMonth()+1;
      this.selected_day.month=nowDate.getMonth()+1;
      this.selected_day.year=nowDate.getFullYear();
      this.selected_day.id=nowDate.getDate()
      },
    countDays() {
      if (this.looking.month > 12) {
        this.looking.month = 1;
        this.looking.year++;
      }
      if (this.looking.month < 1) {
        this.looking.month = 12;
        this.looking.year--;
      }
      var pan = "0123456";
      var year = this.looking.year;
      var month = this.looking.month;
      this.selected_day.year = this.looking.year;
      this.selected_day.month = this.looking.month;

      var dateStr = this.looking.year + "-" + this.looking.month + "-" + 1;
      var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
      this.start_day = parseInt(pan[myDate.getDay()]);
      this.monthDays = monthDays(this.looking.year, this.looking.month);

      // this.days.length=1
       if(this.days.some(d => d.year == this.looking.year && d.month == this.looking.month)){
        return;
      }
      
      for (var j=1; j <= this.monthDays; j++) {
        var new_day = {
          year: this.looking.year,
          month: this.looking.month,
          id: j,
          events: []
        };
        this.days.push(new_day);
      }

      function monthDays(year, month) {
        if (month == 2 && year % 400 == 0) {
          return 29;
        }
        if (month == 2 && year % 100 == 0) {
          return 28;
        }
        if (month == 2 && year % 4 == 0) {
          return 29;
        }
        if (month == 2) {
          return 28;
        }
        if (
          month == 1 ||
          month == 3 ||
          month == 5 ||
          month == 7 ||
          month == 8 ||
          month == 10 ||
          month == 12
        ) {
          return 31;
        } else {
          return 30;
        }
      }
    },
    get_pen(day_id) {
      if (day_id != 1) {
        return null;
      } else return { "margin-left": "calc(" + this.start_day + " * 100% / 7)" };
    },
    chinese_num(num) {
      var list = "十一二三四五六七八九";
      return list[num];
    },
    lunar(num) {
      if (num > 30) {
        num = num % 30;
      }
      if (num <= 10) {
        return "初" + this.chinese_num(num % 10);
      } else if (num == 20) {
        return "二十";
      } else if (num == 30) {
        return "三十";
      } else if (num < 20) {
        return "十" + this.chinese_num(num % 10);
      } else if (num < 30) {
        return "廿" + this.chinese_num(num % 10);
      }
    },

    add_item() {
      var target = this.days.find(
        (x) =>
          x.year == this.selected_day.year &&
          x.month == this.selected_day.month &&
          x.id == this.selected_day.id
      );
      target.events.push(JSON.parse(JSON.stringify(vm.new_item)));
    },
    sort_time(events) {
      if (events) {
        return events.sort((a, b) => {
          return (
            parseInt(a.time.replace(":", "")) -
            parseInt(b.time.replace(":", ""))
          );
        });
      }
    }
  }
});
