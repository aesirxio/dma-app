import CalendarListViewModel from "./CalendarListViewModel";

class CalendarViewModel {
  calendarListViewModel = null;

  constructor(calendarStore) {
    if (calendarStore) {
      console.log("class CalendarViewModel- Abstract");
      this.calendarListViewModel = new CalendarListViewModel(calendarStore);
    }
  }

  getCalendarListViewModel = () => this.calendarListViewModel;
}

export default CalendarViewModel;
