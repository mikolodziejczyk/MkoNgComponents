import { Component, OnInit, ElementRef, ViewChild, Input, OnDestroy, AfterViewInit, forwardRef } from '@angular/core';
import Popper from 'popper.js';
import { NgForm, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

/** A checkbox list inside a popup. Consider refactoring into separate components. */
@Component({
  selector: 'lib-mkong-check-box-list-popup',
  templateUrl: './check-box-list-popup.component.html',
  styleUrls: ['./check-box-list-popup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxListPopupComponent),
      multi: true
    }
  ]
})
export class CheckBoxListPopupComponent implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {


  constructor () { }

  isVisible: boolean = false;

  // column selector
  @ViewChild('popup') private popup: ElementRef;
  @ViewChild('myControl') myControl: NgForm;


  @Input() labels: string[];
  @Input() values: boolean[];

  myControlChangeSubcription: Subscription;

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.myControlChangeSubcription = this.myControl.valueChanges.subscribe(x => {
      window.setTimeout(() => {
        this.propagateChange(this.values);
        this.onTouched();
      }, 1);
    });
  }

  ngOnDestroy(): void {
    this.myControlChangeSubcription.unsubscribe();
  }


  open = (referenceElement: HTMLElement) => {
    document.addEventListener('mousedown', this.mouseDown);
    this.isVisible = true;

    const popperInstance = new Popper(referenceElement, this.popup.nativeElement, {
      placement: 'auto'
    });
  }


  close = () => {
    this.isVisible = false;
    document.removeEventListener('mousedown', this.mouseDown);
  }

  mouseDown = (event: MouseEvent): void => {
    // determine if popup element is an ancestor of the clicked element
    const popupElement = this.popup.nativeElement;
    let current = event.target as Element;
    let found = false;
    for (; current !== null; current = current.parentElement) {
      if (current === popupElement) {
        found = true;
      }
    }

    // if not, close the popup
    if (!found) {
      this.close();
    }
  }

  writeValue(value: any) {
    if (value === undefined) {
      value = []; // normalize undefined to null
    }
    if (this.values !== value) {
      this.values = value;
    }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onTouched = () => { };

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
