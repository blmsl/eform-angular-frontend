import { Component, OnInit, OnChanges, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import * as pell from './pell-pn';


@Component({
  selector: 'pell-pn-editor',
  templateUrl: './pell-pn.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PellPnComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() actions: Array<Object> = [];
  @Input() value: String = '';
  @Output() valueChange = new EventEmitter();
  pell = pell;
  html;
  editor;

  constructor(
    private rd: Renderer2

  ) { }

  ngOnInit() {
  }

  @ViewChild('wysiwyg') wysiwyg: ElementRef;

  ngAfterViewInit() {
    this.wysiwygInit(this.wysiwyg.nativeElement, this.actions);
    this.editor.content.innerHTML = this.value;
  }

  ngOnChanges(changes: any) {
    try {
      if (this.editor.content.innerHTML != this.value) {
        this.editor.content.innerHTML = this.value;
      }
    } catch (err) {

    }
  }

  wysiwygInit(elm, actions) {
    this.editor = pell.init({
      element: elm,
      onChange: html => {
        this.html = html;
        this.valueChange.emit(this.html);
      },
      styleWithCSS: true,
      actions: [
        'bold',
        'underline',
        'italic',
        'strikethrough',
      ].concat(actions),
      classes: {}
    });
  }
}
