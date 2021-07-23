import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  get upXs() {
    return this.breakpointObserver.observe([`(min-width: ${this.breakpoints.xs}px)`]);
  }

  get downSm() {
    return this.breakpointObserver.observe([`(max-width: ${this.breakpoints.sm - .02}px)`]);
  }

  get upSm() {
    return this.breakpointObserver.observe([`(min-width: ${this.breakpoints.sm}px)`]);
  }

  get downMd() {
    return this.breakpointObserver.observe([`(max-width: ${this.breakpoints.md - .02}px)`]);
  }

  get upMd() {
    return this.breakpointObserver.observe([`(min-width: ${this.breakpoints.md}px)`]);
  }

  get downLg() {
    return this.breakpointObserver.observe([`(max-width: ${this.breakpoints.lg - .02}px)`]);
  }

  get upLg() {
    return this.breakpointObserver.observe([`(min-width: ${this.breakpoints.lg}px)`]);
  }

  get downXl() {
    return this.breakpointObserver.observe([`(max-width: ${this.breakpoints.xl - .02}px)`]);
  }
}
