import { ConfigService } from '../../config/config.service';
import { DOCUMENT, NgClass } from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {
  LanguageService,
  RightSidebarService,
  InConfiguration,
  Role,
  AuthService,
} from '@core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
        RouterLink,
        NgClass,
        MatButtonModule,
        MatMenuModule,
        NgScrollbar,
        FeatherIconsComponent,
        MatIconModule,
        MatToolbarModule,
    ]
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  public config!: InConfiguration;
  userImg?: string;
  userFirstName?: string;
  userLastName?: string;
  homePage?: string;
  isNavbarCollapsed = true;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  isOpenSidebar?: boolean;
  docElement?: HTMLElement;
  isFullScreen = false;
  user: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    super();
  }
  listLang = [
    { text: 'French', flag: 'assets/images/flags/fr.webp', lang: 'fr' },
    { text: 'English', flag: 'assets/images/flags/en.png', lang: 'en' },
  ];
  notifications: Notifications[] = [
    {
      message: 'Please check your mail',
      time: '14 mins ago',
      icon: 'mail',
      color: 'nfc-green',
      status: 'msg-unread',
    },
    {
      message: 'New Patient Added..',
      time: '22 mins ago',
      icon: 'person_add',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Your leave is approved!! ',
      time: '3 hours ago',
      icon: 'event_available',
      color: 'nfc-orange',
      status: 'msg-read',
    },
    {
      message: 'Lets break for lunch...',
      time: '5 hours ago',
      icon: 'lunch_dining',
      color: 'nfc-blue',
      status: 'msg-read',
    },
    {
      message: 'Patient report generated',
      time: '14 mins ago',
      icon: 'description',
      color: 'nfc-green',
      status: 'msg-read',
    },
    {
      message: 'Please check your mail',
      time: '22 mins ago',
      icon: 'mail',
      color: 'nfc-red',
      status: 'msg-read',
    },
    {
      message: 'Salary credited...',
      time: '3 hours ago',
      icon: 'paid',
      color: 'nfc-purple',
      status: 'msg-read',
    },
  ];
  ngOnInit() {
    this.config = this.configService.configData;
    this.user = this.authService.currentUserValue;
    if(this.user){
       const userRole = this.user.role;
      this.userFirstName = this.user.first_name;
      this.userLastName = this.user.last_name;
      this.userImg = this.user.img;

      this.docElement = document.documentElement;

      if (userRole === Role.Admin) {
        this.homePage = 'admin/dashboard/main';
      } else if (userRole === Role.Doctor) {
        this.homePage = 'doctor/dashboard';
      } else if (userRole === Role.Patient) {
        this.homePage = 'patient/dashboard';
      } else {
        this.homePage = 'admin/dashboard/main';
      }
    }
   
    

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/fr.png';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }
  callFullscreen() {
    if (!this.isFullScreen) {
      if (this.docElement?.requestFullscreen != null) {
        this.docElement?.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    this.isFullScreen = !this.isFullScreen;
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'false');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
      localStorage.setItem('collapsed_menu', 'true');
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }
}
