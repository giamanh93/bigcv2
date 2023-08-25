import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ArcPath, CurvyPath, LinePath, SquarePath} from 'svg-dom-arrows';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('borderBottom') borderBottom: any;
  displayLogin: boolean = false;
  @ViewChild('startLine') startLine!: ElementRef;
  @ViewChild('endLine') endLine!: ElementRef;

  images = [
    {
      itemImageSrc: '/assets/images/home-page/image-slide.png',
      title: 'CUNG CẤP GIẢI PHÁP',
      alt: `THU THẬP, CHUYỂN ĐỔI<br> & PHÂN TÍCH DỮ LIỆU`,
    },
    {
      itemImageSrc: '/assets/images/home-page/image-slide.png',
      title: 'CUNG CẤP GIẢI PHÁP',
      alt: `THU THẬP, CHUYỂN ĐỔI<br> & PHÂN TÍCH DỮ LIỆU`,
    },

  ];
  heightBrder = 0;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (this.borderBottom) {
      this.heightBrder = this.borderBottom.nativeElement.clientHeight + 24;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.heightBrder = this.borderBottom.nativeElement.clientHeight + 24;
      console.log('this.heightBrder', this.heightBrder);
      new ArcPath({
        start: {
          element: document.getElementById('startLine'),
          position: {
            top: 0.5,
            left: 1,
          },
        },
        end: {
          element: document.getElementById('endLine'),
          position: {
            top: 0.5,
            left: 0,
          },
        },
        style: 'stroke:white;stroke-width:4;fill:transparent; stroke-dasharray:4;',
        appendTo: document.body,
      });
      new ArcPath({
        start: {
          element: document.getElementById('startLine1'),
          position: {
            top: 0.5,
            left: 1,
          },
        },
        end: {
          element: document.getElementById('endLine1'),
          position: {
            top: 0.5,
            left: 0,
          },
        },
        style: 'stroke:white;stroke-width:4;fill:transparent; stroke-dasharray:4',
        appendTo: document.body,
      });
      new ArcPath({
        start: {
          element: document.getElementById('startLine2'),
          position: {
            top: 0.5,
            left: 0.4,
          },
        },
        end: {
          element: document.getElementById('endLine2'),
          position: {
            top: 0.5,
            left: 0,
          },
        },
        style: 'stroke:white;stroke-width:4;fill:transparent; stroke-dasharray:4',
        appendTo: document.body,
      });
      new ArcPath({
        start: {
          element: document.getElementById('startLine3'),
          position: {
            top: 0.5,
            left: 1,
          },
        },
        end: {
          element: document.getElementById('endLine3'),
          position: {
            top: 0.5,
            left: 0,
          },
        },
        style: 'stroke:white;stroke-width:4;fill:transparent; stroke-dasharray:4',
        appendTo: document.body,
      });
    }, 300);


    // const options = {
    //   start: {
    //     element: this.startLine.nativeElement,
    //     position: {
    //       top: 0.5,
    //       left: 1
    //     }
    //   },
    //   end: {
    //     element: this.endLine.nativeElement,
    //     position: {
    //       top: 0.5,
    //       left: 0
    //     }
    //   },
    //   style: 'stroke:white;stroke-width:4;fill:transparent',
    //   appendTo: document.body
    // };
    // console.log(new CurvyPath(options));
    // new CurvyPath(options);
  }

  onBackLogin() {
    this.displayLogin = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.heightBrder = this.borderBottom.nativeElement.clientHeight + 24;
    console.log('this.heightBrder', this.heightBrder);
  }

  showLogin() {
    console.log('showLogin');
    this.router.navigate(['/login']);
  }

}
