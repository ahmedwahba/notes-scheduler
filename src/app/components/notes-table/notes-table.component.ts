import { NotesService } from 'src/app/services/notes.service';
import { NoteLabel } from './../../models/notes.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Note } from 'src/app/models/notes.model';
import { DateParserService } from 'src/app/services/date-parser.service';
import { ThemeManagerService } from 'src/app/common/theme-manager.service';
import { WORKING_DAYS_COUNT } from 'src/app/common/constants';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.scss'],
})
export class NotesTableComponent implements OnInit {

  notes: Note[];
  categories: NoteLabel[];
  gridCells = [];
  workingDays = Array(WORKING_DAYS_COUNT);
  selectedCategory = '';
  filteredCategories: NoteLabel[];
  displayedWeek: number;
  weekNotes: Note[];
  notesCellsCount: number;
  currentTheme: string;

  constructor(
    private route: ActivatedRoute,
    private dateParser: DateParserService,
    private themeService: ThemeManagerService,
    private notesService: NotesService,
  ) {
    this.currentTheme = this.themeService.currentTheme;
   }

  ngOnInit(): void {
    this.themeService.themeToggledEvent.subscribe((theme: string) => {
      this.currentTheme = theme;
    });
    this.notesService.updateNotesEvent.subscribe((note: Note) => {
      const updatedIndex = this.notes.findIndex(n => n.id === note.id);
      this.notes[updatedIndex] = note;
      this.filterWeekNotes(this.notes);
    });
    if (this.route.data) {
      this.route.data.pipe(take(1)).subscribe(res => {
        this.notes = res.notes || [];
        this.categories = res.categories || [''];
        this.prepareTable(this.categories);
        this.filterWeekNotes(this.notes);
      });
    }
    this.displayedWeek = this.dateParser.getWeekofCalender();
    this.workingDays = this.dateParser.getWorkingDays();
  }

  prepareTable(categories: NoteLabel[]): void {
    this.filteredCategories = categories;
    this.gridCells = Array(categories.length * this.workingDays.length);
    this.notesCellsCount = categories.length * this.workingDays.length * 3;
  }

  filterWeekNotes(notes: Note[]): void {
    const weekStart = this.workingDays[0];
    const weekEnd = this.workingDays[this.workingDays.length - 1];
    if (weekStart && weekEnd) {
      this.weekNotes = notes.filter(
        (note) =>
          this.dateParser.isDateInDisplayedWeek(
            note.startDate,
            weekStart,
            weekEnd
          ) ||
          this.dateParser.isDateInDisplayedWeek(
            note.endDate,
            weekStart,
            weekEnd
          )
      );
    }
  }

  onCategoryFilter(): void {
    const filtered = this.categories.filter(
      (cat) => cat.id === Number(this.selectedCategory)
    );
    if (filtered.length > 0) {
      this.prepareTable(filtered);
    } else {
      this.prepareTable(this.categories);
    }
  }

  updateWorkDays(firstDay: Date): void {
    this.workingDays = this.dateParser.getWorkingDays(firstDay);
    this.displayedWeek = this.dateParser.getWeekofCalender(firstDay);
  }

  getPreviousWeek(): void {
    if (this.workingDays[0]) {
      const previosFirstDay = this.dateParser.getPreviousWeek(this.workingDays[0]);
      this.updateWorkDays(previosFirstDay);
      this.filterWeekNotes(this.notes);
    }
  }

  getNextWeek(): void {
    if (this.workingDays[0]) {
      const nextFirstDay = this.dateParser.getNextWeek(this.workingDays[0]);
      this.updateWorkDays(nextFirstDay);
      this.filterWeekNotes(this.notes);
    }
  }

  toggleTheme(): void {
    this.themeService.onChangeThemeClick();
  }

}
