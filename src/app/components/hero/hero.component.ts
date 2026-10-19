import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  updatedAt = '';

  ngOnInit(): void {
    const now = new Date();
    const date = now.toLocaleDateString('ar-OM-u-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' });
    const time = now.toLocaleTimeString('ar-OM-u-nu-latn', { hour: '2-digit', minute: '2-digit' });
    this.updatedAt = `${date}، ${time}`;
  }
}
