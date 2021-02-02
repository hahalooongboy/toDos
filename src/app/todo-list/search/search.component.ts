import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output()
  searchTodo = new EventEmitter<string>();

  searchTerm = new FormControl('');

  constructor () { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.searchTerm.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe(
        (response: any) => {
          this.searchTodo.emit(response);
        },
        (error: any) => {
          console.error(`Error:: ${ error }`);
        }
      );
  }
}
