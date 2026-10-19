import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  readonly items = [
    { href: '#top', label: 'الرئيسية', icon: 'M4 11.5 12 4l8 7.5M6 10v9h12v-9' },
    { href: '#calculator', label: 'الحاسبة', icon: 'M5 3.500h14v17H5zM8 7.500h8M8 12h1.500M12.250 12h1.500M8 15.500h1.500M12.250 15.500h1.500' },
    { href: '#prices', label: 'الأسعار', icon: 'M12 3.500 20.500 12 12 20.500 3.500 12z' },
    { href: '#history', label: 'السجل', icon: 'M4 19V5M4 19h16M7 15l4-4 3 2.500L19 8' },
  ];
}
